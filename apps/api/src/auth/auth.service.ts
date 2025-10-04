import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { Prisma, ProfileStatus, SiteMode, UserRole } from '@prisma/client'
import { randomUUID } from 'crypto'
import bcrypt from 'bcryptjs'
import { PrismaService } from '../database/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import type { AuthResponse, AuthUser } from './interfaces/auth-response.interface'
import type { JwtPayload } from './interfaces/jwt-payload.interface'

type UserWithProfile = Prisma.UserGetPayload<{ include: { profile: true } }>
interface AuthContext {
  userAgent?: string
  ip?: string
}

@Injectable()
export class AuthService {
  private readonly accessTtl: number
  private readonly refreshTtl: number

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {
    this.accessTtl = this.configService.get<number>('jwt.accessTokenTtl', 900)
    this.refreshTtl = this.configService.get<number>('jwt.refreshTokenTtl', 1209600)
  }

  async register(dto: RegisterDto, context: AuthContext): Promise<AuthResponse> {
    const { email, password, displayName, slug, phone, categoryId } = dto

    const passwordHash = await bcrypt.hash(password, 12)

    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          phone: phone || undefined,
          passwordHash,
          role: UserRole.USER,
          isApproved: false,
          profile: {
            create: {
              slug,
              displayName,
              status: ProfileStatus.PENDING_REVIEW,
              mode: SiteMode.CARD,
              categoryId: categoryId || undefined
            }
          }
        },
        include: {
          profile: true
        }
  })

  return this.issueTokens(user as UserWithProfile, context)
    } catch (error: unknown) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        const prismaError = error as Prisma.PrismaClientKnownRequestError

        if (prismaError.code === 'P2002') {
          if ((prismaError.meta?.target as string[] | undefined)?.includes('email')) {
            throw new ConflictException('Email already in use')
          }
          if ((prismaError.meta?.target as string[] | undefined)?.includes('Profile_slug_key')) {
            throw new ConflictException('Subdomain already taken')
          }
        }
        if (prismaError.code === 'P2003') {
          throw new BadRequestException('Invalid category selected')
        }
      }
      throw error
    }
  }

  async login(dto: LoginDto, context: AuthContext): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const passwordValid = await bcrypt.compare(dto.password, user.passwordHash)

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials')
    }

  return this.issueTokens(user as UserWithProfile, context)
  }

  async refreshTokens(dto: RefreshDto, context: AuthContext): Promise<AuthResponse> {
    const { refreshToken } = dto
    let payload: JwtPayload

    try {
      payload = await this.jwtService.verifyAsync<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('jwt.secret')
      })
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    if (payload.type !== 'refresh' || !payload.sessionId) {
      throw new UnauthorizedException('Invalid refresh token')
    }

  const session = await this.prisma.session.findUnique({ where: { id: payload.sessionId } })

    if (!session || session.userId !== payload.sub) {
      throw new UnauthorizedException('Session not found')
    }

    if (session.expiresAt < new Date()) {
      await this.prisma.session.delete({ where: { id: session.id } })
      throw new UnauthorizedException('Session expired')
    }

    const refreshValid = await bcrypt.compare(refreshToken, session.refreshTokenHash)

    if (!refreshValid) {
      await this.prisma.session.delete({ where: { id: session.id } })
      throw new UnauthorizedException('Session revoked')
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
      include: { profile: true }
    })

    if (!user) {
      throw new UnauthorizedException('User no longer exists')
    }

  return this.issueTokens(user as UserWithProfile, context, session.id)
  }

  async logout(userId: string, sessionId?: string): Promise<void> {
    if (!sessionId) {
      await this.prisma.session.deleteMany({ where: { userId } })
      return
    }

    await this.prisma.session.delete({ where: { id: sessionId } }).catch(() => undefined)
  }

  async getCurrentUser(userId: string): Promise<AuthUser> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true }
    })

    if (!user) {
      throw new BadRequestException('User not found')
    }

  return this.mapAuthUser(user as UserWithProfile)
  }

  private async issueTokens(user: UserWithProfile, context: AuthContext, reuseSessionId?: string): Promise<AuthResponse> {
    const sessionId = reuseSessionId ?? randomUUID()

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        sessionId,
        type: 'access'
      } satisfies JwtPayload,
      {
        expiresIn: this.accessTtl
      }
    )

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        sessionId,
        type: 'refresh'
      } satisfies JwtPayload,
      {
        expiresIn: this.refreshTtl
      }
    )

    const expiresAt = new Date(Date.now() + this.refreshTtl * 1000)
    const refreshTokenHash = await bcrypt.hash(refreshToken, 12)

    if (reuseSessionId) {
      await this.prisma.session.update({
        where: { id: sessionId },
        data: {
          refreshTokenHash,
          expiresAt,
          userAgent: context.userAgent,
          ipAddress: context.ip
        }
      })
    } else {
      await this.prisma.session.create({
        data: {
          id: sessionId,
          userId: user.id,
          refreshTokenHash,
          userAgent: context.userAgent,
          ipAddress: context.ip,
          expiresAt
        }
      })
    }

    return {
      accessToken,
      refreshToken,
      user: this.mapAuthUser(user)
    }
  }

  private mapAuthUser(user: UserWithProfile): AuthUser {
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isApproved: user.isApproved,
      profile: user.profile
        ? {
            id: user.profile.id,
            slug: user.profile.slug,
            displayName: user.profile.displayName,
            status: user.profile.status,
            mode: user.profile.mode,
            headline: user.profile.headline,
            summary: user.profile.summary
          }
        : null
    }
  }
}
