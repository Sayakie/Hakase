import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Giratina.
 */
export const EnumGiratina = {
  Altered: FormBelongToSpecies.builder()
    .species(Species.Giratina)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-altered`)
    .build(),

  Origin: FormBelongToSpecies.builder()
    .species(Species.Giratina)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-origin`)
    .build(),

  /**
   * Returns all forms of Giratina.
   * @returns {FormBelongToSpecies[]} All forms of Giratina.
   */
  values(): FormBelongToSpecies[] {
    return [EnumGiratina.Altered, EnumGiratina.Origin]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Altered` | `Origin` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `altered`:
        return EnumGiratina.Altered
      case `origin`:
        return EnumGiratina.Origin
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
