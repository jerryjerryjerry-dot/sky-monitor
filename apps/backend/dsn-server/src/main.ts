import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './fundamentals/common/filters/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter())

    // CORS 配置（DSN Server 需要接收各种来源的数据上报）
    app.enableCors({
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-App-Id'],
    })

    app.setGlobalPrefix('dsn')

    // Swagger 文档配置
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Sky-Monitor SDK API 文档')
        .setDescription('Sky-Monitor 监控平台 SDK 数据上报 API 文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('doc', app, document)

    const port = process.env.PORT || 8080
    await app.listen(port)
    console.log(`DSN Server 启动成功: http://localhost:${port}`)
    console.log(`API 文档地址: http://localhost:${port}/doc`)
}

bootstrap()
