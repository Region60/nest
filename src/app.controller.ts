import { UserService } from 'src/users/users.service';
import { Controller, Get, Request, Post, UseGuards,Body, Delete, Put } from '@nestjs/common'
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
  async createUser(@Body() body){
    return  this.authService.createUser(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Body() body) {
    return this.authService.getUser(body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Body() body) {
    return this.authService.deleteUser(body)
  }

  @UseGuards(JwtAuthGuard)
  @Put('update')
  update(@Body() body) {
    return this.userService.update(body)}
  
}
