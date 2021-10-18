import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Zygarde').addFlags('ExposeMeta')

export class EnumZygarde {
  public static readonly FiftyPercent = form
    .clone()
    .setForm(0)
    .setImageSuffix('-50')
    .memo('fifty_percent')
  public static readonly TenPercent = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-10%25')
    .setImageSuffix('-10')
    .memo('ten_percent')
  public static readonly Complete = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-complete')

  public static values(): EnumForm[] {
    return [this.FiftyPercent, this.TenPercent, this.Complete]
  }
}
