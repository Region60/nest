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

  async createUser(user: User) {
    const foundUser = await this.userService.findOne({ name: user.name })
    if (user) {
      return 'a user with this name already exists'
    }
    const newUser = await this.userService.create(user)
    const { name,email,id } = newUser
    return {name,email,id }
  }

async deleteUser(user:User) {
  console.log(user)
  const foundUser = await this.userService.findOne({ name: user.name })
  if (user) {
    return 'a user with this name already exists'
  }
  this.userService.delete(user)
}
}
