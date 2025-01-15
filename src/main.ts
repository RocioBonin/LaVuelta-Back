import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middleware/errors.middleware';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import { auth } from 'express-openid-connect';
import { config as authConfig } from './config/auth0.config'
import { loggerMiddleware } from './middleware/logger.middleware';
import { UserSeeds } from './seeds/users/users.seeds';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: false,
    transform: true,
  }));

  app.use(auth(authConfig));

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

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

}

bootstrap();
