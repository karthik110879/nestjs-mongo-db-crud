import { Module } from '@nestjs/common';   
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { UsersService } from './users.service';  
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            }
        ]),
        PassportModule
    ],
    controllers: [UsersController],
    providers: [UsersService, LocalStrategy, AuthService, JwtStrategy, JwtService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
