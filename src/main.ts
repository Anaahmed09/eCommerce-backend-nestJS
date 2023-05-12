import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT);
  new Logger().log(`app connected at port ${process.env.PORT}`);
}
bootstrap();
