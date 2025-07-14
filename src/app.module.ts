import { type MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigsModule } from '@configs';
import { DatabasesModule } from '@databases';
import { ContextMiddleware, UUIDMiddleware } from '@middlewares';
import { ContextModule } from '@libs/context';
import { AdminsModule } from './services/admins.module';
import { GeneralsModule } from './services/generals.module';

@Module({
  imports: [ConfigsModule, DatabasesModule, ContextModule, AdminsModule, GeneralsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ContextMiddleware, UUIDMiddleware).forRoutes('*');
  }
}
