if (process.env.NODE_ENV !== 'production') {
  require('dotenv/config');
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = process.env.APP_PORT || 3000;
  await app.listen(appPort, () => {
    console.log(`\nServer is running at: http://localhost:${appPort}\n`);
  });
}

bootstrap();
