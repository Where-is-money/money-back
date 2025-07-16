import { type MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';
import { RequestLoggerInterceptor } from '@libs/interceptors';
import adminsModules from './services/admins';
import generalsModules from './services/generals';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CommonModule } from '@common';

@Module({
  imports: [
    ConfigsModule,
    DatabasesModule,
    ContextModule,
    EventEmitterModule.forRoot(),
    CommonModule,
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
