import { BaseError } from './@internal/BaseError.mjs'

export class NullPointerException extends BaseError {
  constructor(message: string) {
    super(message)
  }
}
