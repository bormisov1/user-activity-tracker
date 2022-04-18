import { BadRequestException } from '@nestjs/common';
export declare class ValidationException extends BadRequestException {
    validationErrors: any;
    constructor(validationErrors: any);
}
