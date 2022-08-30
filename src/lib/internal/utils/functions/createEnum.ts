/* eslint-disable no-param-reassign */

/**
 * Acquires an array of string and returns an object with the string as keys
 * and the index of the string as values. This is useful for mapping strings
 * to their index in an array.
 *
 * @param {string[]} keys An array of string would be the keys in the returned object
 * @returns {Record<string, number>} An object with the same keys as the given array, but with each key's value being the index of the key in the array
 * @since 0.1.0
 * @example
 * ```typescript
 * import { createEnum } from '@hakase/utilities'
 *
 * const ClientStatus = createEnum([
 *   `Ready`,
 *   `Disconnected`
 * ])
 *
 * assert.equal(ClientStatus[0], `Ready`)
 * assert.equal(ClientStatut.Disconnected, 1)
 * ```
 */
export function createEnum<T extends ReadonlyArray<string>>(
  keys: [...T] | Readonly<T>
): {
  [V in T[number]]: {
    [K in Exclude<keyof T, keyof unknown[]>]: V extends T[K] ? K : never
  }[Exclude<keyof T, keyof unknown[]>]
} & {
  [K in Exclude<keyof T, keyof unknown[]>]: T[K]
} {
  return (keys as T).reduce((mirror, key, index) => {
    mirror[key] = index
    mirror[index] = key

    return mirror
  }, {} as any) // eslint-disable-line @typescript-eslint/no-explicit-any
}
