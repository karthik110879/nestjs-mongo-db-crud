import { Body, Controller, Get, HttpStatus, Param, Post, Req, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/shared/dto/user.dto';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt'
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';

// @UseGuards(LocalAuthGuard)
@Controller('v1/users/')
export class UsersController {
    constructor(
        private userService: UsersService,
    ) { }

    @Post('signup')
    async createUser(@Body() userDto: UserDto, @Res() res) {
        try {
            const saltOrRounds = 10;
            const hashedPassword = await bcrypt.hash(userDto.password, saltOrRounds)
            // userDto.password = hashedPassword
            const newUser = await this.userService.createUser({
                userName: userDto.userName.toLowerCase(),
                password: hashedPassword
            });

            return res.status(HttpStatus.CREATED).json(
                {
                    message: 'User registered successfully',
                    userId: newUser.id,
                    userName: newUser.userName,
                    userPass: newUser.password
                }
            )
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(
                {
                    message: 'Error: User not created',
                    error: 'Bad Request'
                }
            )
        }
    }

    // @UseGuards(LocalAuthGuard)

    @Post('/login')
    async loginUser(@Body() userDto: UserDto, @Res() res) {
        try {
            const jwtToken = await this.userService.signIn(userDto.userName, userDto.password);
            return res.status(HttpStatus.CREATED).json(
                {
                    message: 'User Loggedin successfully',
                    token: jwtToken, 
                }
            )
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(
                {
                    message: 'Error: User not Loggedin',
                    error: 'Bad Request'
                }
            )
        }
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async getUserProfile(@Param('id') userId: string, @Res() res) {
        try {
            const user = await this.userService.getUserById(userId);
            return res.status(HttpStatus.FOUND).send(user)
        } catch (error) {
            return res.status(HttpStatus.BAD_REQUEST).json(
                {
                    message: 'Error: User not found',
                    error: 'Bad Request'
                }
            )
        }
    }
 
}
