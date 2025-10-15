import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './fundamentals/common/filters/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter())

    // CORS 配置
    app.enableCors({
        origin: ['http://localhost:5173', 'http://localhost:80', 'http://localhost'],
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    })

    app.setGlobalPrefix('api')

    // Swagger 文档配置
    const swaggerOptions = new DocumentBuilder()
        .setTitle('Sky-Monitor 监控平台 API 文档')
        .setDescription('Sky-Monitor 监控平台数据服务 API 文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('doc', app, document)

    const port = process.env.PORT || 8081
    await app.listen(port)
    console.log(`Monitor Server 启动成功: http://localhost:${port}`)
    console.log(`API 文档地址: http://localhost:${port}/doc`)
}

bootstrap()
