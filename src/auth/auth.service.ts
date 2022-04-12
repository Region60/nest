import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/user.dto/create-user.dto'
import { LoginUserDto } from 'src/users/user.dto/login-user.dto '
import { UserService } from 'src/users/users.service'
import bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne({ username })
    const isMatch = await bcrypt.compare(password, user.password)
    if (user && isMatch) {
      const { id, username } = user
      const result = { id, username }
      return result
    }
    return null
  }

  async login(user: LoginUserDto) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async createUser(user: CreateUserDto) {
    const foundUserByUsername = await this.userService.findOne({ username: user.username })
    if (foundUserByUsername) {
      throw new HttpException('a user with this username already exists', 404)
    }
    const foundUserByUserByEmail = await this.userService.findOne({ email: user.email })
    if (foundUserByUserByEmail) {
      throw new HttpException('a user with this email already exists', 404)
    }
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    console.log(hash)
    const newUser = await this.userService.create(user)
    const { username, email, id } = newUser
    return { username, email, id }

  }

  async deleteUser(user) {
    const foundUser = await this.userService.findOne({ username: user.username })
    if (!foundUser) {
      throw new HttpException('a user with this username already exists', 404)
    }
    return this.userService.delete(user)
  }


}
