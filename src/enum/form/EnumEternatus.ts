import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Eternatus.
 */
export const EnumEternatus = {
  Ordinary: FormBelongToSpecies.builder()
    .name(`Ordinary`)
    .species(Species.Eternatus)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ordinary`)
    .build(),

  Eternamax: FormBelongToSpecies.builder()
    .name(`Eternamax`)
    .species(Species.Eternatus)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-eternamax`)
    .build(),

  /**
   * Returns all forms of Eternatus.
   * @returns {FormBelongToSpecies[]} All forms of Eternatus.
   */
  values(): FormBelongToSpecies[] {
    return [EnumEternatus.Ordinary, EnumEternatus.Eternamax]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Ordinary` | `Eternamax` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `ordinary`:
        return EnumEternatus.Ordinary
      case `eternamax`:
        return EnumEternatus.Eternamax
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
