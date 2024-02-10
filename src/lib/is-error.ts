/**
 * Checks if the given value is an instance of NodeJS.ErrnoException.
 *
 * @param error - The value to check.
 * @returns `true` if the value is an instance of NodeJS.ErrnoException, otherwise `false`.
 */
export function isError(error?: unknown): error is NodeJS.ErrnoException;
export function isError<T extends abstract new (...args: never[]) => Error>(
  error: unknown = undefined,
  type: T = Error as unknown as T,
): error is InstanceType<T> & NodeJS.ErrnoException {
  return error instanceof type;
}
