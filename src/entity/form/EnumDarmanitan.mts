import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Darmanitan.
 */
export const EnumDarmanitan = {
  Standard: FormBelongToSpecies.builder()
    .species(Species.Darmanitan)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-normal`)
    .build(),

  Zen: FormBelongToSpecies.builder()
    .species(Species.Darmanitan)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-zen`)
    .build(),

  GalarStandard: FormBelongToSpecies.builder()
    .species(Species.Darmanitan)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.GalarianForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-galar-standard`)
    .imageSuffix(`-galarian-standard`)
    .build(),

  GalarZen: FormBelongToSpecies.builder()
    .species(Species.Darmanitan)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.GalarianForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-galar-zen`)
    .imageSuffix(`-galarian-zen`)
    .build(),

  /**
   * Returns all forms of Darmanitan.
   * @returns {FormBelongToSpecies[]} All forms of Darmanitan.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumDarmanitan.Standard,
      EnumDarmanitan.Zen,
      EnumDarmanitan.GalarStandard,
      EnumDarmanitan.GalarZen
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
    value: `Standard` | `Zen` | `GalarStandard` | `GalarZen` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `standard`:
        return EnumDarmanitan.Standard
      case `zen`:
        return EnumDarmanitan.Zen
      case `galarstandard`:
      case `galar-standard`:
        return EnumDarmanitan.GalarStandard
      case `galarzen`:
      case `galar-zen`:
        return EnumDarmanitan.GalarZen
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
