/*
 * Sky-Monitor 数据库配置
 * 配置 PostgreSQL 和 ClickHouse 连接参数
 */
import { join } from 'node:path';

export default () => ({
  database: {
    type: 'postgres' as const,
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'skypostgres',
    database: process.env.DB_DATABASE || 'sky_monitor',
    entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  },
  clickhouse: {
    url: process.env.CLICKHOUSE_URL || 'http://localhost:8123',
    username: process.env.CLICKHOUSE_USERNAME || 'default',
    password: process.env.CLICKHOUSE_PASSWORD || 'skyclickhouse',
  },
});
