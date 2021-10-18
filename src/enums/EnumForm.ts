import { EnumSpecies } from '@/enums/EnumSpecies.js'
import type { FormFlag } from '@/utils/Constants.js'

type FormFlag = keyof typeof FormFlag

class StackableMap<K extends EnumSpecies, V extends EnumForm[]> extends Map<
  K,
  V
> {
  public set(key: K, value: V): this {
    if (this.has(key)) {
      super.set(key, this.get(key)!.concat(value) as V)
    } else {
      super.set(key, value)
    }

    return this
  }
}

export class EnumForm {
  public static readonly normalForms = [
    EnumSpecies.Arbok,
    EnumSpecies.Bidoof,
    EnumSpecies.Genesect,
    EnumSpecies.Sandile,
    EnumSpecies.Spheal,
    EnumSpecies.Solgaleo
  ]

  public static readonly megaForms = [
    EnumSpecies.Abomasnow,
    EnumSpecies.Absol,
    EnumSpecies.Aerodactyl,
    EnumSpecies.Aggron,
    EnumSpecies.Alakazam,
    EnumSpecies.Altaria,
    EnumSpecies.Ampharos,
    EnumSpecies.Audino,
    EnumSpecies.Banette,
    EnumSpecies.Beedrill,
    EnumSpecies.Blastoise,
    EnumSpecies.Blaziken,
    EnumSpecies.Camerupt,
    EnumSpecies.Diancie,
    EnumSpecies.Gallade,
    EnumSpecies.Garchomp,
    EnumSpecies.Gardevoir,
    EnumSpecies.Gengar,
    EnumSpecies.Glalie,
    EnumSpecies.Gyarados,
    EnumSpecies.Heracross,
    EnumSpecies.Houndoom,
    EnumSpecies.Kangaskhan,
    EnumSpecies.Latias,
    EnumSpecies.Latios,
    EnumSpecies.Lopunny,
    EnumSpecies.Lucario,
    EnumSpecies.Manectric,
    EnumSpecies.Mawile,
    EnumSpecies.Medicham,
    EnumSpecies.Metagross,
    EnumSpecies.Pidgeot,
    EnumSpecies.Pinsir,
    EnumSpecies.Rayquaza,
    EnumSpecies.Sableye,
    EnumSpecies.Salamence,
    EnumSpecies.Sceptile,
    EnumSpecies.Scizor,
    EnumSpecies.Sharpedo,
    EnumSpecies.Slowbro,
    EnumSpecies.Steelix,
    EnumSpecies.Swampert,
    EnumSpecies.Tyranitar,
    EnumSpecies.Venusaur
  ]

  public static readonly megaXYForms = [
    EnumSpecies.Charizard,
    EnumSpecies.Mewtwo
  ]

  public static readonly genderForms = [
    EnumSpecies.Combee,
    EnumSpecies.Frillish,
    EnumSpecies.Hippopotas,
    EnumSpecies.Indeedee,
    EnumSpecies.Jellicent,
    EnumSpecies.Meowstic,
    EnumSpecies.Pyroar,
    EnumSpecies.Unfezant,
    EnumSpecies.Wobbuffet
  ]

  public static readonly alolanForms = [
    EnumSpecies.Diglett,
    EnumSpecies.Dugtrio,
    EnumSpecies.Exeggutor,
    EnumSpecies.Geodude,
    EnumSpecies.Golem,
    EnumSpecies.Graveler,
    EnumSpecies.Grimer,
    EnumSpecies.Marowak,
    EnumSpecies.Muk,
    EnumSpecies.Ninetales,
    EnumSpecies.Persian,
    EnumSpecies.Raichu,
    EnumSpecies.Raticate,
    EnumSpecies.Rattata,
    EnumSpecies.Sandshrew,
    EnumSpecies.Sandslash,
    EnumSpecies.Vulpix
  ]

  public static readonly galarianForms = [
    EnumSpecies.Articuno,
    EnumSpecies.Corsola,
    EnumSpecies.Darumaka,
    EnumSpecies.Farfetchd,
    EnumSpecies.Linoone,
    EnumSpecies.Meowth,
    EnumSpecies.Moltres,
    EnumSpecies.MrMime,
    EnumSpecies.Ponyta,
    EnumSpecies.Rapidash,
    EnumSpecies.Slowbro,
    EnumSpecies.Slowking,
    EnumSpecies.Slowpoke,
    EnumSpecies.Stunfisk,
    EnumSpecies.Weezing,
    EnumSpecies.Yamask,
    EnumSpecies.Zapdos,
    EnumSpecies.Zigzagoon
  ]

  public static readonly formList: ReadonlyMap<EnumSpecies, EnumForm[]> =
    new StackableMap()

  public readonly species: string
  public readonly flags: ReadonlySet<keyof typeof FormFlag> = new Set()
  public form = -1
  public spriteSuffix = ''
  public imageSuffix: string | undefined
  public $memo: string | undefined

  private constructor(species: string) {
    this.species = species
  }

  public static of(species: string): EnumForm {
    return new EnumForm(species)
  }

  public getFlags(): FormFlag[] {
    const flags = this.flags as Set<FormFlag>

    return [...flags.values()]
  }

  public addFlags(flag: FormFlag | FormFlag[]): EnumForm {
    const flags = this.flags as Set<FormFlag>

    if (Array.isArray(flag)) flag.forEach(tag => flags.add(tag))
    else flags.add(flag)

    return this
  }

  public removeFlags(flag: FormFlag | FormFlag[]): EnumForm {
    const flags = this.flags as Set<FormFlag>

    if (Array.isArray(flag)) flag.forEach(tag => flags.delete(tag))
    else flags.delete(flag)

    return this
  }

  public setForm(form: number): EnumForm {
    this.form = form

    return this
  }

  public setSpriteSuffix(spriteSuffix: string): EnumForm {
    this.spriteSuffix = spriteSuffix

    return this
  }

  public setImageSuffix(imageSuffix: string): EnumForm {
    this.imageSuffix = imageSuffix

    return this
  }

  public getSpecies(): EnumSpecies {
    return EnumSpecies.getFromName(this.species)!
  }

  public memo(memo: string | undefined): EnumForm {
    this.$memo = memo

    return this
  }

  public removeMemo(): this {
    this.$memo = undefined

    return this
  }

  public clone(): EnumForm {
    return EnumForm.of(this.species).addFlags(this.getFlags()).memo(this.$memo)
  }
}
