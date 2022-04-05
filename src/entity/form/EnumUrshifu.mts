import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Urshifu.
 */
export const EnumUrshifu = {
  SingleStrike: FormBelongToSpecies.builder()
    .species(Species.Urshifu)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-singlestrike`)
    .imageSuffix(`-single-strike`)
    .build(),

  RapidStrike: FormBelongToSpecies.builder()
    .species(Species.Urshifu)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-rapidstrike`)
    .imageSuffix(`-rapid-strike`)
    .build(),

  /**
   * Returns all forms of Urshifu.
   * @returns {FormBelongToSpecies[]} All forms of Urshifu.
   */
  values(): FormBelongToSpecies[] {
    return [EnumUrshifu.SingleStrike, EnumUrshifu.RapidStrike]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `SingleStrike` | `RapidStrike` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `singlestrike`:
      case `single-strike`:
        return EnumUrshifu.SingleStrike
      case `rapidstrike`:
      case `rapid-strike`:
        return EnumUrshifu.RapidStrike
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
