/**
 * Acquires an array of string, and returns an object which has the keys equal of
 * array length, and their values also equal to their mapping keys.
 *
 * @param {string[]} keys An array of string would be the keys in the returned object
 * @returns An object with the same keys as the given array, and their values also equal to their mapping keys
 * @since 0.1.0
 * @example
 * ```typescript
 * import { keyMirror } from '@hakase/utilities'
 *
 * const ChatInputIds = keyMirror([
 *   `Pokemon`
 * ])
 *
 * ChatInputIds.Pokemon === `Pokemon` // true
 * ```
 */
export function keyMirror<T extends string>(keys: T[]): { [P in T]: P } {
  // @ts-expect-error - Should be a valid type
  const mirroredKeys: { [P in T]: P } = {}

  keys.forEach(key => {
    mirroredKeys[key] = key
  })

  return mirroredKeys
}
