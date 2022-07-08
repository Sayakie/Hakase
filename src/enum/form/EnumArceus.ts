import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'
import { Species } from '../Species.js'

/**
 * Represents available forms of Arceus.
 */
export const EnumArceus = {
  Normal: FormBelongToSpecies.builder()
    .name(`Normal`)
    .species(Species.Arceus)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .build(),

  Grass: FormBelongToSpecies.builder()
    .name(`Grass`)
    .species(Species.Arceus)
    .form(1)
    .flags(FormFlag.AlterForm)
    .build(),

  Fire: FormBelongToSpecies.builder()
    .name(`Fire`)
    .species(Species.Arceus)
    .form(2)
    .flags(FormFlag.AlterForm)
    .build(),

  Water: FormBelongToSpecies.builder()
    .name(`Water`)
    .species(Species.Arceus)
    .form(3)
    .flags(FormFlag.AlterForm)
    .build(),

  Flying: FormBelongToSpecies.builder()
    .name(`Flying`)
    .species(Species.Arceus)
    .form(4)
    .flags(FormFlag.AlterForm)
    .build(),

  Bug: FormBelongToSpecies.builder()
    .name(`Bug`)
    .species(Species.Arceus)
    .form(5)
    .flags(FormFlag.AlterForm)
    .build(),

  Poison: FormBelongToSpecies.builder()
    .name(`Poison`)
    .species(Species.Arceus)
    .form(6)
    .flags(FormFlag.AlterForm)
    .build(),

  Electric: FormBelongToSpecies.builder()
    .name(`Electric`)
    .species(Species.Arceus)
    .form(7)
    .flags(FormFlag.AlterForm)
    .build(),

  Psychic: FormBelongToSpecies.builder()
    .name(`Psychic`)
    .species(Species.Arceus)
    .form(8)
    .flags(FormFlag.AlterForm)
    .build(),

  Rock: FormBelongToSpecies.builder()
    .name(`Rock`)
    .species(Species.Arceus)
    .form(9)
    .flags(FormFlag.AlterForm)
    .build(),

  Ground: FormBelongToSpecies.builder()
    .name(`Ground`)
    .species(Species.Arceus)
    .form(10)
    .flags(FormFlag.AlterForm)
    .build(),

  Dark: FormBelongToSpecies.builder()
    .name(`Dark`)
    .species(Species.Arceus)
    .form(11)
    .flags(FormFlag.AlterForm)
    .build(),

  Ghost: FormBelongToSpecies.builder()
    .name(`Ghost`)
    .species(Species.Arceus)
    .form(12)
    .flags(FormFlag.AlterForm)
    .build(),

  Steel: FormBelongToSpecies.builder()
    .name(`Steel`)
    .species(Species.Arceus)
    .form(13)
    .flags(FormFlag.AlterForm)
    .build(),

  Fighting: FormBelongToSpecies.builder()
    .name(`Fighting`)
    .species(Species.Arceus)
    .form(14)
    .flags(FormFlag.AlterForm)
    .build(),

  Dragon: FormBelongToSpecies.builder()
    .name(`Dragon`)
    .species(Species.Arceus)
    .form(15)
    .flags(FormFlag.AlterForm)
    .build(),

  Fairy: FormBelongToSpecies.builder()
    .name(`Fairy`)
    .species(Species.Arceus)
    .form(16)
    .flags(FormFlag.AlterForm)
    .build(),

  /**
   * Returns all forms of Arceus.
   * @returns {FormBelongToSpecies[]} All forms of Arceus.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumArceus.Normal,
      EnumArceus.Grass,
      EnumArceus.Fire,
      EnumArceus.Water,
      EnumArceus.Flying,
      EnumArceus.Bug,
      EnumArceus.Poison,
      EnumArceus.Electric,
      EnumArceus.Psychic,
      EnumArceus.Rock,
      EnumArceus.Ground,
      EnumArceus.Dark,
      EnumArceus.Ghost,
      EnumArceus.Steel,
      EnumArceus.Fighting,
      EnumArceus.Dragon,
      EnumArceus.Fairy
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
    value:
      | `Normal`
      | `Grass`
      | `Fire`
      | `Water`
      | `Flying`
      | `Bug`
      | `Poison`
      | `Electric`
      | `Psychic`
      | `Rock`
      | `Ground`
      | `Dark`
      | `Ghost`
      | `Steel`
      | `Fighting`
      | `Dragon`
      | `Fairy`
  ): FormBelongToSpecies {
    switch (value.toLowerCase()) {
      case `normal`:
        return EnumArceus.Normal
      case `grass`:
        return EnumArceus.Grass
      case `fire`:
        return EnumArceus.Fire
      case `water`:
        return EnumArceus.Water
      case `flying`:
        return EnumArceus.Flying
      case `bug`:
        return EnumArceus.Bug
      case `poison`:
        return EnumArceus.Poison
      case `electric`:
        return EnumArceus.Electric
      case `psychic`:
        return EnumArceus.Psychic
      case `rock`:
        return EnumArceus.Rock
      case `ground`:
        return EnumArceus.Ground
      case `dark`:
        return EnumArceus.Dark
      case `ghost`:
        return EnumArceus.Ghost
      case `steel`:
        return EnumArceus.Steel
      case `fighting`:
        return EnumArceus.Fighting
      case `dragon`:
        return EnumArceus.Dragon
      case `fairy`:
        return EnumArceus.Fairy
      default:
        throw new IllegalArgumentException(
          `The given name '${value}' is not a member of EnumArceus.`
        )
    }
  }
} as const
