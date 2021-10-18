import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Basculin')

export class EnumBasculin {
  public static readonly Red = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-red')
    .setImageSuffix('-red-striped')
  public static readonly Blue = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-blue')
    .setImageSuffix('-blue-striped')

  public static values(): EnumForm[] {
    return [this.Red, this.Blue]
  }
}
