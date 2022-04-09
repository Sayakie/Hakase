import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Keldeo.
 */
export const EnumKeldeo = {
  Ordinary: FormBelongToSpecies.builder()
    .name(`Ordinary`)
    .species(Species.Keldeo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ordinary`)
    .build(),

  Resolute: FormBelongToSpecies.builder()
    .name(`Resolute`)
    .species(Species.Keldeo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-resolute`)
    .build(),

  /**
   * Returns all forms of Keldeo.
   * @returns {FormBelongToSpecies[]} All forms of Keldeo.
   */
  values(): FormBelongToSpecies[] {
    return [EnumKeldeo.Ordinary, EnumKeldeo.Resolute]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Ordinary` | `Resolute` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `ordinary`:
        return EnumKeldeo.Ordinary
      case `resolute`:
        return EnumKeldeo.Resolute
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
