import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import adminsModules from '../services/admins';
import generalsModules from '../services/generals';
import { AuthModule } from '../services/auth/auth.module';
import { SignInResponseDto } from '../services/auth/presentation/dto';

export function setupAdminSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Admin API')
    .setDescription('관리자용 API 문서')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SignInResponseDto],
    include: [...adminsModules, AuthModule],
  });
  SwaggerModule.setup('admin-api-docs', app, document);
}

export function setupGeneralSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('General API')
    .setDescription('일반 사용자용 API 문서')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'token'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [SignInResponseDto],
    include: [...generalsModules, AuthModule],
  });
  SwaggerModule.setup('general-api-docs', app, document);
}
