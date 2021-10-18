import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Hoopa').addFlags('ExposeMeta')

export class EnumHoopa {
  public static readonly Confined = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-confined')
  public static readonly Unbound = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-unbound')

  public static values(): EnumForm[] {
    return [this.Confined, this.Unbound]
  }
}
