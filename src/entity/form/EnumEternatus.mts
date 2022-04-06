import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Eternatus.
 */
export const EnumEternatus = {
  Ordinary: FormBelongToSpecies.builder()
    .species(Species.Eternatus)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ordinary`)
    .build(),

  Eternamax: FormBelongToSpecies.builder()
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
