import { BaseError } from './base.error';
import { ValidationError as ClassValidatorError } from 'class-validator';

/**
 * Validation Error, will be thrown when input modes can't pass validation flow. Error code is 400.
 */
export class ValidationError extends BaseError {

    constructor(public validations?: Record<string, any>) {
        super(validations);
    }

    static fromClassValidatorError(errors: ClassValidatorError[]): ValidationError {

        type ValidationPropertyError = {
            property: string;
            errors: string[];
        };

        const validations: ValidationPropertyError[] = errors.reduce((acc: ValidationPropertyError[], validation) => {
            const { property, constraints } = validation;
            let messages = [];

            if (constraints) {
                const errors = Object.values(constraints);

                const message = {
                    property,
                    errors,
                };

                messages.push(message);
            }

            return [...acc, ...messages];
        }, []);

        return new ValidationError(validations);
    }
}
