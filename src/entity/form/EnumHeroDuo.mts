import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { FormFlag } from '../../util/Constant.mjs'
import { IllegalArgumentException } from '../../util/exception.mjs'

/**
 * Represents available forms of HeroDuo.
 */
export const EnumHeroDuo = {
  Hero: FormBelongToSpecies.builder()
    .species(Species.MissingNo)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-hero`)
    .build(),

  Crowned: FormBelongToSpecies.builder()
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
