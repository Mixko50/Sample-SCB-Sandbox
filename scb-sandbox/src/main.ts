import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ["https://scb-sandbox.mixkoap.com", "http://localhost:3000"],
    credentials: true
  });
  await app.listen(8080);
}
bootstrap();
