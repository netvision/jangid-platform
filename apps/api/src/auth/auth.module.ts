import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { JwtAccessStrategy } from './strategies/jwt-access.strategy'
import { DatabaseModule } from '../database/database.module'
import { RolesGuard } from './guards/roles.guard'
import { AccessTokenGuard } from './guards/access-token.guard'

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt-access', session: false }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: {
          issuer: 'jangid-api',
          audience: 'jangid-clients'
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    AccessTokenGuard,
    RolesGuard
  ],
  exports: [AuthService, AccessTokenGuard, RolesGuard]
})
export class AuthModule {}
