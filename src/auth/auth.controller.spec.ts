import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing'
import { UsersModule } from 'src/users/users.module';
import { UserService } from 'src/users/users.service';
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.stratagy';
import { LocalStrategy } from './local.strategy';


describe('AuthController', () => {
  let controller: AuthController;
  let services: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '12h' },
        }),
      ],
      providers: [AuthService, LocalStrategy, JwtStrategy],      
    }).compile();

    controller = module.get<AuthController>(AuthController)
    services = module.get<AuthService>(AuthService)
  });
  

  it('should be defined', () => {
    const result: any=  {username:'name',email: 'email', id:123 }
    jest.spyOn(services, 'createUser').mockImplementation(() => result);

    expect(controller.createUser({username:'name1',email: 'email', password:'password' })).toBe(result.then());
  });
});
