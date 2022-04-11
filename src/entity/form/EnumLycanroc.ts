import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'

/**
 * Represents available forms of Lycanroc.
 */
export const EnumLycanroc = {
  Midday: FormBelongToSpecies.builder()
    .name(`Midday`)
    .species(Species.Lycanroc)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-midday`)
    .build(),

  Midnight: FormBelongToSpecies.builder()
    .name(`Midnight`)
    .species(Species.Lycanroc)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-midnight`)
    .build(),

  Dusk: FormBelongToSpecies.builder()
    .name(`Dusk`)
    .species(Species.Lycanroc)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-dusk`)
    .build(),

  /**
   * Returns all forms of Lycanroc.
   * @returns {FormBelongToSpecies[]} All forms of Lycanroc.
   */
  values(): FormBelongToSpecies[] {
    return [EnumLycanroc.Midday, EnumLycanroc.Midnight, EnumLycanroc.Dusk]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Midday` | `Midnight` | `Dusk` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `midday`:
      case `mid-day`:
        return EnumLycanroc.Midday
      case `midnight`:
      case `mid-night`:
        return EnumLycanroc.Midnight
      case `dusk`:
        return EnumLycanroc.Dusk
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
