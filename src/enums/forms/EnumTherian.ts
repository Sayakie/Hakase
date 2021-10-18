import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Therian').addFlags('ExposeMeta')

export class EnumTherian {
  public static readonly Incarnate = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-incarnate')
  public static readonly Therian = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-therian')

  public static values(): EnumForm[] {
    return [this.Incarnate, this.Therian]
  }
}
