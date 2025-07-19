import { type MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';
import { RequestLoggerInterceptor } from '@libs/interceptors';
import adminsModules from './services/admins';
import generalsModules from './services/generals';
import { CommonModule } from '@common/common.module';
import { AuthModule } from './services/auth/auth.module';

@Module({
  imports: [
    ConfigsModule,
    DatabasesModule,
    ContextModule,
    CommonModule,
    AuthModule,
    ...adminsModules,
    ...generalsModules,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
