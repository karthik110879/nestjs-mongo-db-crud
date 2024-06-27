import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/shared/dto/user.dto';
import { IUser } from 'src/shared/interface/user.interface';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') 
        private userModel: Model<IUser>,
        private jwtService: JwtService
    ) {}

    async createUser(userDto:UserDto):Promise<IUser> {
        const newUser = await new this.userModel(userDto);
        return newUser.save();
    }

    async signIn(userName, pass) {
        try {
            const user = await this.userModel.findOne({userName});
            const isPassValid =  await bcrypt.compare(pass, user.password);
            if (!isPassValid) {
              throw new UnauthorizedException();
            }
            const payload = { userId: user.id, username: user.userName }; 
            const signed = await this.jwtService.signAsync(payload, {secret: 'secret'});
            console.log('signed', signed);
            
            return signed;
            
        } catch (error) {
            console.log(error);
            
            throw new Error(error)
        }
    }

    async getUser(username: string) {
        const userName = username.toLowerCase();
        const foundUser = await this.userModel.findOne({userName});
        return foundUser;
    }

    async getUserById(userId: string) { 
        const foundUser = await this.userModel.findById(userId);
        return foundUser;
    }
}
