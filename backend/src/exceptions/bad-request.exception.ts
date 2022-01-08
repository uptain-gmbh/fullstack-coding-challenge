import { BaseCustomHttpException } from './base.exception';

/*
  Exception for invalid request message sent by the client
 */
export class BadRequestException extends BaseCustomHttpException {
  public constructor(message: string) {
    super(message, 400);
  }
}
