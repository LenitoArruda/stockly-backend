import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { NotFoundErrorFilter } from "./common/filters/not-found-error.filter";
import { AlreadyExistsErrorFilter } from "./common/filters/already-exists-error.filter";
import { InvalidCredentialsErrorFilter } from "./auth/filters/invalid-credentials-error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new NotFoundErrorFilter(),
    new AlreadyExistsErrorFilter(),
    new InvalidCredentialsErrorFilter()
  );

  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
  }));

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
