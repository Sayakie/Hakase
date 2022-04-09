import { Exception } from './Exception.js'

export class IllegalArgumentException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
