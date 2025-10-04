import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { RefreshDto } from './dto/refresh.dto'
import { AccessTokenGuard } from './guards/access-token.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import type { JwtPayload } from './interfaces/jwt-payload.interface'
import type { AuthResponse } from './interfaces/auth-response.interface'
import type { FastifyRequest } from 'fastify'

@Controller({ path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto, @Req() request: FastifyRequest): Promise<AuthResponse> {
    const context = this.extractContext(request)
    return this.authService.register(dto, context)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto, @Req() request: FastifyRequest): Promise<AuthResponse> {
    const context = this.extractContext(request)
    return this.authService.login(dto, context)
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshDto, @Req() request: FastifyRequest): Promise<AuthResponse> {
    const context = this.extractContext(request)
    return this.authService.refreshTokens(dto, context)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AccessTokenGuard)
  async logout(@CurrentUser() user: JwtPayload): Promise<void> {
    await this.authService.logout(user.sub, user.sessionId)
  }

  @Get('me')
  @UseGuards(AccessTokenGuard)
  me(@CurrentUser('sub') userId: string) {
    return this.authService.getCurrentUser(userId)
  }

  private extractContext(request: FastifyRequest) {
    const userAgentValue = this.getHeader(request, 'user-agent')
    const userAgent = Array.isArray(userAgentValue) ? userAgentValue[0] : userAgentValue
    return {
      userAgent: userAgent,
      ip: this.getIp(request)
    }
  }

  private getIp(request: FastifyRequest): string | undefined {
    const forwarded = this.getHeader(request, 'x-forwarded-for')
    if (Array.isArray(forwarded)) {
      return forwarded[0]
    }
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0]?.trim()
    }
    return request.ip || request.raw.socket?.remoteAddress || undefined
  }

  private getHeader(request: FastifyRequest, key: string): string | string[] | undefined {
    const headers = request.headers as Record<string, string | string[] | undefined>
    return headers[key]
  }
}
