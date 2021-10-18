import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Calyrex')

export class EnumCalyrex {
  public static readonly Ordinary = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-ordinary')
    .setImageSuffix('')
  public static readonly Icerider = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-icerider')
    .setImageSuffix('-ice-rider')
  public static readonly Shadowrider = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-shadowrider')
    .setImageSuffix('-shadow-rider')

  public static values(): EnumForm[] {
    return [this.Ordinary, this.Icerider, this.Shadowrider]
  }
}
