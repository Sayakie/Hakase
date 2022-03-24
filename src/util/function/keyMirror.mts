/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Constructs an enumeration object with each string as the key and the same
 * string as the value.
 *
 * @param {string[]} keys An array of strings that are the names of the keys in the enumeration object
 * @returns {Record<string, string>} An enumeration object with same keys as the given, but with each key's value being the key itself
 */
export function keyMirror<T extends string>(
  keys: T[] | ReadonlyArray<T>
): { readonly [P in T]: P } {
  return (keys as any[]).reduce((mirror, key) => {
    mirror[key] = key

    return mirror
  }, {} as any)
}
/* eslint-enable @typescript-eslint/no-explicit-any */
