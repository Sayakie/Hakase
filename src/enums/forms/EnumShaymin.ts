import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Shaymin').addFlags('ExposeMeta')

export class EnumShaymin {
  public static readonly Land = form.clone().setForm(0).setSpriteSuffix('-land')
  public static readonly Sky = form.clone().setForm(1).setSpriteSuffix('-sky')

  public static values(): EnumForm[] {
    return [this.Land, this.Sky]
  }
}
