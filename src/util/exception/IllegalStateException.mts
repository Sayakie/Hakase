import { Exception } from './Exception.mjs'

export class IllegalStateException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
