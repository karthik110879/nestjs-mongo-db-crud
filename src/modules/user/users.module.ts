import { Module } from '@nestjs/common';   
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { UsersService } from './users.service';  
import { AuthService } from '../auth/auth.service';
import { LocalStrategy } from '../auth/local.strategy';
@Module({
    imports:[
        MongooseModule.forFeature([
            {
                name: 'User',
                schema: UserSchema
            }
        ])
    ],
    controllers: [UsersController],
    providers: [UsersService, LocalStrategy, AuthService],
    exports: [
        UsersService
    ]
})
export class UsersModule {}
