import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from './users.service'
import { userProviders } from './users.providers'
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [UsersController]
})
export class UsersModule { }
