import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Greninja')

export class EnumGreninja {
  public static readonly Base = form.clone().setForm(0)
  public static readonly Ash = form.clone().setForm(2).setSpriteSuffix('-ash')

  public static values(): EnumForm[] {
    return [this.Base, this.Ash]
  }
}
