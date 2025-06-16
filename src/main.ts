import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/middleware/errors.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeeds } from './seeders/user/user.seeds';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const usersSeed = app.get(UsersSeeds);
  await usersSeed.run();

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('La Vuelta Logística')
    .setDescription('Documentación de la API construida con Nest')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

   const configService = app.get(ConfigService);

  const origins = configService.get<string>('CORS_ORIGIN')?.split(',') || [];

  app.enableCors({
    origin: origins,
    credentials: true,
  });

  app.use(loggerMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
