import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Lycanroc').addFlags('ExposeMeta')

export class EnumLycanroc {
  public static readonly Midday = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-midday')
  public static readonly Midnight = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-midnight')
  public static readonly Dusk = form.clone().setForm(2).setSpriteSuffix('-dusk')

  public static values(): EnumForm[] {
    return [this.Midday, this.Midnight, this.Dusk]
  }
}
