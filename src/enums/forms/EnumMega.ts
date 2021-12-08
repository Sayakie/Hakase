import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Generic').addFlags('PinToPrefix')

export class EnumMega {
  public static readonly Normal = form.clone().setForm(0).memo('normal')
  public static readonly Mega = form.clone().setForm(1).setSpriteSuffix('-mega')
  public static readonly MegaX = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-mega-x')
  public static readonly MegaY = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-mega-y')
}
