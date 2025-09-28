/*
 * Sky-Monitor ClickHouse 模块
 * 提供 ClickHouse 数据库连接和操作功能
 */
import { createClient } from '@clickhouse/client';
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({})
export class ClickhouseModule {
  static forRoot(options: {
    url: string;
    username: string;
    password: string;
  }): DynamicModule {
    return {
      module: ClickhouseModule,
      providers: [
        {
          provide: 'CLICKHOUSE_CLIENT',
          useFactory: () => {
            return createClient({
              url: options.url,
              username: options.username,
              password: options.password,
            });
          },
        },
      ],
      exports: ['CLICKHOUSE_CLIENT'],
    };
  }
}
