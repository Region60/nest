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
  async createUser(@Body() user) {
    return this.authService.createUser(user)
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
  update(@Body() user) {
    return this.userService.update(user)
  }

  @Get('getall')
  getAll() {
    return this.userService.getAll()
  }

}
