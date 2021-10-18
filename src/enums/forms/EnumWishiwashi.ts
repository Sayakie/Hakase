import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Wishiwashi').addFlags('ExposeMeta')

export class EnumWishiwashi {
  public static readonly Solo = form.clone().setForm(0).setSpriteSuffix('-solo')
  public static readonly School = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-school')

  public static values(): EnumForm[] {
    return [this.Solo, this.School]
  }
}
