import { APIGatewayProxyEvent, Context } from 'aws-lambda';

/*
  The shape of the response body object
 */
interface Response<T> {
  statusCode: number;
  message?: string;
  data?: T;
}

/*
  Custom type for API request handler
 */
export type Handler<TData = unknown> = (event: APIGatewayProxyEvent, context: Context) => Promise<Response<TData>>;
