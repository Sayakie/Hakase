import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Rotom').addFlags('PinToPrefix')

export class EnumRotom {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
    .setImageSuffix('')
    .removeFlags('PinToPrefix')
  public static readonly Heat = form.clone().setForm(1).setSpriteSuffix('-heat')
  public static readonly Wash = form.clone().setForm(2).setSpriteSuffix('-wash')
  public static readonly Frost = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-frost')
  public static readonly Fan = form.clone().setForm(4).setSpriteSuffix('-fan')
  public static readonly Mow = form.clone().setForm(5).setSpriteSuffix('-mow')

  public static values(): EnumForm[] {
    return [this.Normal, this.Heat, this.Wash, this.Frost, this.Fan, this.Mow]
  }
}
