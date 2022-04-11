import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Castform.
 */
export const EnumCastform = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Castform)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-normal`)
    .imageSuffix(``)
    .build(),

  Ice: FormBelongToSpecies.builder()
    .name(`Ice`)
    .species(Species.Castform)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ice`)
    .imageSuffix(`-snowy`)
    .build(),

  Rain: FormBelongToSpecies.builder()
    .name(`Rain`)
    .species(Species.Castform)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-rain`)
    .imageSuffix(`-rainy`)
    .build(),

  Sun: FormBelongToSpecies.builder()
    .name(`Sun`)
    .species(Species.Castform)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-sun`)
    .imageSuffix(`-sunny`)
    .build(),

  /**
   * Returns all forms of Castform.
   * @returns {FormBelongToSpecies[]} All forms of Castform.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumCastform.Normal,
      EnumCastform.Ice,
      EnumCastform.Rain,
      EnumCastform.Sun
    ]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(
    value: `Normal` | `Ice` | `Rain` | `Sun` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return EnumCastform.Normal
      case `ice`:
      case `snowy`:
        return EnumCastform.Ice
      case `rain`:
      case `rainy`:
        return EnumCastform.Rain
      case `sun`:
      case `sunny`:
        return EnumCastform.Sun
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const