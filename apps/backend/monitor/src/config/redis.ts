/**
 * Redis 配置
 */
export default () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || 'skyredis',
    db: parseInt(process.env.REDIS_DB || '0'),
  },
});
