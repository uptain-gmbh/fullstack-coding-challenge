import { BaseError } from './base.error';

/**
 * Not Found Error, this one is thrown when no entity can be found in database (or by permissions). It has 404 error code.
 */
export class NotFoundError extends BaseError {
    constructor(message: string) {
        super(message);
    }
}
