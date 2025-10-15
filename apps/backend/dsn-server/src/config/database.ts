export default () => {
    return {
        clickhouse: {
            url: process.env.CLICKHOUSE_HOST || 'http://localhost:8123',
            username: process.env.CLICKHOUSE_USERNAME || 'default',
            password: process.env.CLICKHOUSE_PASSWORD || 'skyclickhouse',
            database: process.env.CLICKHOUSE_DATABASE || 'sky_monitor',
        },
    }
}
