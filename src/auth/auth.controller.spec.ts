import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from 'src/users/users.service';
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.stratagy';
import { LocalStrategy } from './local.strategy';


describe('AuthController', () => {
  let controller: AuthController;
  let services: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [UserService, AuthService],
      
    }).compile();

    controller = module.get<AuthController>(AuthController)
    services = module.get<AuthService>(AuthService)
  });
  

  it('should be defined', () => {
    const result: any=  {username:'name',email: 'email', id:123 }
    jest.spyOn(services, 'createUser').mockImplementation(() => result);

    expect(controller.createUser({username:'name',email: 'email', password:'password' })).toBe(result);
  });
});
