import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Hoopa.
 */
export const EnumHoopa = {
  Confined: FormBelongToSpecies.builder()
    .species(Species.Hoopa)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-confined`)
    .build(),

  Unbound: FormBelongToSpecies.builder()
    .species(Species.Hoopa)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-unbound`)
    .build(),

  /**
   * Returns all forms of Hoopa.
   * @returns {FormBelongToSpecies[]} All forms of Hoopa.
   */
  values(): FormBelongToSpecies[] {
    return [EnumHoopa.Confined, EnumHoopa.Unbound]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Confined` | `Unbound` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `confined`:
        return EnumHoopa.Confined
      case `unbound`:
        return EnumHoopa.Unbound
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
