"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var HttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = HttpExceptionFilter_1 = class HttpExceptionFilter {
    constructor(winstonLogger) {
        this.winstonLogger = winstonLogger;
        this.logger = new common_1.Logger(HttpExceptionFilter_1.name);
    }
    catch(error, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const status = error instanceof common_1.HttpException
            ? error.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            const err = {
                statusCode: 500,
                timestamp: new Date().toISOString(),
                path: request.url,
                message: String(error.stack),
            };
            this.logger.error(error.stack);
            this.winstonLogger.error(err);
            return response.status(500).json(err);
        }
        return response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            message: error.message,
        });
    }
};
HttpExceptionFilter = HttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(),
    __param(0, (0, common_1.Inject)('winston')),
    __metadata("design:paramtypes", [common_1.Logger])
], HttpExceptionFilter);
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map