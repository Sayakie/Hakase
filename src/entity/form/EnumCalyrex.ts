import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'
import { FormBelongToSpecies } from '../FormBelongToSpecies.js'

/**
 * Represents available forms of Calyrex.
 */
export const EnumCalyrex = {
  Ordinary: FormBelongToSpecies.builder()
    .name(`Ordinary`)
    .species(Species.Calyrex)
    .form(0)
    .flags(FormFlag.DefaultForm)
    .spriteSuffix(`-ordinary`)
    .imageSuffix(``)
    .build(),

  IceRider: FormBelongToSpecies.builder()
    .name(`Ice Rider`)
    .species(Species.Calyrex)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-icerider`)
    .imageSuffix(`-ice-rider`)
    .build(),

  ShadowRider: FormBelongToSpecies.builder()
    .name(`Shadow Rider`)
    .species(Species.Calyrex)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix(`-shadowrider`)
    .imageSuffix(`-shadow-rider`)
    .build(),

  /**
   * Returns all forms of Calyrex.
   * @returns {FormBelongToSpecies[]} All forms of Calyrex.
   */
  values(): FormBelongToSpecies[] {
    return [EnumCalyrex.Ordinary, EnumCalyrex.IceRider, EnumCalyrex.ShadowRider]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(
    value: `Ordinary` | `IceRider` | `ShadowRider` | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `ordinary`:
        return EnumCalyrex.Ordinary
      case `icerider`:
      case `ice-rider`:
        return EnumCalyrex.IceRider
      case `shadowrider`:
      case `shadow-rider`:
        return EnumCalyrex.ShadowRider
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
