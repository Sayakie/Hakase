import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Aegislash').addFlags('ExposeMeta')

export class EnumAegislash {
  public static readonly Shield = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-shield')
  public static readonly Blade = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-blade')

  public static values(): EnumForm[] {
    return [this.Shield, this.Blade]
  }
}
