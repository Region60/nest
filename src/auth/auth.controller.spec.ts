import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from './auth.controller'
import { CreateUserDto } from 'src/users/user.dto/create-user.dto'
import { AuthService } from './auth.service';


describe('AuthController', () => {
  let controller: AuthController;
  let services: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    }).compile();

    controller = module.get<AuthController>(AuthController)
    services = module.get<AuthService>(AuthService)
  });
  

  it('should be defined', () => {
    const result: any=  {username:'name',email: 'email', password:'password' }
    jest.spyOn(services, 'createUser').mockImplementation(() => result);

    expect(controller.createUser({username:'name',email: 'email', password:'password' })).toBe(result);
  });
});
