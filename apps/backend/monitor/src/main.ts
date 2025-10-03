import 'dotenv/config';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');

  // 配置 CORS（允许前端跨域请求）
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:80',
      'http://localhost',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
  });

  // 全局路由前缀
  app.setGlobalPrefix('api');

  // 监听端口 8081（对应 miaoma-monitor 的 monitor server）
  const port = process.env.PORT ?? 8081;
  await app.listen(port);

  logger.log(
    `Monitor Server (API Server) is running on: http://localhost:${port}`,
  );
  logger.log(`API Prefix: /api`);
  console.log(`Monitor Server (API Server) is running on: http://localhost:${port}`);
  console.log(`API Prefix: /api`);
}

bootstrap();
