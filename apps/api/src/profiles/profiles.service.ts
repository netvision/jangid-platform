import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma, ProfileStatus } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'
import { UpdateProfileDto } from './dto/update-profile.dto'
import { DEFAULT_THEME_SLUG } from './reserved-slugs.constant'
import type { AdminProfileDto, ApproveProfileDto } from './dto/admin-profile.dto'

type ProfileWithRelations = Prisma.ProfileGetPayload<{
  include: {
    theme: true
    user: {
      select: {
        id: true
        email: true
        isApproved: true
      }
    }
  }
}>

type ProfileStatusType = ProfileWithRelations['status']
type ProfileModeType = ProfileWithRelations['mode']

export interface DashboardProfile {
  id: string
  slug: string
  displayName: string
  headline: string | null
  summary: string | null
  status: ProfileStatusType
  mode: ProfileModeType
  themeId: string | null
  themeConfig: Record<string, unknown>
  contact: {
    email: string | null
    phone: string | null
    website: string | null
    address: string | null
  }
  services: string[]
  sections: Record<string, unknown>
  metrics: {
    views30d: number
    enquiries30d: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface ProfileResponse {
  profile: DashboardProfile
  user: {
    id: string
    email: string
    isApproved: boolean
  }
}

@Injectable()
export class ProfilesService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfileForUser(userId: string): Promise<ProfileResponse> {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        theme: true,
        user: {
          select: {
            id: true,
            email: true,
            isApproved: true
          }
        }
      }
    })

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    return this.buildResponse(profile)
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<ProfileResponse> {
    const existing = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        theme: true,
        user: {
          select: {
            id: true,
            email: true,
            isApproved: true
          }
        }
      }
    })

    if (!existing) {
      throw new NotFoundException('Profile not found')
    }

  const data: Prisma.ProfileUpdateInput = {}

    if (dto.displayName !== undefined) {
      data.displayName = dto.displayName
    }

    if (dto.headline !== undefined) {
      data.headline = dto.headline ?? null
    }

    if (dto.summary !== undefined) {
      data.summary = dto.summary ?? null
    }

    if (dto.contact) {
      data.publicEmail = dto.contact.email ?? null
      data.publicPhone = dto.contact.phone ?? null
      data.website = dto.contact.website ?? null
      data.address = dto.contact.address ?? null
    }

    if (dto.services) {
      (data as Record<string, unknown>).services = dto.services as unknown as Prisma.InputJsonValue
    }

    if (dto.sections) {
      (data as Record<string, unknown>).sections = dto.sections as Prisma.InputJsonValue
    }

    if (dto.theme) {
      const theme = await this.prisma.theme.findFirst({
        where: {
          OR: [{ id: dto.theme.themeId }, { slug: dto.theme.themeId }],
          isActive: true
        }
      })

      if (!theme) {
        throw new BadRequestException('Theme not found')
      }

      data.theme = { connect: { id: theme.id } }

      if (dto.theme.config) {
        (data as Record<string, unknown>).themeConfig = dto.theme.config as Prisma.InputJsonValue
      } else if (!existing.themeConfig) {
        (data as Record<string, unknown>).themeConfig = theme.config as Prisma.InputJsonValue
      }
    }

    const updated = await this.prisma.profile.update({
      where: { userId },
      data,
      include: {
        theme: true,
        user: {
          select: {
            id: true,
            email: true,
            isApproved: true
          }
        }
      }
    })

    return this.buildResponse(updated)
  }

  private buildResponse(profile: ProfileWithRelations): ProfileResponse {
    const mappedProfile = this.mapProfile(profile)
    return {
      profile: mappedProfile,
      user: {
        id: profile.user.id,
        email: profile.user.email,
        isApproved: profile.user.isApproved
      }
    }
  }

  private mapProfile(profile: ProfileWithRelations): DashboardProfile {
    const services = Array.isArray(profile.services)
      ? (profile.services as unknown[]).filter((item): item is string => typeof item === 'string')
      : []

    const sections = this.toRecord(profile.sections as Prisma.JsonValue | undefined)
    const themeConfig = this.toRecord(profile.themeConfig as Prisma.JsonValue | undefined)

    return {
      id: profile.id,
      slug: profile.slug,
      displayName: profile.displayName,
      headline: profile.headline,
      summary: profile.summary,
      status: profile.status,
      mode: profile.mode,
      themeId: profile.theme?.slug ?? profile.themeId ?? DEFAULT_THEME_SLUG,
      themeConfig,
      contact: {
        email: profile.publicEmail,
        phone: profile.publicPhone,
        website: profile.website,
        address: profile.address
      },
      services,
      sections,
      metrics: {
        views30d: 0,
        enquiries30d: 0
      },
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    }
  }

  private toRecord(value: Prisma.JsonValue | null | undefined): Record<string, unknown> {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, unknown>
    }
    return {}
  }

  async adminList(statusFilter?: string): Promise<AdminProfileDto[]> {
    const where: Prisma.ProfileWhereInput = {}
    
    if (statusFilter && Object.values(ProfileStatus).includes(statusFilter as ProfileStatus)) {
      where.status = statusFilter as ProfileStatus
    }

    const profiles = await this.prisma.profile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            isApproved: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return profiles.map(profile => ({
      id: profile.id,
      slug: profile.slug,
      displayName: profile.displayName,
      headline: profile.headline,
      summary: profile.summary,
      status: profile.status,
      mode: profile.mode,
      categoryId: profile.categoryId,
      categoryName: profile.category?.name ?? null,
      user: {
        id: profile.user.id,
        email: profile.user.email,
        phone: profile.user.phone,
        isApproved: profile.user.isApproved
      },
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    }))
  }

  async updateApproval(profileId: string, dto: ApproveProfileDto): Promise<AdminProfileDto> {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: true
      }
    })

    if (!profile) {
      throw new NotFoundException('Profile not found')
    }

    const newStatus = dto.approve ? ProfileStatus.APPROVED : ProfileStatus.SUSPENDED
    const userApproved = dto.approve

    const updated = await this.prisma.profile.update({
      where: { id: profileId },
      data: {
        status: newStatus,
        user: {
          update: {
            isApproved: userApproved
          }
        }
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            isApproved: true
          }
        },
        category: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    return {
      id: updated.id,
      slug: updated.slug,
      displayName: updated.displayName,
      headline: updated.headline,
      summary: updated.summary,
      status: updated.status,
      mode: updated.mode,
      categoryId: updated.categoryId,
      categoryName: updated.category?.name ?? null,
      user: {
        id: updated.user.id,
        email: updated.user.email,
        phone: updated.user.phone,
        isApproved: updated.user.isApproved
      },
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt
    }
  }
}
