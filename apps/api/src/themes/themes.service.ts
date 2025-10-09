import { Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'

@Injectable()
export class ThemesService {
  constructor(private readonly prisma: PrismaService) {}

  async getThemes(status: 'active' | 'all' = 'active') {
    const themes = await this.prisma.theme.findMany({
      where: status === 'active' ? { isActive: true } : undefined,
      orderBy: { name: 'asc' },
      select: {
        id: true,
        slug: true,
        name: true,
        description: true,
        thumbnail: true,
        config: true
      }
    })

    return {
      themes: themes.map((theme) => this.mapTheme(theme))
    }
  }

  private mapTheme(theme: ThemeEntity) {
    return {
      id: theme.id,
      slug: theme.slug,
      name: theme.name,
      description: theme.description ?? null,
      thumbnail: theme.thumbnail ?? null,
      configSchema: this.toRecord(theme.config)
    }
  }

  private toRecord(value: Prisma.JsonValue | null): Record<string, unknown> {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return value as Record<string, unknown>
    }
    return {}
  }
}

type ThemeEntity = Prisma.ThemeGetPayload<{
  select: {
    id: true
    slug: true
    name: true
    description: true
    thumbnail: true
    config: true
  }
}>
