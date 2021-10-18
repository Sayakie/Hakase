import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Necrozma')

export class EnumNecrozma {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
  public static readonly Dusk = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-dusk')
    .setImageSuffix('-dusk-mane')
  public static readonly Dawn = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-dawn')
    .setImageSuffix('-dawn-wings')
  public static readonly Ultra = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-ultra')

  public static values(): EnumForm[] {
    return [this.Normal, this.Dusk, this.Dawn, this.Ultra]
  }
}
