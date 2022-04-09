import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Toxtricity.
 */
export const EnumToxtricity = {
  Amped: FormBelongToSpecies.builder()
    .name(`Amped`)
    .species(Species.Toxtricity)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-amped`)
    .build(),

  Lowkey: FormBelongToSpecies.builder()
    .name(`Lowkey`)
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
