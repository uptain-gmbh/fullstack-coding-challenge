import { BaseApiException } from "./base.exception";

export class BadRequestException extends BaseApiException {
  constructor(message: string) {
    super(message, 400);
  }
}
