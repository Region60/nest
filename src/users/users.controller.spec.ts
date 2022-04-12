import { Test, TestingModule } from '@nestjs/testing';
import { GetAllUserDto } from './user.dto/getAll-user.dto';
import { UsersController } from './users.controller';
import { userProviders } from './users.providers';
import { UserService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService,  ...userProviders]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined',async () => {
    const result: any = ['test'];
      jest.spyOn(service, 'getAll').mockImplementation(() => result);
    expect(await controller.getAll(new GetAllUserDto)).toBe(result);
  });
});
