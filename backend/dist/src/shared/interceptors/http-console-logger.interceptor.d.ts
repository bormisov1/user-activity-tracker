import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class HttpConsoleLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, call$: CallHandler): Observable<any>;
}
