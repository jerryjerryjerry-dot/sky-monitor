import { join } from 'node:path'

export default () => {
    return {
        database: {
            type: 'postgres',
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT || '5432', 10),
            username: process.env.DB_USERNAME || 'postgres',
            password: process.env.DB_PASSWORD || 'skypostgres',
            database: process.env.DB_DATABASE || 'sky_monitor',
            entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
            synchronize: process.env.NODE_ENV === 'development',
            logging: process.env.NODE_ENV === 'development',
        },
    }
}
