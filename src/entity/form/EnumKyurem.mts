import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Kyurem.
 */
export const EnumKyurem = {
  Normal: FormBelongToSpecies.builder()
    .species(Species.Kyurem)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-normal`)
    .imageSuffix(``)
    .build(),

  Black: FormBelongToSpecies.builder()
    .species(Species.Kyurem)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-black`)
    .build(),

  White: FormBelongToSpecies.builder()
    .species(Species.Kyurem)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-white`)
    .build(),

  /**
   * Returns all forms of Kyurem.
   * @returns {FormBelongToSpecies[]} All forms of Kyurem.
   */
  values(): FormBelongToSpecies[] {
    return [EnumKyurem.Normal, EnumKyurem.Black, EnumKyurem.White]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Normal` | `Black` | `White` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return EnumKyurem.Normal
      case `black`:
        return EnumKyurem.Black
      case `white`:
        return EnumKyurem.White
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
