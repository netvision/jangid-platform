import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { CategoriesService } from './categories.service'
import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import { RolesGuard } from '../auth/guards/roles.guard'
import type { AdminCategoryDto } from './dto/admin-category.dto'
import { AdminCreateCategoryDto } from './dto/admin-create-category.dto'
import { AdminUpdateCategoryDto } from './dto/admin-update-category.dto'

@Controller('admin/categories')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminCategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  list(): Promise<{ categories: AdminCategoryDto[] }> {
    return this.categoriesService.adminList().then((categories) => ({ categories }))
  }

  @Post()
  create(@Body() dto: AdminCreateCategoryDto): Promise<AdminCategoryDto> {
    return this.categoriesService.createCategory(dto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: AdminUpdateCategoryDto): Promise<AdminCategoryDto> {
    return this.categoriesService.updateCategory(id, dto)
  }
}
