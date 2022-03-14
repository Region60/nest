import { Controller, Get, Request, Post, UseGuards,Body, Delete } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthService } from './auth/auth.service'
import { JwtStrategy } from './auth/jwt.stratagy'

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

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
  getProfile(@Request() req) {
    return req.user
  }

  @UseGuards(JwtAuthGuard)
  @Delete('auth/delete')
  delete(@Request() req) {
    return this.authService.deleteUser(req.user)
  }
}
