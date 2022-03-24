import {
  Exception,
  IllegalStateException
} from 'io/github/sayakie/hakase/util/exception.mjs'

export const CLIENT_ALREADY_STARTED = `Client has already been started.`

export const DEPRECATED_METHOD = `Deprecated method.`

/* eslint-disable @typescript-eslint/naming-convention */
export const Messages = {
  CLIENT_ALREADY_STARTED: new IllegalStateException(CLIENT_ALREADY_STARTED),

  DEPRECATED_METHOD: (...messages: string[]): Exception =>
    new Exception(DEPRECATED_METHOD, ...messages)
}
/* eslint-enable @typescript-eslint/naming-convention */
