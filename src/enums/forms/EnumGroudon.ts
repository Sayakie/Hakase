import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Groudon')

export class EnumGroudon {
  public static readonly Meta = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-meta')
    .setImageSuffix('')

  public static values(): EnumForm[] {
    return [this.Meta]
  }
}
