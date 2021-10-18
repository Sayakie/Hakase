import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Toxtricity').addFlags('ExposeMeta')

export class EnumToxtricity {
  public static readonly Amped = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-amped')
  public static readonly Lowkey = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-lowkey')
    .setImageSuffix('-low-key')

  public static values(): EnumForm[] {
    return [this.Amped, this.Lowkey]
  }
}
