import { Module } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CategoriesController } from './categories.controller'
import { AdminCategoriesController } from './admin-categories.controller'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [CategoriesService],
  controllers: [CategoriesController, AdminCategoriesController]
})
export class CategoriesModule {}
