import type { Translation } from './Translation.js'

/**
 * Represents a text with a corresponding translation.
 */
export interface Translatable {
  /**
   * Returns the {@link Translation} that corresponds to this {@link Translatable}.
   *
   * @return {Translation} The translation that corresponds to this
   */
  getTranslation(): Translation
}
