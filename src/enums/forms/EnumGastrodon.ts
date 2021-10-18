import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Gastrodon')

export class EnumGastrodon {
  public static readonly East = form.clone().setForm(0).setSpriteSuffix('-east')
  public static readonly West = form.clone().setForm(0).setSpriteSuffix('-west')

  public static values(): EnumForm[] {
    return [this.East, this.West]
  }
}
