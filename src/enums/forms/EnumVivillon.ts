import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Vivillon')

export class EnumVivillon {
  public static readonly Archipelago = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-archipelago')
  public static readonly Continental = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-continental')
  public static readonly Elegant = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-elegant')
  public static readonly Garden = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-garden')
  public static readonly Highplains = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-highplains')
    .setImageSuffix('-hith-plains')
  public static readonly Icysnow = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-icysnow')
    .setImageSuffix('-icy-snow')
  public static readonly Jungle = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-jungle')
  public static readonly Marine = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-marine')
  public static readonly Meadow = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-meadow')
  public static readonly Modern = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-modern')
  public static readonly Monsoon = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-monsoon')
  public static readonly Ocean = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-ocean')
  public static readonly Polar = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-polar')
  public static readonly River = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-river')
  public static readonly Sandstorm = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-sandstorm')
  public static readonly Savanna = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-savanna')
  public static readonly Sun = form.clone().setForm(0).setSpriteSuffix('-sun')
  public static readonly Tundra = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-tundra')
  public static readonly Fancy = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-fancy')
  public static readonly Pokeball = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-pokeball')
    .setImageSuffix('-poke-ball')

  public static values(): EnumForm[] {
    return [
      this.Archipelago,
      this.Continental,
      this.Elegant,
      this.Garden,
      this.Highplains,
      this.Icysnow,
      this.Jungle,
      this.Marine,
      this.Meadow,
      this.Modern,
      this.Monsoon,
      this.Ocean,
      this.Polar,
      this.River,
      this.Sandstorm,
      this.Savanna,
      this.Sun,
      this.Tundra,
      this.Fancy,
      this.Pokeball
    ]
  }
}
