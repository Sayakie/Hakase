import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Rotom.
 */
export const EnumRotom = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Rotom)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-normal`)
    .imageSuffix(``)
    .build(),

  Heat: FormBelongToSpecies.builder()
    .name(`Heat`)
    .species(Species.Rotom)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-heat`)
    .build(),

  Wash: FormBelongToSpecies.builder()
    .name(`Wash`)
    .species(Species.Rotom)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-wash`)
    .build(),

  Frost: FormBelongToSpecies.builder()
    .name(`Frost`)
    .species(Species.Rotom)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-frost`)
    .build(),

  Fan: FormBelongToSpecies.builder()
    .name(`Fan`)
    .species(Species.Rotom)
    .form(4)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-fan`)
    .build(),

  Mow: FormBelongToSpecies.builder()
    .name(`Mow`)
    .species(Species.Rotom)
    .form(5)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-mow`)
    .build(),

  /**
   * Returns all forms of Rotom.
   * @returns {FormBelongToSpecies[]} All forms of Rotom.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumRotom.Normal,
      EnumRotom.Heat,
      EnumRotom.Wash,
      EnumRotom.Frost,
      EnumRotom.Fan,
      EnumRotom.Mow
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
    value: `Normal` | `Heat` | `Wash` | `Frost` | `Fan` | `Mow` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return EnumRotom.Normal
      case `heat`:
        return EnumRotom.Heat
      case `wash`:
        return EnumRotom.Wash
      case `frost`:
        return EnumRotom.Frost
      case `fan`:
        return EnumRotom.Fan
      case `mow`:
        return EnumRotom.Mow
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
