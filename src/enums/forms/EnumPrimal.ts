import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Generic')

export class EnumPrimal {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
  public static readonly Primal = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-primal')

  public static values(): EnumForm[] {
    return [this.Normal, this.Primal]
  }
}
