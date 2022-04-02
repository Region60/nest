import { HttpCode, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/user.dto/create-user.dto'
import { User } from 'src/users/user.interface'
import { UserService } from 'src/users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({username})
    if (user && user.password === password) {
      const { id, username } = user
      const result = { id, username }

      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async createUser(user:CreateUserDto) {
    const foundUser = await this.userService.findOne({username: user.username})
    if (foundUser) {
      return 'a user with this username already exists'
    }
      const newUser = await this.userService.create(user)
      const { username, email, id } = newUser
      return { username, email, id }
    
  }

  async deleteUser(user: User) {
    const foundUser = await this.userService.findOne({ username: user.username })
    if (!foundUser) {
      return 'a user with this username already exists'
    }
    return this.userService.delete(user)
  }

  async getUser(user: User) {
    const foundUser = await this.userService.findOne({ username: user.username })
    if (!foundUser) {
      return 'a user with this username already exists'
    }
    let { username, email, id } = foundUser
    return { username, email, id }
  }
}
