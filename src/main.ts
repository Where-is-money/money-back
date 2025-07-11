import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigsService } from '@configs';

(async () => {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigsService);

  await app.listen(config.server.port, () =>
    console.log(`server is running on ${config.server.port}.`)
  );
})();
