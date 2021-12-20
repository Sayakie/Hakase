import { EnumForm } from '@/enums/EnumForm.js'
import { FormFlag } from '@/utils/Constants.js'

const form = EnumForm.of('Groudon').addFlags(FormFlag.PinToPrefix)

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
