import { Exception } from './Exception.mjs'

export class NullPointerException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
