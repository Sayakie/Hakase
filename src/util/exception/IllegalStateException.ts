import { Exception } from './Exception.js'

export class IllegalStateException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
