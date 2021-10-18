import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('HeroDuo').addFlags('ExposeMeta')

export class EnumHeroDuo {
  public static readonly Hero = form.clone().setForm(0).setSpriteSuffix('-hero')
  public static readonly Crowned = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-crowned')

  public static values(): EnumForm[] {
    return [this.Hero, this.Crowned]
  }
}
