"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("dotenv/config");
const swagger_1 = require("@nestjs/swagger");
const enums_1 = require("./shared/enums");
const common_1 = require("@nestjs/common");
const exceptions_1 = require("./shared/exceptions");
const filters_1 = require("./shared/filters");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.enableCors();
    app.setGlobalPrefix('api/v1');
    app.useGlobalFilters(new filters_1.ValidationFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        exceptionFactory: (errors) => {
            return new exceptions_1.ValidationException(errors);
        },
    }));
    if (process.env.ENV == enums_1.NODE_ENV.DEVELOPMENT) {
        const swaggerOptions = new swagger_1.DocumentBuilder()
            .setTitle('NESTJS Auth with Roles and Permissions')
            .setDescription('APIs for NestJs Template.')
            .setVersion('1.0.0')
            .addBearerAuth()
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, swaggerOptions, {
            ignoreGlobalPrefix: false,
        });
        swagger_1.SwaggerModule.setup('api/v1/docs', app, document);
    }
    await app.listen(process.env.APP_PORT || 8001);
}
bootstrap();
//# sourceMappingURL=main.js.map