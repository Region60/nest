import { CreateUserDto } from './user.dto/create-user.dto'
import { Model } from 'mongoose'
import { Injectable, Inject } from '@nestjs/common'
import { User } from './user.interface'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) { }

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(CreateUserDto)
    let result = await createdUser.save()
    return result
  }

  async getAll() {
    let users = await this.userModel.find().exec()
    let result = users.map((i) => {
      let { password, username, email, id} = i
      return {username,email,id}
    })
    return result
  }

  async findOne(value): Promise<User> {
    return this.userModel.findOne(value).exec()
  }

  async delete(user) {
    let result = this.userModel.deleteOne({ username: user.username }).exec()
    return result
  }

  async update(user) {
    let result = this.userModel.updateOne({ username: user.username }, { $set: { password: user.password } })
    return result
  }

}