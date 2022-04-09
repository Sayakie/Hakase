import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Deoxys.
 */
export const EnumDeoxys = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Deoxys)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-normal`)
    .build(),

  Attack: FormBelongToSpecies.builder()
    .name(`Attack`)
    .species(Species.Deoxys)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-attack`)
    .build(),

  Defense: FormBelongToSpecies.builder()
    .name(`Defense`)
    .species(Species.Deoxys)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-defense`)
    .build(),

  Speed: FormBelongToSpecies.builder()
    .name(`Speed`)
    .species(Species.Deoxys)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-speed`)
    .build(),

  /**
   * Returns all forms of Deoxys.
   * @returns {FormBelongToSpecies[]} All forms of Deoxys.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumDeoxys.Normal,
      EnumDeoxys.Attack,
      EnumDeoxys.Defense,
      EnumDeoxys.Speed
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
    value: `Normal` | `Attack` | `Defense` | `Speed` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `normal`:
        return EnumDeoxys.Normal
      case `attack`:
      case `atk`:
        return EnumDeoxys.Attack
      case `defense`:
      case `def`:
        return EnumDeoxys.Defense
      case `speed`:
      case `spd`:
        return EnumDeoxys.Speed
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
