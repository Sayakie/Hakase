import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Meloetta.
 */
export const EnumMeloetta = {
  Aria: FormBelongToSpecies.builder()
    .species(Species.Meloetta)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-aria`)
    .build(),

  Pirouette: FormBelongToSpecies.builder()
    .species(Species.Meloetta)
    .form(1)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-pirouette`)
    .build(),

  /**
   * Returns all forms of Meloetta.
   * @returns {FormBelongToSpecies[]} All forms of Meloetta.
   */
  values(): FormBelongToSpecies[] {
    return [EnumMeloetta.Aria, EnumMeloetta.Pirouette]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Aria` | `Pirouette`): FormBelongToSpecies {
    switch (value.toLowerCase()) {
      case `aria`:
        return EnumMeloetta.Aria
      case `pirouette`:
        return EnumMeloetta.Pirouette
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
