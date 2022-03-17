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

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ name })
    if (user && user.password === password) {
      const { id, name } = user
      const result = { id, name }

      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async createUser(user: User) {
    const foundUser = await this.userService.findOne({ name: user.name })
    if (foundUser) {
      return 'a user with this name already exists'
    }
    const newUser = await this.userService.create(user)
    const { name, email, id } = newUser
    return { name, email, id }
  }

  async deleteUser(user: User) {
    const foundUser = await this.userService.findOne({ name: user.name })
    if (!foundUser) {
      return 'a user with this name already exists'
    }
    return this.userService.delete(user)
  }

  async getUser (user:User) {
    const foundUser = await this.userService.findOne({ name: user.name })
    if (!foundUser) {
      return 'a user with this name already exists'
    }
    return foundUser
  }
}
