import { Exception } from './Exception.js'

export class NullPointerException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
