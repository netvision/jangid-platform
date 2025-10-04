import { Controller, Get } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import type { CategoryDto } from './category.dto'

@Controller({ path: 'categories' })
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list(): Promise<CategoryDto[]> {
    return this.categoriesService.list()
  }
}
