import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Magearna')

export class EnumMagearna {
  public static readonly Normal = form.clone().setForm(0)
  public static readonly Original = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-o')
    .setImageSuffix('-original')

  public static values(): EnumForm[] {
    return [this.Normal, this.Original]
  }
}
