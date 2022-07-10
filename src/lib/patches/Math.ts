Math.clamp = function clamp(value: number, min: number, max: number): number {
  if (min > max) return min

  return Math.max(min, Math.min(value, max))
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Math {
  /**
   * Clamps the given value between the given minimum and maximum values.
   *
   * Returns the minimum value if the given value is less than the minimum, and
   * returns the maximum value if the given value is greater than the maximum value.
   *
   * Use this method to restrict a value to a range that is defined by the minimum
   * and maximum values.
   *
   * Note that if the minimum value is is greater than the maximum value, the
   * method returns the minimum value.
   *
   * @param {number} value The numeric expression to restrict inside the range defined by the minimum and maximum values
   * @param {number} min The minimum value to compare against
   * @param {number} max The maximum value to compare against
   * @returns {number} The result between the minimum and maximum values
   * @example
   * ```typescript
   * const assertion = Math.clamp(5, 1, 10)
   * console.log(assertion)
   * // Logs 5
   * ```
   * @example
   * ```typescript
   * const assertion = Math.clamp(0, 1, 10)
   * console.log(assertion)
   * // Logs 1
   * ```
   * @example
   * ```typescript
   * const assertion = Math.clamp(100, 1, 10)
   * console.log(assertion)
   * // Logs 10
   * ```
   */
  clamp(value: number, min: number, max: number): number
}
