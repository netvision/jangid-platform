import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
import { Public } from '../auth/decorators/public.decorator'
import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { ProfilesService } from './profiles.service'
import type { ProfileResponse } from './profiles.service'
import { UpdateProfileDto } from './dto/update-profile.dto'

@Controller('profiles')
@UseGuards(AccessTokenGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @Public()
  @Get('highlights')
  getHighlights(): Promise<any[]> {
    return this.profilesService.getHighlights()
  }

  @Public()
  @Get('by-slug/:slug')
  getProfileBySlug(@Param('slug') slug: string): Promise<any> {
    return this.profilesService.getProfileBySlug(slug)
  }

  @Get('me')
  getMyProfile(@CurrentUser('sub') userId: string): Promise<ProfileResponse> {
    return this.profilesService.getProfileForUser(userId)
  }

  @Patch('me')
  updateMyProfile(@CurrentUser('sub') userId: string, @Body() dto: UpdateProfileDto): Promise<ProfileResponse> {
    return this.profilesService.updateProfile(userId, dto)
  }
}
