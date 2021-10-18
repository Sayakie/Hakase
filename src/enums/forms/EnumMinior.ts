import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Minior')
  .addFlags(['ExposeMeta', 'FakeForm'])
  .memo('core')

export class EnumMinior {
  public static readonly Meteor = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-meteor')
    .removeFlags('FakeForm')
    .memo('meteor')
  public static readonly Red = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-red')
    .setImageSuffix('-red-core')
  public static readonly Orange = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-orange')
    .setImageSuffix('-orange-core')
  public static readonly Yellow = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-yellow')
    .setImageSuffix('-yellow-core')
  public static readonly Green = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-green')
    .setImageSuffix('-green-core')
  public static readonly Blue = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-blue')
    .setImageSuffix('-blue-core')
  public static readonly Indigo = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-indigo')
    .setImageSuffix('-indigo-core')
  public static readonly Violet = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-violet')
    .setImageSuffix('-violet-core')

  public static values(): EnumForm[] {
    return [
      this.Meteor,
      this.Red,
      this.Orange,
      this.Yellow,
      this.Green,
      this.Blue,
      this.Indigo,
      this.Violet
    ]
  }
}
