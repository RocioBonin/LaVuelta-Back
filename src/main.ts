import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/middleware/errors.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UsersSeeds } from './seeders/user/user.seeds';
import { loggerMiddleware } from './common/middleware/logger.middleware';
import { DateFormatInterceptor } from './common/interceptor/date-format.interceptor';
import { PackagesSeeds } from './seeders/package/package.seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const usersSeed = app.get(UsersSeeds);
  await usersSeed.seedUsers();
  
  const packagesSeed = app.get(PackagesSeeds);
  await packagesSeed.seedPackages();

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('La Vuelta Logística')
    .setDescription('Documentación de la API construida con Nest')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new DateFormatInterceptor());

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
