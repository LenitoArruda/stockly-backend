import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { AlreadyExistsErrorFilter } from './common/filters/already-exists-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new NotFoundErrorFilter());
  app.useGlobalFilters(new AlreadyExistsErrorFilter());

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
