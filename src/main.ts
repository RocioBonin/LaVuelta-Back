import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './middleware/errors.middleware';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { auth } from 'express-openid-connect';
import { loggerMiddleware } from './middleware/logger.middleware';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import { UserSeeds } from './seeds/users/users.seeds';
import * as passport from 'passport';
import { auth0config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //config cookie
  app.use(cookieParser());

  app.use(
    session({
      secret:
        'f9c2ba3e7f524b4a9095c8e75c98fef4b029b7faeead8f3319c4fcedb94a756a1a0b4f7f2600f2899b1e6e4b3a645f09310e8d912aec1aef52eafe7c54d9e3f4',
      resave: false,
      saveUninitialized: false,
      cookie: { httpOnly: true, secure: false }, // Cambiar a true si se usa HTTPS
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.use(auth({ ...auth0config }));

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

  app.use(loggerMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
