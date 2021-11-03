/**
 * An abstract base class for error handling
 */
export abstract class BaseError extends Error {

    protected constructor(message: unknown) {
        if (typeof message === "string")
            super(message);
        else
            super(JSON.stringify(message));
    }
}
