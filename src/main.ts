import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigsService } from '@configs';
import { setupAdminSwagger, setupGeneralSwagger } from './swaggers/swagger.setup';

(async () => {
  const app = await NestFactory.create(AppModule);

  // 기존 설정
  const config = app.get(ConfigsService);

  // Swagger 설정
  setupAdminSwagger(app);
  setupGeneralSwagger(app);

  await app.listen(config.server.port, () =>
    console.log(`server is running on ${config.server.port}.`)
  );
})();
