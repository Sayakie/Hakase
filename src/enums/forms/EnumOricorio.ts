import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Oricorio').addFlags('ExposeMeta')

export class EnumOricorio {
  public static readonly Baile = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-baile')
  public static readonly Pompom = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-pompom')
    .setImageSuffix('-pom-pom')
  public static readonly Pau = form.clone().setForm(2).setSpriteSuffix('-pau')
  public static readonly Sensu = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-sensu')

  public static values(): EnumForm[] {
    return [this.Baile, this.Pompom, this.Pau, this.Sensu]
  }
}
