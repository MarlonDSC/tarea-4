import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../application/services/auth.service';
import { UserService } from '../../application/services/user.service';
import { AuthController } from '../../adapters/controllers/auth.controller';
import { LocalStrategy } from '../../adapters/strategies/local.strategy';
import { jwtConfig } from '../../infrastructure/databases/config/jwt.config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
})
export class AuthModule {}