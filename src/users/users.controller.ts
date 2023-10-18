import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './models/auth-credentials.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.findAllUsers();
    }

    @Post('/signup')
    createUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userService.singUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<string> {
        return this.userService.signIn(authCredentialsDto);
    }
}
