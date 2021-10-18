import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Xerneas').addFlags(['ExposeMeta', 'FakeForm'])

export class EnumXerneas {
  public static readonly Neutral = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-neutral')
    .setImageSuffix('')
  public static readonly Active = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-active')

  public static values(): EnumForm[] {
    return [this.Neutral, this.Active]
  }
}
