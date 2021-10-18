import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Arceus')

export class EnumArceus {
  public static readonly Normal = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-normal')
  public static readonly Grass = form
    .clone()
    .setForm(1)
    .setSpriteSuffix('-grass')
  public static readonly Fire = form.clone().setForm(2).setSpriteSuffix('-fire')
  public static readonly Water = form
    .clone()
    .setForm(3)
    .setSpriteSuffix('-water')
  public static readonly Flying = form
    .clone()
    .setForm(4)
    .setSpriteSuffix('-flying')
  public static readonly Bug = form.clone().setForm(5).setSpriteSuffix('-bug')
  public static readonly Poison = form
    .clone()
    .setForm(6)
    .setSpriteSuffix('-poison')
  public static readonly Electric = form
    .clone()
    .setForm(7)
    .setSpriteSuffix('-electric')
  public static readonly Psychic = form
    .clone()
    .setForm(8)
    .setSpriteSuffix('-psychic')
  public static readonly Rock = form.clone().setForm(9).setSpriteSuffix('-rock')
  public static readonly Ground = form
    .clone()
    .setForm(10)
    .setSpriteSuffix('-ground')
  public static readonly Dark = form
    .clone()
    .setForm(11)
    .setSpriteSuffix('-dark')
  public static readonly Ghost = form
    .clone()
    .setForm(12)
    .setSpriteSuffix('-ghost')
  public static readonly Steel = form
    .clone()
    .setForm(13)
    .setSpriteSuffix('-steel')
  public static readonly Fighting = form
    .clone()
    .setForm(14)
    .setSpriteSuffix('-fighting')
  public static readonly Ice = form.clone().setForm(15).setSpriteSuffix('-ice')
  public static readonly Dragon = form
    .clone()
    .setForm(16)
    .setSpriteSuffix('-dragon')
  public static readonly Fairy = form
    .clone()
    .setForm(17)
    .setSpriteSuffix('-fairy')

  public static values(): EnumForm[] {
    return [
      this.Normal,
      this.Grass,
      this.Fire,
      this.Water,
      this.Flying,
      this.Bug,
      this.Poison,
      this.Electric,
      this.Psychic,
      this.Rock,
      this.Ground,
      this.Dark,
      this.Ghost,
      this.Steel,
      this.Fighting,
      this.Ice,
      this.Dragon,
      this.Fairy
    ]
  }
}
