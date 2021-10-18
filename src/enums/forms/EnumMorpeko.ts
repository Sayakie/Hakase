import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Morpeko').addFlags('ExposeMeta')

export class EnumMorpeko {
  public static readonly Fullbelly = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-fullbelly')
    .setImageSuffix('-full-belly')
  public static readonly Hangry = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-hangry')
    .addFlags('FakeForm')

  public static values(): EnumForm[] {
    return [this.Fullbelly, this.Hangry]
  }
}
