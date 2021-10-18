import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Keldeo').addFlags('ExposeMeta')

export class EnumKeldeo {
  public static readonly Ordinary = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-ordinary')
  public static readonly Resolute = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-resolute')

  public static values(): EnumForm[] {
    return [this.Ordinary, this.Resolute]
  }
}
