import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Mimikyu.
 */
export const EnumMimikyu = {
  Disguised: FormBelongToSpecies.builder()
    .species(Species.Mimikyu)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Busted: FormBelongToSpecies.builder()
    .species(Species.Mimikyu)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-busted`)
    .build(),

  /**
   * Returns all forms of Mimikyu.
   * @returns {FormBelongToSpecies[]} All forms of Mimikyu.
   */
  values(): FormBelongToSpecies[] {
    return [EnumMimikyu.Disguised, EnumMimikyu.Busted]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Disguised` | `Busted`): FormBelongToSpecies {
    switch (value.toLowerCase()) {
      case `disguised`:
        return EnumMimikyu.Disguised
      case `busted`:
        return EnumMimikyu.Busted
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
