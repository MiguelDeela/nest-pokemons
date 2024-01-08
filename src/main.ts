import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v2');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove all non-whitelisted properties
      forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
      transform: true, // transform payload to DTO instance
      transformOptions: {
        enableImplicitConversion: true, // convert primitive types
      },
    })
  );

  await app.listen(process.env.PORT);
  console.log(`Application is running on port ${process.env.PORT}`);
}
bootstrap();
