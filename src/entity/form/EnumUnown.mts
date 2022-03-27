import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { IllegalArgumentException } from 'io/github/sayakie/hakase/util/exception.mjs'

/**
 * Represents available forms of Unown.
 */
export const EnumUnown = {
  A: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-a`)
    .build(),

  B: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-b`)
    .build(),

  C: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-c`)
    .build(),

  D: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-d`)
    .build(),

  E: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-e`)
    .build(),

  F: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-f`)
    .build(),

  G: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-g`)
    .build(),

  H: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-h`)
    .build(),

  I: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-i`)
    .build(),

  J: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-j`)
    .build(),

  K: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-k`)
    .build(),

  L: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-l`)
    .build(),

  M: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-m`)
    .build(),

  N: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-n`)
    .build(),

  O: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-o`)
    .build(),

  P: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-p`)
    .build(),

  Q: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-q`)
    .build(),

  R: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-r`)
    .build(),

  S: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-s`)
    .build(),

  T: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-t`)
    .build(),

  U: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-u`)
    .build(),

  V: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-v`)
    .build(),

  W: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-w`)
    .build(),

  X: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-x`)
    .build(),

  Y: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-y`)
    .build(),

  Z: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-z`)
    .build(),

  Question: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-question`)
    .imageSuffix(`-qm`)
    .build(),

  Exclamation: FormBelongToSpecies.builder()
    .species(Species.Unown)
    .form(0)
    .flags(FormFlag.UnownForm)
    .spriteSuffix(`-exclamation`)
    .imageSuffix(`-em`)
    .build(),

  /**
   * Returns all forms of Unown.
   * @returns {FormBelongToSpecies[]} All forms of Unown.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumUnown.A,
      EnumUnown.B,
      EnumUnown.C,
      EnumUnown.D,
      EnumUnown.E,
      EnumUnown.F,
      EnumUnown.G,
      EnumUnown.H,
      EnumUnown.I,
      EnumUnown.J,
      EnumUnown.K,
      EnumUnown.L,
      EnumUnown.M,
      EnumUnown.N,
      EnumUnown.O,
      EnumUnown.P,
      EnumUnown.Q,
      EnumUnown.R,
      EnumUnown.S,
      EnumUnown.T,
      EnumUnown.U,
      EnumUnown.V,
      EnumUnown.W,
      EnumUnown.X,
      EnumUnown.Y,
      EnumUnown.Z,
      EnumUnown.Question,
      EnumUnown.Exclamation
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
      | 'A'
      | 'B'
      | 'C'
      | 'D'
      | 'E'
      | 'F'
      | 'G'
      | 'H'
      | 'I'
      | 'J'
      | 'K'
      | 'L'
      | 'M'
      | 'N'
      | 'O'
      | 'P'
      | 'Q'
      | 'R'
      | 'S'
      | 'T'
      | 'U'
      | 'V'
      | 'W'
      | 'X'
      | 'Y'
      | 'Z'
      | 'Question'
      | 'Exclamation'
      | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `a`:
        return EnumUnown.A
      case `b`:
        return EnumUnown.B
      case `c`:
        return EnumUnown.C
      case `d`:
        return EnumUnown.D
      case `e`:
        return EnumUnown.E
      case `f`:
        return EnumUnown.F
      case `g`:
        return EnumUnown.G
      case `h`:
        return EnumUnown.H
      case `i`:
        return EnumUnown.I
      case `j`:
        return EnumUnown.J
      case `k`:
        return EnumUnown.K
      case `l`:
        return EnumUnown.L
      case `m`:
        return EnumUnown.M
      case `n`:
        return EnumUnown.N
      case `o`:
        return EnumUnown.O
      case `p`:
        return EnumUnown.P
      case `q`:
        return EnumUnown.Q
      case `r`:
        return EnumUnown.R
      case `s`:
        return EnumUnown.S
      case `t`:
        return EnumUnown.T
      case `u`:
        return EnumUnown.U
      case `v`:
        return EnumUnown.V
      case `w`:
        return EnumUnown.W
      case `x`:
        return EnumUnown.X
      case `y`:
        return EnumUnown.Y
      case `z`:
        return EnumUnown.Z
      case `question`:
      case `questionmark`:
      case `?`:
        return EnumUnown.Question
      case `exclamation`:
      case `exclamationmark`:
      case `!`:
        return EnumUnown.Exclamation
      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
