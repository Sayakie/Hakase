import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Xerneas.
 */
export const EnumXerneas = {
  Neutral: FormBelongToSpecies.builder()
    .species(Species.Xerneas)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-neutral`)
    .build(),

  Active: FormBelongToSpecies.builder()
    .species(Species.Xerneas)
    .form(1)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-active`)
    .build(),

  /**
   * Returns all forms of Xerneas.
   * @returns {FormBelongToSpecies[]} All forms of Xerneas.
   */
  values(): FormBelongToSpecies[] {
    return [EnumXerneas.Neutral, EnumXerneas.Active]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Neutral` | `Active` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `neutral`:
        return EnumXerneas.Neutral
      case `active`:
        return EnumXerneas.Active
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
