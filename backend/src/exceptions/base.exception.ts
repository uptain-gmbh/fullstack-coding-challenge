export class BaseApiException extends Error {
  public statusCode: number;

  constructor(message = "Something goes wrong", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}
