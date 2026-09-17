import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

// Bootstrap aplikasi NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix untuk semua endpoint
  app.setGlobalPrefix('api');

  // CORS untuk frontend (fasa 8)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  });

  const port = process.env.PORT ? Number(process.env.PORT) : 3001;
  await app.listen(port);

  Logger.log(`Backend running on http://localhost:${port}/api`, 'Bootstrap');
}

bootstrap();
