import { CreateUserDto } from './create-user.dto';
import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(CreateUserDto);
    console.log(createdUser)
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(user): Promise<User>{
    return this.userModel.findOne({name: user.name}).exec()
  }
}