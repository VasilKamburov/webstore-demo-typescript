import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { User } from './models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { AuthCredentialsDto } from './models/auth-credentials.dto';
import { GetUser } from './models/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ChangeItemInListDto } from './models/item-adding.dto';

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
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.userService.signIn(authCredentialsDto);
    }

    @Put('/addToList')
    @UseGuards(AuthGuard())
    addToCart(
        @Body() changeItemInListDto: ChangeItemInListDto,
        @GetUser() user: User,
    ): Promise<string> {
    return this.userService.addToList(user, changeItemInListDto);
    }

    @Put('/removeFromList')
    @UseGuards(AuthGuard())
    removeFromList(
        @Body() changeItemInListDto: ChangeItemInListDto,
        @GetUser() user: User,
    ): Promise<string> {
    return this.userService.removeFromList(user, changeItemInListDto);
    }
}
