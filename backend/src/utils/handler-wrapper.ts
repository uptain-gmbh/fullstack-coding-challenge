import { APIGatewayProxyHandler } from 'aws-lambda';
import { ValidationError } from 'yup';
import { Handler } from '../types';
import { BaseCustomHttpException } from '../exceptions/base.exception';

/*
  Wraps the API handlers to handle exceptions and form the valid response object.
 */
export const handlerWrapper =
  <TData>(handler: Handler<TData>): APIGatewayProxyHandler =>
  async (event, context) => {
    try {
      console.log('API event', {
        body: event.body,
        pathParameters: event.pathParameters,
        queryStringParameters: event.queryStringParameters,
      });

      const { statusCode, message, data } = await handler(event, context);

      return {
        statusCode: statusCode,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          message,
          data,
          success: true,
        }),
      };
    } catch (err) {
      console.error(err);

      if (err instanceof ValidationError) {
        return {
          statusCode: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            success: false,
            errors: err.errors,
          }),
        };
      }

      if (err instanceof BaseCustomHttpException) {
        return {
          statusCode: err.statusCode,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify({
            success: false,
            message: err.message,
          }),
        };
      }

      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({
          success: false,
          message: 'Something went wrong!',
        }),
      };
    }
  };
