import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/shared/dto/user.dto';
import { IUser } from 'src/shared/interface/user.interface';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private userModel: Model<IUser>
    ) {}

    async createUser(userDto:UserDto):Promise<IUser> {
        const newUser = await new this.userModel(userDto);
        return newUser.save();
    }

    async signIn(userName, pass) {
        const user = await this.userModel.findOne({userName});
        const isPassValid =  await bcrypt.compare(pass, user.password)
        if (!isPassValid) {
          throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.userName };
        return user;
    }

    async getUser(userName: string) {
        const userNames = userName.toLowerCase();
        const foundUser = await this.userModel.findOne({userNames});
        return foundUser;
    }
}
