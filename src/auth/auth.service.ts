import { HttpCode, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from 'src/users/user.interface'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ name: username })
    if (user && user.password === pass) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.userId }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async createUser(userData: User) {
    const user = await this.userService.findOne({ name: userData.name })
    if (user) {
      return 'a user with this email already exists'
    }
    const newUser = await this.userService.create(userData)
    const { name,email,id } = newUser
    return {name,email,id }
  }
}
