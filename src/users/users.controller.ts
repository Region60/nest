import { Controller, Get, Body } from '@nestjs/common';
import { GetAllUserDto } from './user.dto/getAll-user.dto';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(
        private userService: UserService
    ) { }

    @Get('getall')
    getAll(@Body() GetAllUserDto: GetAllUserDto) {
        return this.userService.getAll(GetAllUserDto.page, GetAllUserDto.count)
    }

}
