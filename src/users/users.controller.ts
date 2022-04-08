import { Controller, Get, Body, UseGuards, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetAllUserDto } from './user.dto/getAll-user.dto';
import { UpdateUserDto } from './user.dto/update-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UserService
    ) { }

    @Get('profile')
    getUser(@Body() user){
        return this.userService.findOne(user)
    }

    @Get('getall')
    getAll(@Body() GetAllUserDto: GetAllUserDto) {
        return this.userService.getAll(GetAllUserDto.page, GetAllUserDto.count)
    }

    @UseGuards(JwtAuthGuard)
    @Put('updatepass')
    update(@Body() UpdateUserDto: UpdateUserDto) {
      return this.userService.updatePass(UpdateUserDto)
    }

}
