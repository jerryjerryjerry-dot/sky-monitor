import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 配置 CORS（允许各种来源的数据上报）
  app.enableCors({
    origin: '*', // DSN Server 需要接收各种来源的数据上报
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-App-Id'],
  });

  // 全局路由前缀
  app.setGlobalPrefix('dsn');

  // 监听端口 8080（对应 miaoma-monitor 的 dsn server）
  const port = process.env.PORT ?? 8080;
  await app.listen(port);

  logger.log(
    `DSN Server (SDK Server) is running on: http://localhost:${port}`,
  );
  logger.log(`API Prefix: /dsn`);
}

bootstrap();
