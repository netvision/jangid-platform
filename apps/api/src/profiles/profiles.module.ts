import { Module } from '@nestjs/common'
import { ProfilesService } from './profiles.service'
import { ProfilesController } from './profiles.controller'
import { AdminProfilesController } from './admin-profiles.controller'
import { DatabaseModule } from '../database/database.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [ProfilesService],
  controllers: [ProfilesController, AdminProfilesController]
})
export class ProfilesModule {}
