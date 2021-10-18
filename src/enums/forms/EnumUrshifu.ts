import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Urshifu').addFlags('ExposeMeta')

export class EnumUrshifu {
  public static readonly SingleStrike = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-singlestrike')
    .setImageSuffix('-single-strike')
  public static readonly RapidStrike = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-rapidstrike')
    .setImageSuffix('-rapid-strike')

  public static values(): EnumForm[] {
    return [this.SingleStrike, this.RapidStrike]
  }
}
