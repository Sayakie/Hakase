import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Flabebe').memo('normal')

export class EnumFlabebe {
  public static readonly Red = form.clone().setForm(0).setSpriteSuffix('-red')
  public static readonly Yellow = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-yellow')
  public static readonly Orange = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-orange')
  public static readonly Blue = form.clone().setForm(0).setSpriteSuffix('-blue')
  public static readonly White = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-white')
  public static readonly AZ = form
    .clone()
    .setForm(5)
    .setSpriteSuffix('-az')
    .removeMemo()

  public static values(): EnumForm[] {
    return [this.Red, this.Yellow, this.Orange, this.Blue, this.White, this.AZ]
  }
}
