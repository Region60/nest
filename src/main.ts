import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("типизировать getAll usersService")
  console.log("сделать проверку почты при регистрации")
  console.log("написать тесты")
  console.log("дописать дто ")
  console.log("реализовать два вида регистрации и два вида логинизации")

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
