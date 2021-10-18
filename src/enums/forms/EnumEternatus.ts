import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Eternatus')

export class EnumEternatus {
  public static readonly Ordinary = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-ordinary')
    .setImageSuffix('')
  public static readonly Eternamax = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-eternamax')

  public static values(): EnumForm[] {
    return [this.Ordinary, this.Eternamax]
  }
}
