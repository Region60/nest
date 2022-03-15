import { Module} from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { UserService } from './users.service'
import { userProviders } from './users.providers'

@Module({
  imports:[DatabaseModule],
  providers: [UserService, ...userProviders],
  exports:[UserService]
})
export class UsersModule {}
