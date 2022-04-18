import { ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private readonly winstonLogger;
    private readonly logger;
    constructor(winstonLogger: Logger);
    catch(error: Error, host: ArgumentsHost): any;
}
