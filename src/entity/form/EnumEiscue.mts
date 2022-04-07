import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Eiscue.
 */
export const EnumEiscue = {
  IceFace: FormBelongToSpecies.builder()
    .species(Species.Eiscue)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ice_face`)
    .imageSuffix(`-ice`)
    .build(),

  NoiceFace: FormBelongToSpecies.builder()
    .species(Species.Eiscue)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-noice_face`)
    .imageSuffix(`-noice`)
    .build(),

  /**
   * Returns all forms of Eiscue.
   * @returns {FormBelongToSpecies[]} All forms of Eiscue.
   */
  values(): FormBelongToSpecies[] {
    return [EnumEiscue.IceFace, EnumEiscue.NoiceFace]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Ice` | `Noice` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `ice`:
        return EnumEiscue.IceFace
      case `noice`:
        return EnumEiscue.NoiceFace
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
