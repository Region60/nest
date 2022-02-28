import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  controllers:[AppController],
  imports: [UsersModule, AuthModule],
  providers: [AuthService,AppService],
  })
export class AppModule { }
