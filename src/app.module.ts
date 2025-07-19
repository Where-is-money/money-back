import { type MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';
import { RequestLoggerInterceptor } from '@libs/interceptors';
import adminsModules from './services/admins';
import generalsModules from './services/generals';
import { CommonModule } from '@common/common.module';
import { AuthModule } from './services/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigsService } from '@configs';
import { AuthGuard, RoleGuard } from '@libs/guards';
import { ExceptionFilter } from '@libs/filters';

@Module({
  imports: [
    ConfigsModule,
    DatabasesModule,
    ContextModule,
    CommonModule,
    AuthModule,
    JwtModule.registerAsync({
      inject: [ConfigsService],
      useFactory: (config: ConfigsService) => ({
        secret: config.jwt.secret,
      }),
    }),
    ...adminsModules,
    ...generalsModules,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
