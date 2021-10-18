import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Darmanitan').addFlags('ExposeMeta')

export class EnumDarmanitan {
  public static readonly Standard = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-standard')
  public static readonly Zen = form.clone().setForm(1).setSpriteSuffix('-zen')
  public static readonly GalarStandard = form
    .clone()
    .setForm(2)
    .setSpriteSuffix('-galar-standard')
    .setImageSuffix('-galarian-standard')
  public static readonly GalarZen = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-galar-zen')
    .setImageSuffix('-galarian-zen')

  public static values(): EnumForm[] {
    return [this.Standard, this.Zen, this.GalarStandard, this.GalarZen]
  }
}
