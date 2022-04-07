import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Morpeko.
 */
export const EnumMorpeko = {
  Fullbelly: FormBelongToSpecies.builder()
    .species(Species.Morpeko)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-fullbelly`)
    .imageSuffix(`-ful-belly`)
    .build(),

  Hangry: FormBelongToSpecies.builder()
    .species(Species.Morpeko)
    .form(1)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-hangry`)
    .build(),

  /**
   * Returns all forms of Morpeko.
   * @returns {FormBelongToSpecies[]} All forms of Morpeko.
   */
  values(): FormBelongToSpecies[] {
    return [EnumMorpeko.Fullbelly, EnumMorpeko.Hangry]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Fullbelly` | `Hangry` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `fullbelly`:
      case `full-belly`:
        return EnumMorpeko.Fullbelly
      case `hangry`:
        return EnumMorpeko.Hangry
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
