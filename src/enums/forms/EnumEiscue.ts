import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Eiscue').addFlags('ExposeMeta')

export class EnumEiscue {
  public static readonly IceFace = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-ice_face')
    .setImageSuffix('-ice')
  public static readonly NoiceFace = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-noice_face')
    .setImageSuffix('-noice')

  public static values(): EnumForm[] {
    return [this.IceFace, this.NoiceFace]
  }
}
