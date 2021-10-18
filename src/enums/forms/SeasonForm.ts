import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Generic').addFlags('ExposeMeta')

export class SeasonForm {
  public static readonly Spring = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-spring')
  public static readonly Summer = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-summer')
  public static readonly Autumn = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-autumn')
  public static readonly Winter = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-winter')

  public static values(): EnumForm[] {
    return [this.Spring, this.Summer, this.Autumn, this.Winter]
  }
}
