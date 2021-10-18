import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Meloetta').addFlags('ExposeMeta')

export class EnumMeloetta {
  public static readonly Aria = form.clone().setForm(0).setSpriteSuffix('-aria')
  public static readonly Pirouette = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-pirouette')

  public static values(): EnumForm[] {
    return [this.Aria, this.Pirouette]
  }
}
