import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Burmy').addFlags(['ExposeMeta', 'FakeForm'])

export class EnumBurmy {
  public static readonly Plant = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-plant')
  public static readonly Sandy = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-sandy')
  public static readonly Trash = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-trash')

  public static values(): EnumForm[] {
    return [this.Plant, this.Sandy, this.Trash]
  }
}
