import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from '../database/prisma.service'
import type { CategoryDto } from './dto/category.dto'
import type { AdminCategoryDto } from './dto/admin-category.dto'
import { AdminCreateCategoryDto } from './dto/admin-create-category.dto'
import { AdminUpdateCategoryDto } from './dto/admin-update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<CategoryDto[]> {
    const categories = await this.prisma.category.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true
      },
      orderBy: { name: 'asc' }
    })

    return categories.map((category): CategoryDto => ({
      ...category,
      description: category.description ?? null
    }))
  }

  async adminList(): Promise<AdminCategoryDto[]> {
    const categories = await this.prisma.category.findMany({
      orderBy: { name: 'asc' },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      }
    })

    return categories.map((category) => this.toAdminDto(category))
  }

  async createCategory(dto: AdminCreateCategoryDto): Promise<AdminCategoryDto> {
    const slug = await this.resolveSlug(dto.slug, dto.name)

    try {
      const category = await this.prisma.category.create({
        data: {
          name: dto.name,
          slug,
          description: dto.description ?? null,
          isActive: dto.isActive ?? true
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return this.toAdminDto(category)
    } catch (error) {
      this.handlePrismaError(error)
      throw error
    }
  }

  async updateCategory(id: string, dto: AdminUpdateCategoryDto): Promise<AdminCategoryDto> {
    const existing = await this.prisma.category.findUnique({ where: { id } })

    if (!existing) {
      throw new NotFoundException('Category not found')
    }

    const slug = dto.slug !== undefined ? await this.resolveSlug(dto.slug, dto.name ?? existing.name, id) : existing.slug
    const description = dto.description !== undefined ? dto.description ?? null : undefined

    try {
      const category = await this.prisma.category.update({
        where: { id },
        data: {
          name: dto.name ?? existing.name,
          slug,
          description,
          isActive: dto.isActive ?? existing.isActive
        },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          isActive: true,
          createdAt: true,
          updatedAt: true
        }
      })

      return this.toAdminDto(category)
    } catch (error) {
      this.handlePrismaError(error)
      throw error
    }
  }

  private toAdminDto(category: { id: string; name: string; slug: string; description: string | null; isActive: boolean; createdAt: Date; updatedAt: Date }): AdminCategoryDto {
    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    }
  }

  private async resolveSlug(initialSlug: string | undefined, fallbackName: string, excludeId?: string): Promise<string> {
    const base = this.slugify(initialSlug ?? fallbackName)

    if (!base) {
      throw new BadRequestException('Unable to derive slug from provided values')
    }

    let candidate = base
    let attempt = 1

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const existing = await this.prisma.category.findFirst({
        where: {
          slug: candidate,
          ...(excludeId ? { id: { not: excludeId } } : {})
        },
        select: { id: true }
      })

      if (!existing) {
        return candidate
      }

      candidate = `${base}-${attempt}`
      attempt += 1
    }
  }

  private slugify(input: string): string {
    return input
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  private handlePrismaError(error: unknown): void {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      throw new BadRequestException('Category name or slug must be unique')
    }
  }
}
