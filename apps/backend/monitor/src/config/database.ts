import { join } from 'node:path'

export default () => {
    const isProd = process.env.NODE_ENV === 'production'
    return {
        database: {
            type: 'postgres',
            // host: 'localhost',
            // host: '192.168.31.94',
            // host: '47.98.248.76',
            host: isProd ? '172.28.49.109' : '192.168.31.94',
            port: 5432,
            username: 'postgres',
            // database: 'sky-monitor-dsn',
            database: 'postgres',
            password: 'xiaoer',
            entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
            synchronize: true,
        },
    }
}
