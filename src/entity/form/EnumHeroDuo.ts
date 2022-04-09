import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of HeroDuo.
 */
export const EnumHeroDuo = {
  Hero: FormBelongToSpecies.builder()
    .name(`Hero`)
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-hero`)
    .build(),

  Crowned: FormBelongToSpecies.builder()
    .name(`Crowned`)
    .species(Species.MissingNo)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-crowned`)
    .build(),

  /**
   * Returns all forms of HeroDuo.
   * @returns {FormBelongToSpecies[]} All forms of HeroDuo.
   */
  values(): FormBelongToSpecies[] {
    return [EnumHeroDuo.Hero, EnumHeroDuo.Crowned]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(value: `Hero` | `Crowned` | null): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `hero`:
        return EnumHeroDuo.Hero
      case `crowned`:
        return EnumHeroDuo.Crowned
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
