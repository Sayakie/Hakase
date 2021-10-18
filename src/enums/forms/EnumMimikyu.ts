import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Mimikyu').addFlags('FakeForm')

export class EnumMimikyu {
  public static readonly Disguised = form.clone().setForm(0).memo('disguised')
  public static readonly Busted = form
    .clone()
    .setForm(1)
    .setImageSuffix('-busted')
    .memo('busted')

  public static values(): EnumForm[] {
    return [this.Disguised, this.Busted]
  }
}
