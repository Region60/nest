import { CreateUserDto } from './create-user.dto'
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

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user): Promise<User> {
    return this.userModel.findOne({ name: user.name }).exec()
  }

  delete(user) {
   // console.log(user)
    let result = this.userModel.deleteOne({ name: user.name }).exec()


  }
}