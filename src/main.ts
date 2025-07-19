import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigsService } from '@configs';
import { setupAdminSwagger, setupGeneralSwagger } from './swaggers/swagger.setup';

(async () => {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 기존 설정
  const config = app.get(ConfigsService);
  const { port } = config.server;

  // Swagger 설정
  setupAdminSwagger(app);
  setupGeneralSwagger(app);

  await app.listen(port, () => {
    console.log(`server is running on ${port}.`);
    console.log(`[admin-api-docs] http://localhost:${port}/admin-api-docs`);
    console.log(`[general-api-docs] http://localhost:${port}/general-api-docs`);
  });
})();
