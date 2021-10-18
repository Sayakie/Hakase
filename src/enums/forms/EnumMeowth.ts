import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Generic')

export class EnumMeowth {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
  public static readonly Alolan = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-alola')
    .setImageSuffix('-alolan')
  public static readonly Galarian = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-galar')
    .setImageSuffix('-galarian')

  public static values(): EnumForm[] {
    return [this.Normal, this.Alolan, this.Galarian]
  }
}
