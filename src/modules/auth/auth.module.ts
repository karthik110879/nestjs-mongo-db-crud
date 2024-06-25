import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
