import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Deoxys')

export class EnumDeoxys {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
  public static readonly Attack = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-attack')
  public static readonly Defense = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-defense')
  public static readonly Speed = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-speed')

  public static values(): EnumForm[] {
    return [this.Normal, this.Attack, this.Defense, this.Speed]
  }
}
