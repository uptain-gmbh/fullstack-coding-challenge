import { BaseApiException } from "./base.exception";

export class NotFoundException extends BaseApiException {
  constructor(message: string) {
    super(message, 404);
  }
}
