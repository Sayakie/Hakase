import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Oricorio.
 */
export const EnumOricorio = {
  Baile: FormBelongToSpecies.builder()
    .species(Species.Oricorio)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-baile`)
    .build(),

  Pompom: FormBelongToSpecies.builder()
    .species(Species.Oricorio)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-pompom`)
    .imageSuffix(`-pom-pom`)
    .build(),

  Pau: FormBelongToSpecies.builder()
    .species(Species.Oricorio)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-pau`)
    .build(),

  Sensu: FormBelongToSpecies.builder()
    .species(Species.Oricorio)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-sensu`)
    .build(),

  /**
   * Returns all forms of Oricorio.
   * @returns {FormBelongToSpecies[]} All forms of Oricorio.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumOricorio.Baile,
      EnumOricorio.Pompom,
      EnumOricorio.Pau,
      EnumOricorio.Sensu
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
    value: `Baile` | `Pompom` | `Pau` | `Sensu` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `baile`:
        return EnumOricorio.Baile
      case `pompom`:
        return EnumOricorio.Pompom
      case `pau`:
        return EnumOricorio.Pau
      case `sensu`:
        return EnumOricorio.Sensu
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
