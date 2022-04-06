import helmet from 'helmet'
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("написать тесты")
  console.log("захешировать пароль")
  console.log("реализовать два вида регистрации и два вида логинизации")

  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.useGlobalPipes(new ValidationPipe)
  await app.listen(3000);
}
bootstrap();
