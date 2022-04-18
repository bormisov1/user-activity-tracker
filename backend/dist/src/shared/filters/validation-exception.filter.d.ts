import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { ValidationException } from '../exceptions/validation.exception';
export declare class ValidationFilter implements ExceptionFilter {
    catch(exception: ValidationException, host: ArgumentsHost): any;
    private formatErrors;
}
