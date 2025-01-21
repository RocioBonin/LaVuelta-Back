import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middleware/errors.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserSeeds } from './seeds/users/users.seeds';
import { loggerMiddleware } from './middleware/logger.middleware';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const usersSeed = app.get(UserSeeds);
  await usersSeed.seed();

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('La Vuelta Logística')
    .setDescription('Documentación de la API construida con Nest')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(loggerMiddleware)

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
