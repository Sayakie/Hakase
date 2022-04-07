import { Exception } from './Exception.mjs'

export class IllegalArgumentException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
