import { NullPointerException } from '../exception.mjs'

/**
 * Asserts that the given object reference is not null or undefined.
 *
 * <p>This function is generic, and can be used with any type.</p>
 *
 * @param {T | null | undefined} reference The object reference to check
 * @param {string} errorMessage The message to send if the value is nullish
 * @throws {@link NullPointerException} If reference is null or undefined
 * @template T The type of the value
 */
export function checkNonNull<T>(
  reference: T | null | undefined,
  errorMessage: string
): asserts reference is T {
  if (reference == null) {
    throw new NullPointerException(errorMessage)
  }
}
