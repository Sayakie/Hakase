import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Giratina').addFlags('ExposeMeta')

export class EnumGiratina {
  public static readonly Altered = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-altered')
  public static readonly Origin = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-origin')

  public static values(): EnumForm[] {
    return [this.Altered, this.Origin]
  }
}
