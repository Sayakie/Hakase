export function getRandomElement<T>(array: T[]): T {
  return array.at(Math.floor(Math.random() * array.length))!
}

/**
 * Make a copy of an array which is uppercased.
 *
 * @param array The array to copy.
 * @returns The copied array which is uppercased.
 */
export function toUpperCase<T extends ReadonlyArray<string>>(
  array: [...T] | Readonly<T>
): { [V in keyof T]: Uppercase<T[V] & string> } {
  return array.map(s => String(s).toUpperCase()) as unknown as {
    [V in keyof T]: Uppercase<T[V] & string>
  }
}

/**
 * Make a copy of an array which is lowercased.
 *
 * @param array The array to copy.
 * @returns The copied array which is lowercased.
 */
export function toLowerCase<T extends ReadonlyArray<string>>(
  array: [...T] | Readonly<T>
): { [V in keyof T]: Lowercase<T[V] & string> } {
  return array.map(s => String(s).toLowerCase()) as unknown as {
    [V in keyof T]: Lowercase<T[V] & string>
  }
}
