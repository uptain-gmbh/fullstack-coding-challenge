import { BaseError } from './base.error';

/**
 * Conflict Error, that is thrown on business logic-related issues. It should return 409 error code.
 */
export class ConflictError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
