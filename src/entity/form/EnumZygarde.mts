import { FormFlag } from '../../Constant.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of Zygarde.
 */
export const EnumZygarde = {
  FiftyPercent: FormBelongToSpecies.builder()
    .species(Species.Zygarde)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .imageSuffix(`-50`)
    .build(),

  TenPercent: FormBelongToSpecies.builder()
    .species(Species.Zygarde)
    .form(1)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-10%`)
    .imageSuffix(`-10`)
    .build(),

  Complete: FormBelongToSpecies.builder()
    .species(Species.Zygarde)
    .form(2)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-complete`)
    .build(),

  /**
   * Returns all forms of Zygarde.
   * @returns {FormBelongToSpecies[]} All forms of Zygarde.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumZygarde.FiftyPercent,
      EnumZygarde.TenPercent,
      EnumZygarde.Complete
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
    value: `FiftyPercent` | `TenPercent` | `Complete` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `fiftypercent`:
      case `fifty-percent`:
        return EnumZygarde.FiftyPercent
      case `tenpercent`:
      case `ten-percent`:
        return EnumZygarde.TenPercent
      case `complete`:
        return EnumZygarde.Complete
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
