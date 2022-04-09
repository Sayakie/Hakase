import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Gastrodon.
 */
export const EnumGastrodon = {
  East: FormBelongToSpecies.builder()
    .name(`East`)
    .species(Species.Gastrodon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-east`)
    .build(),

  West: FormBelongToSpecies.builder()
    .name(`West`)
    .species(Species.Gastrodon)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-west`)
    .build(),

  /**
   * Returns all forms of Gastrodon.
   * @returns {FormBelongToSpecies[]} All forms of Gastrodon.
   */
  values(): FormBelongToSpecies[] {
    return [EnumGastrodon.East, EnumGastrodon.West]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `East` | `West` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `east`:
        return EnumGastrodon.East
      case `west`:
        return EnumGastrodon.West
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
