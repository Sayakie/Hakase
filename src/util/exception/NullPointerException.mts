import { Exception } from 'io/github/sayakie/hakase/util/exception/Exception.mjs'

export class NullPointerException extends Exception {
  public constructor(message: string) {
    super(message)
  }
}
