import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { AlreadyExistsErrorFilter } from './common/filters/already-exists-error.filter';
import { InvalidCredentialsErrorFilter } from './auth/filters/invalid-credentials-error.filter';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.use(cookieParser());

  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new AlreadyExistsErrorFilter(),
    new InvalidCredentialsErrorFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie'],
  });

  await app.listen(process.env.LISTEN_PORT ?? 3000);
}
bootstrap();
