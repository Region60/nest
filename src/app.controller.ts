import { CreateUserDto } from './users/user.dto/create-user.dto';
import { UserService } from 'src/users/users.service';
import { Controller, Get, Request, Post, UseGuards, Body, Delete, Put } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @Post('auth/register')
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    console.log(CreateUserDto)
    return this.authService.createUser(CreateUserDto)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Body() user) {
    return this.authService.getUser(user)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Body() user) {
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
