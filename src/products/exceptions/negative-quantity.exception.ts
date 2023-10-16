import { HttpException, HttpStatus } from '@nestjs/common';

export class NegativeQuantityException extends HttpException {
  constructor() {
    super('Product quantity cannot be negative.', HttpStatus.BAD_REQUEST);
  }
}