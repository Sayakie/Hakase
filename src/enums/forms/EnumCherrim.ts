import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Cherrim')

export class EnumCherrim {
  public static readonly Overcast = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-overcast')
  public static readonly Sunshine = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-sunshine')

  public static values(): EnumForm[] {
    return [this.Overcast, this.Sunshine]
  }
}
