import { APIGatewayEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ValidationError } from '@uptain/core';
import { ConflictError } from '@uptain/core';
import { NotFoundError } from '@uptain/core';
import Debug from 'debug';
const debug = Debug("shared:utils");

export type ExecutionFunc = () => Promise<APIGatewayProxyResult>;

/**
 * Function that must cover every lambda handler. It's responsible for response handling.
 * If we decide to go with a framework inside lambda, then we can say that it's a middleware.
 * @param func Internal function to execute.
 */
export const tryExecute = async (func: ExecutionFunc) => {

        try {
            return await func();
        } catch(error: any) {

            debug('Exception was thrown: %O', error);

            // ideally we should use here an instanceof way of switch,
            // but it's just a manned of style as for me.

            const headers = {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                }
            };

            const name = error?.constructor?.name;
            switch(name) {
                case ValidationError.prototype.constructor.name:
                    const validationError = error as ValidationError;
                    return {
                        ...headers,
                        statusCode: 400,
                        body: validationError.validations ? JSON.stringify({ error: validationError.validations }) : null
                    };
                case NotFoundError.prototype.constructor.name:
                    const notFoundError = error as NotFoundError;
                    return {
                        ...headers,
                        statusCode: 404,
                        body: JSON.stringify({ error: notFoundError.message })
                    };
                case ConflictError.prototype.constructor.name:
                    const conflictError = error as ConflictError;
                    return {
                        ...headers,
                        statusCode: 409,
                        body: JSON.stringify({ error: conflictError.message })
                    };
            }

            // unknown error was thrown, so we will answer 500 here.
            debug('Exception was not handled');

            return {
                ...headers,
                statusCode: 500,
                body: JSON.stringify({ error: true, details: "Internal exception occurred."})
            };
    }
}
