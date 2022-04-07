import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Greninja.
 */
export const EnumGreninja = {
  Base: FormBelongToSpecies.builder()
    .species(Species.Greninja)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Ash: FormBelongToSpecies.builder()
    .species(Species.Greninja)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ash`)
    .build(),

  /**
   * Returns all forms of Greninja.
   * @returns {FormBelongToSpecies[]} All forms of Greninja.
   */
  values(): FormBelongToSpecies[] {
    return [EnumGreninja.Base, EnumGreninja.Ash]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Base` | `Ash` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `base`:
      case `normal`:
        return EnumGreninja.Base
      case `ash`:
        return EnumGreninja.Ash
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
