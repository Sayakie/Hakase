import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Xerneas.
 */
export const EnumXerneas = {
  Neutral: FormBelongToSpecies.builder()
    .name(`Neutral`)
    .species(Species.Xerneas)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-neutral`)
    .build(),

  Active: FormBelongToSpecies.builder()
    .name(`Active`)
    .species(Species.Xerneas)
    .form(1)
    .flags(FormFlag.DefaultForm)
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
