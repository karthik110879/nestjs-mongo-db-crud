import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UsersService } from '../user/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService
    ) {}

    async validateUser(userName:string, password:string): Promise<any> {
        
        const user = await this.userService.getUser(userName);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!user) {
            throw new NotAcceptableException('Could not find the user');
        }
        if( user && isPasswordValid) {
            return {
                userId: user.id,
                userName: user.userName 
            }
        }
        return null;
    }   
}
