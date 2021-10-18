import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Generic').addFlags('ExposeMeta')

export class EnumGender {
  public static readonly Male = form.clone().setForm(0).setSpriteSuffix('-male')
  public static readonly Female = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-female')
  public static readonly None = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('')
    .memo('none')

  public static values(): EnumForm[] {
    return [this.Male, this.Female, this.None]
  }
}
