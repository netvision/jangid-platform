import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import configuration from './config/configuration'
import { HealthModule } from './health/health.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { AuthModule } from './auth/auth.module'
import { CategoriesModule } from './categories/categories.module'
import { ProfilesModule } from './profiles/profiles.module'
import { ThemesModule } from './themes/themes.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env', '../../.env'],
      load: [configuration]
    }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    CategoriesModule,
    ProfilesModule,
    ThemesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
