import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { ProfilesService } from './profiles.service'
import { AccessTokenGuard } from '../auth/guards/access-token.guard'
import { RolesGuard } from '../auth/guards/roles.guard'
import { Roles } from '../auth/decorators/roles.decorator'
import type { AdminProfileDto, ApproveProfileDto } from './dto/admin-profile.dto'

@Controller('admin/profiles')
@UseGuards(AccessTokenGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class AdminProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get()
  list(@Query('status') status?: string): Promise<{ profiles: AdminProfileDto[] }> {
    return this.profilesService.adminList(status).then((profiles) => ({ profiles }))
  }

  @Patch(':id/approval')
  updateApproval(@Param('id') id: string, @Body() dto: ApproveProfileDto): Promise<AdminProfileDto> {
    return this.profilesService.updateApproval(id, dto)
  }
}
