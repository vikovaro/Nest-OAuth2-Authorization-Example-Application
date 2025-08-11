import { NestFactory } from '@nestjs/core';
import { GlobalModule } from './global.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(GlobalModule);

    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });

    const config = new DocumentBuilder()
        .setTitle('1wrust survival docs')
        .setDescription('The 1wrust survival API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);

    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    BigInt.prototype['toJSON'] = function () {
        return this.toString();
    };

    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
