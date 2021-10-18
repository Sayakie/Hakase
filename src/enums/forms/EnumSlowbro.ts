import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Slowbro')

export class EnumSlowbro {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
  public static readonly Mega = form.clone().setForm(1).setSpriteSuffix('-mega')
  public static readonly Galar = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-galar')
    .setImageSuffix('-galarian')

  public static values(): EnumForm[] {
    return [this.Normal, this.Mega, this.Galar]
  }
}
