"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const path_1 = require("path");
const filters_1 = require("./common/filters");
const pipes_1 = require("./common/pipes");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads'), {
        prefix: '/uploads/',
    });
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'uploads', 'images'), {
        prefix: '/images/',
    });
    app.enableCors({
        origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
        credentials: true,
    });
    app.useGlobalFilters(new filters_1.AllExceptionsFilter());
    app.useGlobalPipes(new pipes_1.SanitizationPipe());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.setGlobalPrefix('api');
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map