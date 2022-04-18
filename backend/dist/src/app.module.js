"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const track_module_1 = require("./modules/track/track.module");
const core_1 = require("@nestjs/core");
const filters_1 = require("./shared/filters");
const winston = require("winston");
const nest_winston_1 = require("nest-winston");
require("dotenv/config");
const enums_1 = require("./shared/enums");
const interceptors_1 = require("./shared/interceptors");
let winstonTransports = [];
if (process.env.ENV === enums_1.NODE_ENV.PRODUCTION) {
    winstonTransports = [
        new winston.transports.File({
            filename: `logs/${new Date()
                .toLocaleDateString()
                .replace(/\//g, '-')}/error.log`,
            level: 'error',
        }),
    ];
}
else {
    winstonTransports = [new winston.transports.Console()];
}
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_winston_1.WinstonModule.forRoot({
                transports: winstonTransports,
            }),
            track_module_1.TrackModule,
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/nest'),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '../..', 'tracker'),
                serveStaticOptions: {
                    index: 'tracker.js'
                }
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: interceptors_1.HttpConsoleLoggerInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: filters_1.HttpExceptionFilter,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map