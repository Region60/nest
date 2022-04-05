import { GetUserDto } from './users/user.dto/get-user.dto';
import { CreateUserDto } from './users/user.dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import { Controller, Get, Request, Post, UseGuards, Body, Delete, Put } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { DeleteUserDto } from './users/user.dto/delete-user.dto';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

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
  async getProfile(@Body() body:GetUserDto) {
    return this.authService.getUser(body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Body() user: DeleteUserDto) {
    return this.authService.deleteUser(user)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  update(@Body() body) {
    return this.userService.update(body)
  }

  @Get('getall')
  getAll(@Body() body) {
    return this.userService.getAll(body.page, body.count)
  }

}
