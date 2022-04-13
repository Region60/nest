import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './users.providers';
import { UserService } from './users.service';

describe('UsersService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,  ...userProviders],
      imports: [DatabaseModule, AuthModule],

    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service.getAll).toBeDefined();
  });
});
