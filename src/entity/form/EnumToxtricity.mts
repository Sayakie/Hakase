import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Toxtricity.
 */
export const EnumToxtricity = {
  Amped: FormBelongToSpecies.builder()
    .species(Species.Toxtricity)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-amped`)
    .build(),

  Lowkey: FormBelongToSpecies.builder()
    .species(Species.Toxtricity)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-lowkey`)
    .imageSuffix(`-low-key`)
    .build(),

  /**
   * Returns all forms of Toxtricity.
   * @returns {FormBelongToSpecies[]} All forms of Toxtricity.
   */
  values(): FormBelongToSpecies[] {
    return [EnumToxtricity.Amped, EnumToxtricity.Lowkey]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Amped` | `Lowkey` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `amped`:
        return EnumToxtricity.Amped
      case `lowkey`:
      case `low-key`:
        return EnumToxtricity.Lowkey
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
