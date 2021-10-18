/**
 * ArrayUtil provides useful helper methods that preprocessing an array or
 * converting into another types.
 */
export class ArrayUtil extends null {
  public static readonly KEBAB_REGEX = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  /**
   * Checks if an array or any of its elements are null, or the array is empty.
   *
   * @param {unknown[]} array The array to check
   * @returns Whether the array or any of its elements are null, or the array is empty.
   */
  public static hasNull(array: ReadonlyArray<unknown>): boolean {
    if (array.length === 0) return true
    return array.some(element => element === null)
  }

  public static getRandomElement<T extends unknown>(array: T[]): T {
    return array.at(Math.floor(Math.random() * array.length))!
  }

  /**
   * Returns an array of strings which have been converted to uppercase.
   *
   * @template {ReadonlyArray<string>} T
   * @param {[...T] | Readonly<T>} array An array to convert
   * @returns {{ [V in keyof T]: Uppercase<T[V] & string> }} An array of strings which have been converted to uppercase.
   */
  public static toUpperCase<T extends ReadonlyArray<string>>(
    array: [...T] | Readonly<T>
  ): { [V in keyof T]: Uppercase<T[V] & string> } {
    return array.map(s => String(s).toUpperCase()) as unknown as {
      [V in keyof T]: Uppercase<T[V] & string>
    }
  }

  /**
   * Returns an array of strings which have been converted to lowercase.
   * @param {Array<string>} array
   * @returns {Array<string>} An array of strings which have been converted to lowercase.
   */
  public static toLowerCase<T extends ReadonlyArray<string>>(
    array: [...T] | Readonly<T>
  ): { [V in keyof T]: Lowercase<T[V] & string> } {
    return array.map(s => String(s).toLowerCase()) as unknown as {
      [V in keyof T]: Lowercase<T[V] & string>
    }
  }
}
