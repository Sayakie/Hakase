import { IllegalStateException } from '../exception.js'

/**
 * Ensures the truth of an expression involving the state of the calling
 * instance, but not involving any parameters to the calling method.
 *
 * @param {boolean} expression A boolean expression
 * @param {string} errorMessage The exception message if the check fails
 * @throws {IllegalStateException} If expression is false
 */
export function checkState(
  expression: boolean,
  errorMessage: string
): asserts expression {
  if (!expression) {
    throw new IllegalStateException(errorMessage)
  }
}
