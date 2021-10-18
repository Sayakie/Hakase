import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Kyurem').addFlags('PinToPrefix')

export class EnumKyurem {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
  public static readonly Black = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-black')
  public static readonly White = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-white')

  public static values(): EnumForm[] {
    return [this.Normal, this.Black, this.White]
  }
}
