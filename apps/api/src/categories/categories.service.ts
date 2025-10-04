import { Injectable } from '@nestjs/common'
import { PrismaService } from '../database/prisma.service'
import type { CategoryDto } from './category.dto'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(): Promise<CategoryDto[]> {
    const categories = await this.prisma.category.findMany({
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
}
