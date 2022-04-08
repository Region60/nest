import { Controller, Post, Body, Request, UseGuards, Delete } from '@nestjs/common';
import { CreateUserDto } from 'src/users/user.dto/create-user.dto';
import { DeleteUserDto } from 'src/users/user.dto/delete-user.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
constructor(
    private authService: AuthService
) {}

@Post('register')
async createUser(@Body() CreateUserDto: CreateUserDto) {
  return this.authService.createUser(CreateUserDto)
}


@UseGuards(LocalAuthGuard)
@Post('login')
async login(@Request() req) {
  return this.authService.login(req.user)
}

@UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete(@Body() DeleteUserDto: DeleteUserDto) {
    return this.authService.deleteUser(DeleteUserDto)
  }

}
