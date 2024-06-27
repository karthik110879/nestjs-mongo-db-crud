import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../user/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: '60s'
      }
    })
  ],
  providers: [
    AuthService, 
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    AuthService,
    PassportModule, 
  ]
})
export class AuthModule {}
