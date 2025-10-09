import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { ThemesService } from './themes.service'

@Controller('themes')
@UseGuards(AccessTokenGuard)
export class ThemesController {
  constructor(private readonly themesService: ThemesService) {}

  @Get()
  getThemes(@Query('status') status?: 'active' | 'all') {
    return this.themesService.getThemes(status === 'all' ? 'all' : 'active')
  }
}
