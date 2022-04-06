import { GetUserDto } from './users/user.dto/get-user.dto';
import { CreateUserDto } from './users/user.dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import { Controller, Get, Request, Post, UseGuards, Body, Delete, Put } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { DeleteUserDto } from './users/user.dto/delete-user.dto';
import { GetAllUserDto } from './users/user.dto/getAll-user.dto';
import { UpdateUserDto } from './users/user.dto/update-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Post('auth/register')
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.authService.createUser(CreateUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Body() GetUserDto:GetUserDto) {
    return this.userService.getUser(GetUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Body() DeleteUserDto: DeleteUserDto) {
    return this.authService.deleteUser(DeleteUserDto)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  update(@Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.update(UpdateUserDto)
  }

  @Get('getall')
  getAll(@Body() GetAllUserDto: GetAllUserDto) {
    return this.userService.getAll(GetAllUserDto.page, GetAllUserDto.count)
  }

}
