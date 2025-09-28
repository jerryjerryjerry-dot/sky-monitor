/*
 * Sky-Monitor DSN Server 主模块
 * 负责接收和转发监控数据
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './config/database';
import { ClickhouseModule } from './fundamentals/clickhouse/clickhouse.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get('database') || {};
      },
      inject: [ConfigService],
    }),
    ClickhouseModule.forRoot({
      url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
      username: process.env.CLICKHOUSE_USERNAME || 'default',
      password: process.env.CLICKHOUSE_PASSWORD || 'skyclickhouse',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
