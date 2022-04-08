import { Exception, IllegalStateException } from './index.mjs'

export const CLIENT_ALREADY_STARTED = `Client has already been started.`
export const UNKNOWN_SPECIES = `Unknown species.`
export const STACK_OVERFLOW = `Stack overflow.`

export const DEPRECATED_METHOD = `Deprecated method.`

/*
  eslint-disable
    @typescript-eslint/naming-convention,
    sort-keys-fix/sort-keys-fix
*/
export const Messages = {
  CLIENT_ALREADY_STARTED: new IllegalStateException(CLIENT_ALREADY_STARTED),
  UNKNOWN_SPECIES: new Exception(UNKNOWN_SPECIES),
  STACK_OVERFLOW: new Exception(STACK_OVERFLOW),

  DEPRECATED_METHOD: (...messages: string[]): Exception =>
    new Exception(DEPRECATED_METHOD, ...messages)
}
/*
  eslint-enable
    @typescript-eslint/naming-convention,
    sort-keys-fix/sort-keys-fix
*/
