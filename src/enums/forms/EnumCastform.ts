import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Castform')

export class EnumCastform {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
  public static readonly Ice = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-ice')
    .setImageSuffix('-snowy')
  public static readonly Rain = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-rain')
    .setImageSuffix('-rainy')
  public static readonly Sun = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-sun')
    .setImageSuffix('-sunny')

  public static values(): EnumForm[] {
    return [this.Normal, this.Ice, this.Rain, this.Sun]
  }
}
