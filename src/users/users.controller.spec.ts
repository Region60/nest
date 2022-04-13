import { databaseProviders } from './../database/database.providers';
import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserDto } from './user.dto/getAll-user.dto';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { UserService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService, ...userProviders],
      imports: [DatabaseModule],

    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UserService>(UserService)
  });

  it('should be defined',async () => {
    const result: any = ['test'];
      jest.spyOn(service, 'getAll').mockImplementation(() => result);
    expect(await controller.getAll(new GetAllUserDto)).toBe(result);
  });
});
