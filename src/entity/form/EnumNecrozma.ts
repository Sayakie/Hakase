import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Necrozma.
 */
export const EnumNecrozma = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Necrozma)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-normal`)
    .imageSuffix(``)
    .build(),

  Dusk: FormBelongToSpecies.builder()
    .name(`Dusk`)
    .species(Species.Necrozma)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-dusk`)
    .imageSuffix(`-dusk-mane`)
    .build(),

  Dawn: FormBelongToSpecies.builder()
    .name(`Dawn`)
    .species(Species.Necrozma)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-dawn`)
    .imageSuffix(`-dawn-wings`)
    .build(),

  Ultra: FormBelongToSpecies.builder()
    .name(`Ultra`)
    .species(Species.Necrozma)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-ultra`)
    .build(),

  /**
   * Returns all forms of Necrozma.
   * @returns {FormBelongToSpecies[]} All forms of Necrozma.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumNecrozma.Normal,
      EnumNecrozma.Dusk,
      EnumNecrozma.Dawn,
      EnumNecrozma.Ultra
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
    value: `Normal` | `Dusk` | `Dawn` | `Ultra` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return EnumNecrozma.Normal
      case `dusk`:
      case `dusk-mane`:
        return EnumNecrozma.Dusk
      case `dawn`:
      case `dawn-wings`:
        return EnumNecrozma.Dawn
      case `ultra`:
        return EnumNecrozma.Ultra
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
