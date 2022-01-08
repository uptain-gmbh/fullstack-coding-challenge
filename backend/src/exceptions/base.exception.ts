/*
  Custom abstract base exception for http requests
 */
export abstract class BaseCustomHttpException extends Error {
  public readonly statusCode: number;

  protected constructor(message?: string, statusCode?: number) {
    super(message || 'Something went wrong!');

    this.statusCode = statusCode || 500;
  }
}
