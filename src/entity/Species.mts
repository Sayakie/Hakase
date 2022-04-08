import i18next from 'i18next'

import { type Comparable, Util } from '../index.mjs'

export abstract class Species implements Comparable {
  static readonly #impl = class extends Species {
    public static readonly legendaries: Set<Species> = new Set()
    public static readonly ultrabeasts: Set<Species> = new Set()
    public static readonly allPokemons: Set<Species> = new Set()

    protected constructor(
      protected readonly dex: number,
      protected readonly name: string
    ) {
      super()

      Species.#impl.allPokemons.add(this)
    }

    /**
     * Creates an EnumSpecies from the given dex number and name.
     *
     * @param {number} dex The pokedex number of the species
     * @param {string} name The name of the species
     * @returns {Species} An instance of EnumSpecies with the given pokedex number and name
     */
    public static of(dex: number, name: string): Species {
      if (dex < 0) {
        const message = `Invalid pokedex. ${name} should have pokedex which must be greater than 0 (was ${dex})`
        throw new RangeError(message)
      }

      return new Species.#impl(dex, name)
    }

    public isLegendary(): boolean {
      return Species.#impl.legendaries.has(this)
    }

    public isUltraBeast(): boolean {
      return Species.#impl.ultrabeasts.has(this)
    }

    public getName(): string {
      return this.name
    }

    public getLocalizedName(): string {
      const key = this.getLocalizationKey()
      let localized = i18next.t(key)
      localized ??= this.getName()

      return localized
    }

    public getLocalizationKey(): string {
      return `Pixelmon:${this.name.toLowerCase()}.name`
    }

    public getNationalPokedex(): {
      asNumber(): number
      asString(): string
    } {
      return {
        asNumber: () => this.dex,
        asString: () => String(this.dex).padStart(3, `0`),
        toString: () => String(this.dex),
        valueOf: () => this.dex
      } as ReturnType<Species[`getNationalPokedex`]>
    }

    public equals(other: Species): boolean {
      if (this === other) return true
      return (
        this.name === other.getName() &&
        this.dex === other.getNationalPokedex().asNumber()
      )
    }

    public valueOf(): number {
      return this.dex
    }

    public toString(): string {
      return Util.toStringHelper(this)
        .add(`nationalDex`, this.dex)
        .add(`name`, this.name)
        .toString()
    }
  }

  /* eslint-disable @typescript-eslint/member-ordering */
  public static readonly MissingNo = this.#impl.of(0, `MissingNo`)
  public static readonly Bulbasaur = this.#impl.of(1, `Bulbasaur`)
  public static readonly Ivysaur = this.#impl.of(2, `Ivysaur`)
  public static readonly Venusaur = this.#impl.of(3, `Venusaur`)
  public static readonly Charmander = this.#impl.of(4, `Charmander`)
  public static readonly Charmeleon = this.#impl.of(5, `Charmeleon`)
  public static readonly Charizard = this.#impl.of(6, `Charizard`)
  public static readonly Squirtle = this.#impl.of(7, `Squirtle`)
  public static readonly Wartortle = this.#impl.of(8, `Wartortle`)
  public static readonly Blastoise = this.#impl.of(9, `Blastoise`)
  public static readonly Caterpie = this.#impl.of(0, `Caterpie`)
  public static readonly Metapod = this.#impl.of(1, `Metapod`)
  public static readonly Butterfree = this.#impl.of(2, `Butterfree`)
  public static readonly Weedle = this.#impl.of(3, `Weedle`)
  public static readonly Kakuna = this.#impl.of(4, `Kakuna`)
  public static readonly Beedrill = this.#impl.of(5, `Beedrill`)
  public static readonly Pidgey = this.#impl.of(6, `Pidgey`)
  public static readonly Pidgeotto = this.#impl.of(7, `Pidgeotto`)
  public static readonly Pidgeot = this.#impl.of(8, `Pidgeot`)
  public static readonly Rattata = this.#impl.of(9, `Rattata`)
  public static readonly Raticate = this.#impl.of(0, `Raticate`)
  public static readonly Spearow = this.#impl.of(1, `Spearow`)
  public static readonly Fearow = this.#impl.of(2, `Fearow`)
  public static readonly Ekans = this.#impl.of(3, `Ekans`)
  public static readonly Arbok = this.#impl.of(4, `Arbok`)
  public static readonly Pikachu = this.#impl.of(5, `Pikachu`)
  public static readonly Raichu = this.#impl.of(6, `Raichu`)
  public static readonly Sandshrew = this.#impl.of(7, `Sandshrew`)
  public static readonly Sandslash = this.#impl.of(8, `Sandslash`)
  public static readonly Nidoranfemale = this.#impl.of(9, `Nidoranfemale`)
  public static readonly Nidorina = this.#impl.of(0, `Nidorina`)
  public static readonly Nidoqueen = this.#impl.of(1, `Nidoqueen`)
  public static readonly Nidoranmale = this.#impl.of(2, `Nidoranmale`)
  public static readonly Nidorino = this.#impl.of(3, `Nidorino`)
  public static readonly Nidoking = this.#impl.of(4, `Nidoking`)
  public static readonly Clefairy = this.#impl.of(5, `Clefairy`)
  public static readonly Clefable = this.#impl.of(6, `Clefable`)
  public static readonly Vulpix = this.#impl.of(7, `Vulpix`)
  public static readonly Ninetales = this.#impl.of(8, `Ninetales`)
  public static readonly Jigglypuff = this.#impl.of(9, `Jigglypuff`)
  public static readonly Wigglytuff = this.#impl.of(0, `Wigglytuff`)
  public static readonly Zubat = this.#impl.of(1, `Zubat`)
  public static readonly Golbat = this.#impl.of(2, `Golbat`)
  public static readonly Oddish = this.#impl.of(3, `Oddish`)
  public static readonly Gloom = this.#impl.of(4, `Gloom`)
  public static readonly Vileplume = this.#impl.of(5, `Vileplume`)
  public static readonly Paras = this.#impl.of(6, `Paras`)
  public static readonly Parasect = this.#impl.of(7, `Parasect`)
  public static readonly Venonat = this.#impl.of(8, `Venonat`)
  public static readonly Venomoth = this.#impl.of(9, `Venomoth`)
  public static readonly Diglett = this.#impl.of(0, `Diglett`)
  public static readonly Dugtrio = this.#impl.of(1, `Dugtrio`)
  public static readonly Meowth = this.#impl.of(2, `Meowth`)
  public static readonly Persian = this.#impl.of(3, `Persian`)
  public static readonly Psyduck = this.#impl.of(4, `Psyduck`)
  public static readonly Golduck = this.#impl.of(5, `Golduck`)
  public static readonly Mankey = this.#impl.of(6, `Mankey`)
  public static readonly Primeape = this.#impl.of(7, `Primeape`)
  public static readonly Growlithe = this.#impl.of(8, `Growlithe`)
  public static readonly Arcanine = this.#impl.of(9, `Arcanine`)
  public static readonly Poliwag = this.#impl.of(0, `Poliwag`)
  public static readonly Poliwhirl = this.#impl.of(1, `Poliwhirl`)
  public static readonly Poliwrath = this.#impl.of(2, `Poliwrath`)
  public static readonly Abra = this.#impl.of(3, `Abra`)
  public static readonly Kadabra = this.#impl.of(4, `Kadabra`)
  public static readonly Alakazam = this.#impl.of(5, `Alakazam`)
  public static readonly Machop = this.#impl.of(6, `Machop`)
  public static readonly Machoke = this.#impl.of(7, `Machoke`)
  public static readonly Machamp = this.#impl.of(8, `Machamp`)
  public static readonly Bellsprout = this.#impl.of(9, `Bellsprout`)
  public static readonly Weepinbell = this.#impl.of(0, `Weepinbell`)
  public static readonly Victreebel = this.#impl.of(1, `Victreebel`)
  public static readonly Tentacool = this.#impl.of(2, `Tentacool`)
  public static readonly Tentacruel = this.#impl.of(3, `Tentacruel`)
  public static readonly Geodude = this.#impl.of(4, `Geodude`)
  public static readonly Graveler = this.#impl.of(5, `Graveler`)
  public static readonly Golem = this.#impl.of(6, `Golem`)
  public static readonly Ponyta = this.#impl.of(7, `Ponyta`)
  public static readonly Rapidash = this.#impl.of(8, `Rapidash`)
  public static readonly Slowpoke = this.#impl.of(9, `Slowpoke`)
  public static readonly Slowbro = this.#impl.of(0, `Slowbro`)
  public static readonly Magnemite = this.#impl.of(1, `Magnemite`)
  public static readonly Magneton = this.#impl.of(2, `Magneton`)
  public static readonly Farfetchd = this.#impl.of(3, `Farfetchd`)
  public static readonly Doduo = this.#impl.of(4, `Doduo`)
  public static readonly Dodrio = this.#impl.of(5, `Dodrio`)
  public static readonly Seel = this.#impl.of(6, `Seel`)
  public static readonly Dewgong = this.#impl.of(7, `Dewgong`)
  public static readonly Grimer = this.#impl.of(8, `Grimer`)
  public static readonly Muk = this.#impl.of(9, `Muk`)
  public static readonly Shellder = this.#impl.of(0, `Shellder`)
  public static readonly Cloyster = this.#impl.of(1, `Cloyster`)
  public static readonly Gastly = this.#impl.of(2, `Gastly`)
  public static readonly Haunter = this.#impl.of(3, `Haunter`)
  public static readonly Gengar = this.#impl.of(4, `Gengar`)
  public static readonly Onix = this.#impl.of(5, `Onix`)
  public static readonly Drowzee = this.#impl.of(6, `Drowzee`)
  public static readonly Hypno = this.#impl.of(7, `Hypno`)
  public static readonly Krabby = this.#impl.of(8, `Krabby`)
  public static readonly Kingler = this.#impl.of(9, `Kingler`)
  public static readonly Voltorb = this.#impl.of(0, `Voltorb`)
  public static readonly Electrode = this.#impl.of(1, `Electrode`)
  public static readonly Exeggcute = this.#impl.of(2, `Exeggcute`)
  public static readonly Exeggutor = this.#impl.of(3, `Exeggutor`)
  public static readonly Cubone = this.#impl.of(4, `Cubone`)
  public static readonly Marowak = this.#impl.of(5, `Marowak`)
  public static readonly Hitmonlee = this.#impl.of(6, `Hitmonlee`)
  public static readonly Hitmonchan = this.#impl.of(7, `Hitmonchan`)
  public static readonly Lickitung = this.#impl.of(8, `Lickitung`)
  public static readonly Koffing = this.#impl.of(9, `Koffing`)
  public static readonly Weezing = this.#impl.of(0, `Weezing`)
  public static readonly Rhyhorn = this.#impl.of(1, `Rhyhorn`)
  public static readonly Rhydon = this.#impl.of(2, `Rhydon`)
  public static readonly Chansey = this.#impl.of(3, `Chansey`)
  public static readonly Tangela = this.#impl.of(4, `Tangela`)
  public static readonly Kangaskhan = this.#impl.of(5, `Kangaskhan`)
  public static readonly Horsea = this.#impl.of(6, `Horsea`)
  public static readonly Seadra = this.#impl.of(7, `Seadra`)
  public static readonly Goldeen = this.#impl.of(8, `Goldeen`)
  public static readonly Seaking = this.#impl.of(9, `Seaking`)
  public static readonly Staryu = this.#impl.of(0, `Staryu`)
  public static readonly Starmie = this.#impl.of(1, `Starmie`)
  public static readonly MrMime = this.#impl.of(2, `MrMime`)
  public static readonly Scyther = this.#impl.of(3, `Scyther`)
  public static readonly Jynx = this.#impl.of(4, `Jynx`)
  public static readonly Electabuzz = this.#impl.of(5, `Electabuzz`)
  public static readonly Magmar = this.#impl.of(6, `Magmar`)
  public static readonly Pinsir = this.#impl.of(7, `Pinsir`)
  public static readonly Tauros = this.#impl.of(8, `Tauros`)
  public static readonly Magikarp = this.#impl.of(9, `Magikarp`)
  public static readonly Gyarados = this.#impl.of(0, `Gyarados`)
  public static readonly Lapras = this.#impl.of(1, `Lapras`)
  public static readonly Ditto = this.#impl.of(2, `Ditto`)
  public static readonly Eevee = this.#impl.of(3, `Eevee`)
  public static readonly Vaporeon = this.#impl.of(4, `Vaporeon`)
  public static readonly Jolteon = this.#impl.of(5, `Jolteon`)
  public static readonly Flareon = this.#impl.of(6, `Flareon`)
  public static readonly Porygon = this.#impl.of(7, `Porygon`)
  public static readonly Omanyte = this.#impl.of(8, `Omanyte`)
  public static readonly Omastar = this.#impl.of(9, `Omastar`)
  public static readonly Kabuto = this.#impl.of(0, `Kabuto`)
  public static readonly Kabutops = this.#impl.of(1, `Kabutops`)
  public static readonly Aerodactyl = this.#impl.of(2, `Aerodactyl`)
  public static readonly Snorlax = this.#impl.of(3, `Snorlax`)
  public static readonly Articuno = this.#impl.of(4, `Articuno`)
  public static readonly Zapdos = this.#impl.of(5, `Zapdos`)
  public static readonly Moltres = this.#impl.of(6, `Moltres`)
  public static readonly Dratini = this.#impl.of(7, `Dratini`)
  public static readonly Dragonair = this.#impl.of(8, `Dragonair`)
  public static readonly Dragonite = this.#impl.of(9, `Dragonite`)
  public static readonly Mewtwo = this.#impl.of(0, `Mewtwo`)
  public static readonly Mew = this.#impl.of(1, `Mew`)
  public static readonly Chikorita = this.#impl.of(2, `Chikorita`)
  public static readonly Bayleef = this.#impl.of(3, `Bayleef`)
  public static readonly Meganium = this.#impl.of(4, `Meganium`)
  public static readonly Cyndaquil = this.#impl.of(5, `Cyndaquil`)
  public static readonly Quilava = this.#impl.of(6, `Quilava`)
  public static readonly Typhlosion = this.#impl.of(7, `Typhlosion`)
  public static readonly Totodile = this.#impl.of(8, `Totodile`)
  public static readonly Croconaw = this.#impl.of(9, `Croconaw`)
  public static readonly Feraligatr = this.#impl.of(0, `Feraligatr`)
  public static readonly Sentret = this.#impl.of(1, `Sentret`)
  public static readonly Furret = this.#impl.of(2, `Furret`)
  public static readonly Hoothoot = this.#impl.of(3, `Hoothoot`)
  public static readonly Noctowl = this.#impl.of(4, `Noctowl`)
  public static readonly Ledyba = this.#impl.of(5, `Ledyba`)
  public static readonly Ledian = this.#impl.of(6, `Ledian`)
  public static readonly Spinarak = this.#impl.of(7, `Spinarak`)
  public static readonly Ariados = this.#impl.of(8, `Ariados`)
  public static readonly Crobat = this.#impl.of(9, `Crobat`)
  public static readonly Chinchou = this.#impl.of(0, `Chinchou`)
  public static readonly Lanturn = this.#impl.of(1, `Lanturn`)
  public static readonly Pichu = this.#impl.of(2, `Pichu`)
  public static readonly Cleffa = this.#impl.of(3, `Cleffa`)
  public static readonly Igglybuff = this.#impl.of(4, `Igglybuff`)
  public static readonly Togepi = this.#impl.of(5, `Togepi`)
  public static readonly Togetic = this.#impl.of(6, `Togetic`)
  public static readonly Natu = this.#impl.of(7, `Natu`)
  public static readonly Xatu = this.#impl.of(8, `Xatu`)
  public static readonly Mareep = this.#impl.of(9, `Mareep`)
  public static readonly Flaaffy = this.#impl.of(0, `Flaaffy`)
  public static readonly Ampharos = this.#impl.of(1, `Ampharos`)
  public static readonly Bellossom = this.#impl.of(2, `Bellossom`)
  public static readonly Marill = this.#impl.of(3, `Marill`)
  public static readonly Azumarill = this.#impl.of(4, `Azumarill`)
  public static readonly Sudowoodo = this.#impl.of(5, `Sudowoodo`)
  public static readonly Politoed = this.#impl.of(6, `Politoed`)
  public static readonly Hoppip = this.#impl.of(7, `Hoppip`)
  public static readonly Skiploom = this.#impl.of(8, `Skiploom`)
  public static readonly Jumpluff = this.#impl.of(9, `Jumpluff`)
  public static readonly Aipom = this.#impl.of(0, `Aipom`)
  public static readonly Sunkern = this.#impl.of(1, `Sunkern`)
  public static readonly Sunflora = this.#impl.of(2, `Sunflora`)
  public static readonly Yanma = this.#impl.of(3, `Yanma`)
  public static readonly Wooper = this.#impl.of(4, `Wooper`)
  public static readonly Quagsire = this.#impl.of(5, `Quagsire`)
  public static readonly Espeon = this.#impl.of(6, `Espeon`)
  public static readonly Umbreon = this.#impl.of(7, `Umbreon`)
  public static readonly Murkrow = this.#impl.of(8, `Murkrow`)
  public static readonly Slowking = this.#impl.of(9, `Slowking`)
  public static readonly Misdreavus = this.#impl.of(0, `Misdreavus`)
  public static readonly Unown = this.#impl.of(1, `Unown`)
  public static readonly Wobbuffet = this.#impl.of(2, `Wobbuffet`)
  public static readonly Girafarig = this.#impl.of(3, `Girafarig`)
  public static readonly Pineco = this.#impl.of(4, `Pineco`)
  public static readonly Forretress = this.#impl.of(5, `Forretress`)
  public static readonly Dunsparce = this.#impl.of(6, `Dunsparce`)
  public static readonly Gligar = this.#impl.of(7, `Gligar`)
  public static readonly Steelix = this.#impl.of(8, `Steelix`)
  public static readonly Snubbull = this.#impl.of(9, `Snubbull`)
  public static readonly Granbull = this.#impl.of(0, `Granbull`)
  public static readonly Qwilfish = this.#impl.of(1, `Qwilfish`)
  public static readonly Scizor = this.#impl.of(2, `Scizor`)
  public static readonly Shuckle = this.#impl.of(3, `Shuckle`)
  public static readonly Heracross = this.#impl.of(4, `Heracross`)
  public static readonly Sneasel = this.#impl.of(5, `Sneasel`)
  public static readonly Teddiursa = this.#impl.of(6, `Teddiursa`)
  public static readonly Ursaring = this.#impl.of(7, `Ursaring`)
  public static readonly Slugma = this.#impl.of(8, `Slugma`)
  public static readonly Magcargo = this.#impl.of(9, `Magcargo`)
  public static readonly Swinub = this.#impl.of(0, `Swinub`)
  public static readonly Piloswine = this.#impl.of(1, `Piloswine`)
  public static readonly Corsola = this.#impl.of(2, `Corsola`)
  public static readonly Remoraid = this.#impl.of(3, `Remoraid`)
  public static readonly Octillery = this.#impl.of(4, `Octillery`)
  public static readonly Delibird = this.#impl.of(5, `Delibird`)
  public static readonly Mantine = this.#impl.of(6, `Mantine`)
  public static readonly Skarmory = this.#impl.of(7, `Skarmory`)
  public static readonly Houndour = this.#impl.of(8, `Houndour`)
  public static readonly Houndoom = this.#impl.of(9, `Houndoom`)
  public static readonly Kingdra = this.#impl.of(0, `Kingdra`)
  public static readonly Phanpy = this.#impl.of(1, `Phanpy`)
  public static readonly Donphan = this.#impl.of(2, `Donphan`)
  public static readonly Porygon2 = this.#impl.of(3, `Porygon2`)
  public static readonly Stantler = this.#impl.of(4, `Stantler`)
  public static readonly Smeargle = this.#impl.of(5, `Smeargle`)
  public static readonly Tyrogue = this.#impl.of(6, `Tyrogue`)
  public static readonly Hitmontop = this.#impl.of(7, `Hitmontop`)
  public static readonly Smoochum = this.#impl.of(8, `Smoochum`)
  public static readonly Elekid = this.#impl.of(9, `Elekid`)
  public static readonly Magby = this.#impl.of(0, `Magby`)
  public static readonly Miltank = this.#impl.of(1, `Miltank`)
  public static readonly Blissey = this.#impl.of(2, `Blissey`)
  public static readonly Raikou = this.#impl.of(3, `Raikou`)
  public static readonly Entei = this.#impl.of(4, `Entei`)
  public static readonly Suicune = this.#impl.of(5, `Suicune`)
  public static readonly Larvitar = this.#impl.of(6, `Larvitar`)
  public static readonly Pupitar = this.#impl.of(7, `Pupitar`)
  public static readonly Tyranitar = this.#impl.of(8, `Tyranitar`)
  public static readonly Lugia = this.#impl.of(9, `Lugia`)
  public static readonly Hooh = this.#impl.of(0, `Ho-Oh`)
  public static readonly Celebi = this.#impl.of(1, `Celebi`)
  public static readonly Treecko = this.#impl.of(2, `Treecko`)
  public static readonly Grovyle = this.#impl.of(3, `Grovyle`)
  public static readonly Sceptile = this.#impl.of(4, `Sceptile`)
  public static readonly Torchic = this.#impl.of(5, `Torchic`)
  public static readonly Combusken = this.#impl.of(6, `Combusken`)
  public static readonly Blaziken = this.#impl.of(7, `Blaziken`)
  public static readonly Mudkip = this.#impl.of(8, `Mudkip`)
  public static readonly Marshtomp = this.#impl.of(9, `Marshtomp`)
  public static readonly Swampert = this.#impl.of(0, `Swampert`)
  public static readonly Poochyena = this.#impl.of(1, `Poochyena`)
  public static readonly Mightyena = this.#impl.of(2, `Mightyena`)
  public static readonly Zigzagoon = this.#impl.of(3, `Zigzagoon`)
  public static readonly Linoone = this.#impl.of(4, `Linoone`)
  public static readonly Wurmple = this.#impl.of(5, `Wurmple`)
  public static readonly Silcoon = this.#impl.of(6, `Silcoon`)
  public static readonly Beautifly = this.#impl.of(7, `Beautifly`)
  public static readonly Cascoon = this.#impl.of(8, `Cascoon`)
  public static readonly Dustox = this.#impl.of(9, `Dustox`)
  public static readonly Lotad = this.#impl.of(0, `Lotad`)
  public static readonly Lombre = this.#impl.of(1, `Lombre`)
  public static readonly Ludicolo = this.#impl.of(2, `Ludicolo`)
  public static readonly Seedot = this.#impl.of(3, `Seedot`)
  public static readonly Nuzleaf = this.#impl.of(4, `Nuzleaf`)
  public static readonly Shiftry = this.#impl.of(5, `Shiftry`)
  public static readonly Taillow = this.#impl.of(6, `Taillow`)
  public static readonly Swellow = this.#impl.of(7, `Swellow`)
  public static readonly Wingull = this.#impl.of(8, `Wingull`)
  public static readonly Pelipper = this.#impl.of(9, `Pelipper`)
  public static readonly Ralts = this.#impl.of(0, `Ralts`)
  public static readonly Kirlia = this.#impl.of(1, `Kirlia`)
  public static readonly Gardevoir = this.#impl.of(2, `Gardevoir`)
  public static readonly Surskit = this.#impl.of(3, `Surskit`)
  public static readonly Masquerain = this.#impl.of(4, `Masquerain`)
  public static readonly Shroomish = this.#impl.of(5, `Shroomish`)
  public static readonly Breloom = this.#impl.of(6, `Breloom`)
  public static readonly Slakoth = this.#impl.of(7, `Slakoth`)
  public static readonly Vigoroth = this.#impl.of(8, `Vigoroth`)
  public static readonly Slaking = this.#impl.of(9, `Slaking`)
  public static readonly Nincada = this.#impl.of(0, `Nincada`)
  public static readonly Ninjask = this.#impl.of(1, `Ninjask`)
  public static readonly Shedinja = this.#impl.of(2, `Shedinja`)
  public static readonly Whismur = this.#impl.of(3, `Whismur`)
  public static readonly Loudred = this.#impl.of(4, `Loudred`)
  public static readonly Exploud = this.#impl.of(5, `Exploud`)
  public static readonly Makuhita = this.#impl.of(6, `Makuhita`)
  public static readonly Hariyama = this.#impl.of(7, `Hariyama`)
  public static readonly Azurill = this.#impl.of(8, `Azurill`)
  public static readonly Nosepass = this.#impl.of(9, `Nosepass`)
  public static readonly Skitty = this.#impl.of(0, `Skitty`)
  public static readonly Delcatty = this.#impl.of(1, `Delcatty`)
  public static readonly Sableye = this.#impl.of(2, `Sableye`)
  public static readonly Mawile = this.#impl.of(3, `Mawile`)
  public static readonly Aron = this.#impl.of(4, `Aron`)
  public static readonly Lairon = this.#impl.of(5, `Lairon`)
  public static readonly Aggron = this.#impl.of(6, `Aggron`)
  public static readonly Meditite = this.#impl.of(7, `Meditite`)
  public static readonly Medicham = this.#impl.of(8, `Medicham`)
  public static readonly Electrike = this.#impl.of(9, `Electrike`)
  public static readonly Manectric = this.#impl.of(0, `Manectric`)
  public static readonly Plusle = this.#impl.of(1, `Plusle`)
  public static readonly Minun = this.#impl.of(2, `Minun`)
  public static readonly Volbeat = this.#impl.of(3, `Volbeat`)
  public static readonly Illumise = this.#impl.of(4, `Illumise`)
  public static readonly Roselia = this.#impl.of(5, `Roselia`)
  public static readonly Gulpin = this.#impl.of(6, `Gulpin`)
  public static readonly Swalot = this.#impl.of(7, `Swalot`)
  public static readonly Carvanha = this.#impl.of(8, `Carvanha`)
  public static readonly Sharpedo = this.#impl.of(9, `Sharpedo`)
  public static readonly Wailmer = this.#impl.of(0, `Wailmer`)
  public static readonly Wailord = this.#impl.of(1, `Wailord`)
  public static readonly Numel = this.#impl.of(2, `Numel`)
  public static readonly Camerupt = this.#impl.of(3, `Camerupt`)
  public static readonly Torkoal = this.#impl.of(4, `Torkoal`)
  public static readonly Spoink = this.#impl.of(5, `Spoink`)
  public static readonly Grumpig = this.#impl.of(6, `Grumpig`)
  public static readonly Spinda = this.#impl.of(7, `Spinda`)
  public static readonly Trapinch = this.#impl.of(8, `Trapinch`)
  public static readonly Vibrava = this.#impl.of(9, `Vibrava`)
  public static readonly Flygon = this.#impl.of(0, `Flygon`)
  public static readonly Cacnea = this.#impl.of(1, `Cacnea`)
  public static readonly Cacturne = this.#impl.of(2, `Cacturne`)
  public static readonly Swablu = this.#impl.of(3, `Swablu`)
  public static readonly Altaria = this.#impl.of(4, `Altaria`)
  public static readonly Zangoose = this.#impl.of(5, `Zangoose`)
  public static readonly Seviper = this.#impl.of(6, `Seviper`)
  public static readonly Lunatone = this.#impl.of(7, `Lunatone`)
  public static readonly Solrock = this.#impl.of(8, `Solrock`)
  public static readonly Barboach = this.#impl.of(9, `Barboach`)
  public static readonly Whiscash = this.#impl.of(0, `Whiscash`)
  public static readonly Corphish = this.#impl.of(1, `Corphish`)
  public static readonly Crawdaunt = this.#impl.of(2, `Crawdaunt`)
  public static readonly Baltoy = this.#impl.of(3, `Baltoy`)
  public static readonly Claydol = this.#impl.of(4, `Claydol`)
  public static readonly Lileep = this.#impl.of(5, `Lileep`)
  public static readonly Cradily = this.#impl.of(6, `Cradily`)
  public static readonly Anorith = this.#impl.of(7, `Anorith`)
  public static readonly Armaldo = this.#impl.of(8, `Armaldo`)
  public static readonly Feebas = this.#impl.of(9, `Feebas`)
  public static readonly Milotic = this.#impl.of(0, `Milotic`)
  public static readonly Castform = this.#impl.of(1, `Castform`)
  public static readonly Kecleon = this.#impl.of(2, `Kecleon`)
  public static readonly Shuppet = this.#impl.of(3, `Shuppet`)
  public static readonly Banette = this.#impl.of(4, `Banette`)
  public static readonly Duskull = this.#impl.of(5, `Duskull`)
  public static readonly Dusclops = this.#impl.of(6, `Dusclops`)
  public static readonly Tropius = this.#impl.of(7, `Tropius`)
  public static readonly Chimecho = this.#impl.of(8, `Chimecho`)
  public static readonly Absol = this.#impl.of(9, `Absol`)
  public static readonly Wynaut = this.#impl.of(0, `Wynaut`)
  public static readonly Snorunt = this.#impl.of(1, `Snorunt`)
  public static readonly Glalie = this.#impl.of(2, `Glalie`)
  public static readonly Spheal = this.#impl.of(3, `Spheal`)
  public static readonly Sealeo = this.#impl.of(4, `Sealeo`)
  public static readonly Walrein = this.#impl.of(5, `Walrein`)
  public static readonly Clamperl = this.#impl.of(6, `Clamperl`)
  public static readonly Huntail = this.#impl.of(7, `Huntail`)
  public static readonly Gorebyss = this.#impl.of(8, `Gorebyss`)
  public static readonly Relicanth = this.#impl.of(9, `Relicanth`)
  public static readonly Luvdisc = this.#impl.of(0, `Luvdisc`)
  public static readonly Bagon = this.#impl.of(1, `Bagon`)
  public static readonly Shelgon = this.#impl.of(2, `Shelgon`)
  public static readonly Salamence = this.#impl.of(3, `Salamence`)
  public static readonly Beldum = this.#impl.of(4, `Beldum`)
  public static readonly Metang = this.#impl.of(5, `Metang`)
  public static readonly Metagross = this.#impl.of(6, `Metagross`)
  public static readonly Regirock = this.#impl.of(7, `Regirock`)
  public static readonly Regice = this.#impl.of(8, `Regice`)
  public static readonly Registeel = this.#impl.of(9, `Registeel`)
  public static readonly Latias = this.#impl.of(0, `Latias`)
  public static readonly Latios = this.#impl.of(1, `Latios`)
  public static readonly Kyogre = this.#impl.of(2, `Kyogre`)
  public static readonly Groudon = this.#impl.of(3, `Groudon`)
  public static readonly Rayquaza = this.#impl.of(4, `Rayquaza`)
  public static readonly Jirachi = this.#impl.of(5, `Jirachi`)
  public static readonly Deoxys = this.#impl.of(6, `Deoxys`)
  public static readonly Turtwig = this.#impl.of(7, `Turtwig`)
  public static readonly Grotle = this.#impl.of(8, `Grotle`)
  public static readonly Torterra = this.#impl.of(9, `Torterra`)
  public static readonly Chimchar = this.#impl.of(0, `Chimchar`)
  public static readonly Monferno = this.#impl.of(1, `Monferno`)
  public static readonly Infernape = this.#impl.of(2, `Infernape`)
  public static readonly Piplup = this.#impl.of(3, `Piplup`)
  public static readonly Prinplup = this.#impl.of(4, `Prinplup`)
  public static readonly Empoleon = this.#impl.of(5, `Empoleon`)
  public static readonly Starly = this.#impl.of(6, `Starly`)
  public static readonly Staravia = this.#impl.of(7, `Staravia`)
  public static readonly Staraptor = this.#impl.of(8, `Staraptor`)
  public static readonly Bidoof = this.#impl.of(9, `Bidoof`)
  public static readonly Bibarel = this.#impl.of(0, `Bibarel`)
  public static readonly Kricketot = this.#impl.of(1, `Kricketot`)
  public static readonly Kricketune = this.#impl.of(2, `Kricketune`)
  public static readonly Shinx = this.#impl.of(3, `Shinx`)
  public static readonly Luxio = this.#impl.of(4, `Luxio`)
  public static readonly Luxray = this.#impl.of(5, `Luxray`)
  public static readonly Budew = this.#impl.of(6, `Budew`)
  public static readonly Roserade = this.#impl.of(7, `Roserade`)
  public static readonly Cranidos = this.#impl.of(8, `Cranidos`)
  public static readonly Rampardos = this.#impl.of(9, `Rampardos`)
  public static readonly Shieldon = this.#impl.of(0, `Shieldon`)
  public static readonly Bastiodon = this.#impl.of(1, `Bastiodon`)
  public static readonly Burmy = this.#impl.of(2, `Burmy`)
  public static readonly Wormadam = this.#impl.of(3, `Wormadam`)
  public static readonly Mothim = this.#impl.of(4, `Mothim`)
  public static readonly Combee = this.#impl.of(5, `Combee`)
  public static readonly Vespiquen = this.#impl.of(6, `Vespiquen`)
  public static readonly Pachirisu = this.#impl.of(7, `Pachirisu`)
  public static readonly Buizel = this.#impl.of(8, `Buizel`)
  public static readonly Floatzel = this.#impl.of(9, `Floatzel`)
  public static readonly Cherubi = this.#impl.of(0, `Cherubi`)
  public static readonly Cherrim = this.#impl.of(1, `Cherrim`)
  public static readonly Shellos = this.#impl.of(2, `Shellos`)
  public static readonly Gastrodon = this.#impl.of(3, `Gastrodon`)
  public static readonly Ambipom = this.#impl.of(4, `Ambipom`)
  public static readonly Drifloon = this.#impl.of(5, `Drifloon`)
  public static readonly Drifblim = this.#impl.of(6, `Drifblim`)
  public static readonly Buneary = this.#impl.of(7, `Buneary`)
  public static readonly Lopunny = this.#impl.of(8, `Lopunny`)
  public static readonly Mismagius = this.#impl.of(9, `Mismagius`)
  public static readonly Honchkrow = this.#impl.of(0, `Honchkrow`)
  public static readonly Glameow = this.#impl.of(1, `Glameow`)
  public static readonly Purugly = this.#impl.of(2, `Purugly`)
  public static readonly Chingling = this.#impl.of(3, `Chingling`)
  public static readonly Stunky = this.#impl.of(4, `Stunky`)
  public static readonly Skuntank = this.#impl.of(5, `Skuntank`)
  public static readonly Bronzor = this.#impl.of(6, `Bronzor`)
  public static readonly Bronzong = this.#impl.of(7, `Bronzong`)
  public static readonly Bonsly = this.#impl.of(8, `Bonsly`)
  public static readonly MimeJr = this.#impl.of(9, `MimeJr`)
  public static readonly Happiny = this.#impl.of(0, `Happiny`)
  public static readonly Chatot = this.#impl.of(1, `Chatot`)
  public static readonly Spiritomb = this.#impl.of(2, `Spiritomb`)
  public static readonly Gible = this.#impl.of(3, `Gible`)
  public static readonly Gabite = this.#impl.of(4, `Gabite`)
  public static readonly Garchomp = this.#impl.of(5, `Garchomp`)
  public static readonly Munchlax = this.#impl.of(6, `Munchlax`)
  public static readonly Riolu = this.#impl.of(7, `Riolu`)
  public static readonly Lucario = this.#impl.of(8, `Lucario`)
  public static readonly Hippopotas = this.#impl.of(9, `Hippopotas`)
  public static readonly Hippowdon = this.#impl.of(0, `Hippowdon`)
  public static readonly Skorupi = this.#impl.of(1, `Skorupi`)
  public static readonly Drapion = this.#impl.of(2, `Drapion`)
  public static readonly Croagunk = this.#impl.of(3, `Croagunk`)
  public static readonly Toxicroak = this.#impl.of(4, `Toxicroak`)
  public static readonly Carnivine = this.#impl.of(5, `Carnivine`)
  public static readonly Finneon = this.#impl.of(6, `Finneon`)
  public static readonly Lumineon = this.#impl.of(7, `Lumineon`)
  public static readonly Mantyke = this.#impl.of(8, `Mantyke`)
  public static readonly Snover = this.#impl.of(9, `Snover`)
  public static readonly Abomasnow = this.#impl.of(0, `Abomasnow`)
  public static readonly Weavile = this.#impl.of(1, `Weavile`)
  public static readonly Magnezone = this.#impl.of(2, `Magnezone`)
  public static readonly Lickilicky = this.#impl.of(3, `Lickilicky`)
  public static readonly Rhyperior = this.#impl.of(4, `Rhyperior`)
  public static readonly Tangrowth = this.#impl.of(5, `Tangrowth`)
  public static readonly Electivire = this.#impl.of(6, `Electivire`)
  public static readonly Magmortar = this.#impl.of(7, `Magmortar`)
  public static readonly Togekiss = this.#impl.of(8, `Togekiss`)
  public static readonly Yanmega = this.#impl.of(9, `Yanmega`)
  public static readonly Leafeon = this.#impl.of(0, `Leafeon`)
  public static readonly Glaceon = this.#impl.of(1, `Glaceon`)
  public static readonly Gliscor = this.#impl.of(2, `Gliscor`)
  public static readonly Mamoswine = this.#impl.of(3, `Mamoswine`)
  public static readonly PorygonZ = this.#impl.of(4, `Porygon-Z`)
  public static readonly Gallade = this.#impl.of(5, `Gallade`)
  public static readonly Probopass = this.#impl.of(6, `Probopass`)
  public static readonly Dusknoir = this.#impl.of(7, `Dusknoir`)
  public static readonly Froslass = this.#impl.of(8, `Froslass`)
  public static readonly Rotom = this.#impl.of(9, `Rotom`)
  public static readonly Uxie = this.#impl.of(0, `Uxie`)
  public static readonly Mesprit = this.#impl.of(1, `Mesprit`)
  public static readonly Azelf = this.#impl.of(2, `Azelf`)
  public static readonly Dialga = this.#impl.of(3, `Dialga`)
  public static readonly Palkia = this.#impl.of(4, `Palkia`)
  public static readonly Heatran = this.#impl.of(5, `Heatran`)
  public static readonly Regigigas = this.#impl.of(6, `Regigigas`)
  public static readonly Giratina = this.#impl.of(7, `Giratina`)
  public static readonly Cresselia = this.#impl.of(8, `Cresselia`)
  public static readonly Phione = this.#impl.of(9, `Phione`)
  public static readonly Manaphy = this.#impl.of(0, `Manaphy`)
  public static readonly Darkrai = this.#impl.of(1, `Darkrai`)
  public static readonly Shaymin = this.#impl.of(2, `Shaymin`)
  public static readonly Arceus = this.#impl.of(3, `Arceus`)
  public static readonly Victini = this.#impl.of(4, `Victini`)
  public static readonly Snivy = this.#impl.of(5, `Snivy`)
  public static readonly Servine = this.#impl.of(6, `Servine`)
  public static readonly Serperior = this.#impl.of(7, `Serperior`)
  public static readonly Tepig = this.#impl.of(8, `Tepig`)
  public static readonly Pignite = this.#impl.of(9, `Pignite`)
  public static readonly Emboar = this.#impl.of(0, `Emboar`)
  public static readonly Oshawott = this.#impl.of(1, `Oshawott`)
  public static readonly Dewott = this.#impl.of(2, `Dewott`)
  public static readonly Samurott = this.#impl.of(3, `Samurott`)
  public static readonly Patrat = this.#impl.of(4, `Patrat`)
  public static readonly Watchog = this.#impl.of(5, `Watchog`)
  public static readonly Lillipup = this.#impl.of(6, `Lillipup`)
  public static readonly Herdier = this.#impl.of(7, `Herdier`)
  public static readonly Stoutland = this.#impl.of(8, `Stoutland`)
  public static readonly Purrloin = this.#impl.of(9, `Purrloin`)
  public static readonly Liepard = this.#impl.of(0, `Liepard`)
  public static readonly Pansage = this.#impl.of(1, `Pansage`)
  public static readonly Simisage = this.#impl.of(2, `Simisage`)
  public static readonly Pansear = this.#impl.of(3, `Pansear`)
  public static readonly Simisear = this.#impl.of(4, `Simisear`)
  public static readonly Panpour = this.#impl.of(5, `Panpour`)
  public static readonly Simipour = this.#impl.of(6, `Simipour`)
  public static readonly Munna = this.#impl.of(7, `Munna`)
  public static readonly Musharna = this.#impl.of(8, `Musharna`)
  public static readonly Pidove = this.#impl.of(9, `Pidove`)
  public static readonly Tranquill = this.#impl.of(0, `Tranquill`)
  public static readonly Unfezant = this.#impl.of(1, `Unfezant`)
  public static readonly Blitzle = this.#impl.of(2, `Blitzle`)
  public static readonly Zebstrika = this.#impl.of(3, `Zebstrika`)
  public static readonly Roggenrola = this.#impl.of(4, `Roggenrola`)
  public static readonly Boldore = this.#impl.of(5, `Boldore`)
  public static readonly Gigalith = this.#impl.of(6, `Gigalith`)
  public static readonly Woobat = this.#impl.of(7, `Woobat`)
  public static readonly Swoobat = this.#impl.of(8, `Swoobat`)
  public static readonly Drilbur = this.#impl.of(9, `Drilbur`)
  public static readonly Excadrill = this.#impl.of(0, `Excadrill`)
  public static readonly Audino = this.#impl.of(1, `Audino`)
  public static readonly Timburr = this.#impl.of(2, `Timburr`)
  public static readonly Gurdurr = this.#impl.of(3, `Gurdurr`)
  public static readonly Conkeldurr = this.#impl.of(4, `Conkeldurr`)
  public static readonly Tympole = this.#impl.of(5, `Tympole`)
  public static readonly Palpitoad = this.#impl.of(6, `Palpitoad`)
  public static readonly Seismitoad = this.#impl.of(7, `Seismitoad`)
  public static readonly Throh = this.#impl.of(8, `Throh`)
  public static readonly Sawk = this.#impl.of(9, `Sawk`)
  public static readonly Sewaddle = this.#impl.of(0, `Sewaddle`)
  public static readonly Swadloon = this.#impl.of(1, `Swadloon`)
  public static readonly Leavanny = this.#impl.of(2, `Leavanny`)
  public static readonly Venipede = this.#impl.of(3, `Venipede`)
  public static readonly Whirlipede = this.#impl.of(4, `Whirlipede`)
  public static readonly Scolipede = this.#impl.of(5, `Scolipede`)
  public static readonly Cottonee = this.#impl.of(6, `Cottonee`)
  public static readonly Whimsicott = this.#impl.of(7, `Whimsicott`)
  public static readonly Petilil = this.#impl.of(8, `Petilil`)
  public static readonly Lilligant = this.#impl.of(9, `Lilligant`)
  public static readonly Basculin = this.#impl.of(0, `Basculin`)
  public static readonly Sandile = this.#impl.of(1, `Sandile`)
  public static readonly Krokorok = this.#impl.of(2, `Krokorok`)
  public static readonly Krookodile = this.#impl.of(3, `Krookodile`)
  public static readonly Darumaka = this.#impl.of(4, `Darumaka`)
  public static readonly Darmanitan = this.#impl.of(5, `Darmanitan`)
  public static readonly Maractus = this.#impl.of(6, `Maractus`)
  public static readonly Dwebble = this.#impl.of(7, `Dwebble`)
  public static readonly Crustle = this.#impl.of(8, `Crustle`)
  public static readonly Scraggy = this.#impl.of(9, `Scraggy`)
  public static readonly Scrafty = this.#impl.of(0, `Scrafty`)
  public static readonly Sigilyph = this.#impl.of(1, `Sigilyph`)
  public static readonly Yamask = this.#impl.of(2, `Yamask`)
  public static readonly Cofagrigus = this.#impl.of(3, `Cofagrigus`)
  public static readonly Tirtouga = this.#impl.of(4, `Tirtouga`)
  public static readonly Carracosta = this.#impl.of(5, `Carracosta`)
  public static readonly Archen = this.#impl.of(6, `Archen`)
  public static readonly Archeops = this.#impl.of(7, `Archeops`)
  public static readonly Trubbish = this.#impl.of(8, `Trubbish`)
  public static readonly Garbodor = this.#impl.of(9, `Garbodor`)
  public static readonly Zorua = this.#impl.of(0, `Zorua`)
  public static readonly Zoroark = this.#impl.of(1, `Zoroark`)
  public static readonly Minccino = this.#impl.of(2, `Minccino`)
  public static readonly Cinccino = this.#impl.of(3, `Cinccino`)
  public static readonly Gothita = this.#impl.of(4, `Gothita`)
  public static readonly Gothorita = this.#impl.of(5, `Gothorita`)
  public static readonly Gothitelle = this.#impl.of(6, `Gothitelle`)
  public static readonly Solosis = this.#impl.of(7, `Solosis`)
  public static readonly Duosion = this.#impl.of(8, `Duosion`)
  public static readonly Reuniclus = this.#impl.of(9, `Reuniclus`)
  public static readonly Ducklett = this.#impl.of(0, `Ducklett`)
  public static readonly Swanna = this.#impl.of(1, `Swanna`)
  public static readonly Vanillite = this.#impl.of(2, `Vanillite`)
  public static readonly Vanillish = this.#impl.of(3, `Vanillish`)
  public static readonly Vanilluxe = this.#impl.of(4, `Vanilluxe`)
  public static readonly Deerling = this.#impl.of(5, `Deerling`)
  public static readonly Sawsbuck = this.#impl.of(6, `Sawsbuck`)
  public static readonly Emolga = this.#impl.of(7, `Emolga`)
  public static readonly Karrablast = this.#impl.of(8, `Karrablast`)
  public static readonly Escavalier = this.#impl.of(9, `Escavalier`)
  public static readonly Foongus = this.#impl.of(0, `Foongus`)
  public static readonly Amoonguss = this.#impl.of(1, `Amoonguss`)
  public static readonly Frillish = this.#impl.of(2, `Frillish`)
  public static readonly Jellicent = this.#impl.of(3, `Jellicent`)
  public static readonly Alomomola = this.#impl.of(4, `Alomomola`)
  public static readonly Joltik = this.#impl.of(5, `Joltik`)
  public static readonly Galvantula = this.#impl.of(6, `Galvantula`)
  public static readonly Ferroseed = this.#impl.of(7, `Ferroseed`)
  public static readonly Ferrothorn = this.#impl.of(8, `Ferrothorn`)
  public static readonly Klink = this.#impl.of(9, `Klink`)
  public static readonly Klang = this.#impl.of(0, `Klang`)
  public static readonly Klinklang = this.#impl.of(1, `Klinklang`)
  public static readonly Tynamo = this.#impl.of(2, `Tynamo`)
  public static readonly Eelektrik = this.#impl.of(3, `Eelektrik`)
  public static readonly Eelektross = this.#impl.of(4, `Eelektross`)
  public static readonly Elgyem = this.#impl.of(5, `Elgyem`)
  public static readonly Beheeyem = this.#impl.of(6, `Beheeyem`)
  public static readonly Litwick = this.#impl.of(7, `Litwick`)
  public static readonly Lampent = this.#impl.of(8, `Lampent`)
  public static readonly Chandelure = this.#impl.of(9, `Chandelure`)
  public static readonly Axew = this.#impl.of(0, `Axew`)
  public static readonly Fraxure = this.#impl.of(1, `Fraxure`)
  public static readonly Haxorus = this.#impl.of(2, `Haxorus`)
  public static readonly Cubchoo = this.#impl.of(3, `Cubchoo`)
  public static readonly Beartic = this.#impl.of(4, `Beartic`)
  public static readonly Cryogonal = this.#impl.of(5, `Cryogonal`)
  public static readonly Shelmet = this.#impl.of(6, `Shelmet`)
  public static readonly Accelgor = this.#impl.of(7, `Accelgor`)
  public static readonly Stunfisk = this.#impl.of(8, `Stunfisk`)
  public static readonly Mienfoo = this.#impl.of(9, `Mienfoo`)
  public static readonly Mienshao = this.#impl.of(0, `Mienshao`)
  public static readonly Druddigon = this.#impl.of(1, `Druddigon`)
  public static readonly Golett = this.#impl.of(2, `Golett`)
  public static readonly Golurk = this.#impl.of(3, `Golurk`)
  public static readonly Pawniard = this.#impl.of(4, `Pawniard`)
  public static readonly Bisharp = this.#impl.of(5, `Bisharp`)
  public static readonly Bouffalant = this.#impl.of(6, `Bouffalant`)
  public static readonly Rufflet = this.#impl.of(7, `Rufflet`)
  public static readonly Braviary = this.#impl.of(8, `Braviary`)
  public static readonly Vullaby = this.#impl.of(9, `Vullaby`)
  public static readonly Mandibuzz = this.#impl.of(0, `Mandibuzz`)
  public static readonly Heatmor = this.#impl.of(1, `Heatmor`)
  public static readonly Durant = this.#impl.of(2, `Durant`)
  public static readonly Deino = this.#impl.of(3, `Deino`)
  public static readonly Zweilous = this.#impl.of(4, `Zweilous`)
  public static readonly Hydreigon = this.#impl.of(5, `Hydreigon`)
  public static readonly Larvesta = this.#impl.of(6, `Larvesta`)
  public static readonly Volcarona = this.#impl.of(7, `Volcarona`)
  public static readonly Cobalion = this.#impl.of(8, `Cobalion`)
  public static readonly Terrakion = this.#impl.of(9, `Terrakion`)
  public static readonly Virizion = this.#impl.of(0, `Virizion`)
  public static readonly Tornadus = this.#impl.of(1, `Tornadus`)
  public static readonly Thundurus = this.#impl.of(2, `Thundurus`)
  public static readonly Reshiram = this.#impl.of(3, `Reshiram`)
  public static readonly Zekrom = this.#impl.of(4, `Zekrom`)
  public static readonly Landorus = this.#impl.of(5, `Landorus`)
  public static readonly Kyurem = this.#impl.of(6, `Kyurem`)
  public static readonly Keldeo = this.#impl.of(7, `Keldeo`)
  public static readonly Meloetta = this.#impl.of(8, `Meloetta`)
  public static readonly Genesect = this.#impl.of(9, `Genesect`)
  public static readonly Chespin = this.#impl.of(0, `Chespin`)
  public static readonly Quilladin = this.#impl.of(1, `Quilladin`)
  public static readonly Chesnaught = this.#impl.of(2, `Chesnaught`)
  public static readonly Fennekin = this.#impl.of(3, `Fennekin`)
  public static readonly Braixen = this.#impl.of(4, `Braixen`)
  public static readonly Delphox = this.#impl.of(5, `Delphox`)
  public static readonly Froakie = this.#impl.of(6, `Froakie`)
  public static readonly Frogadier = this.#impl.of(7, `Frogadier`)
  public static readonly Greninja = this.#impl.of(8, `Greninja`)
  public static readonly Bunnelby = this.#impl.of(9, `Bunnelby`)
  public static readonly Diggersby = this.#impl.of(0, `Diggersby`)
  public static readonly Fletchling = this.#impl.of(1, `Fletchling`)
  public static readonly Fletchinder = this.#impl.of(2, `Fletchinder`)
  public static readonly Talonflame = this.#impl.of(3, `Talonflame`)
  public static readonly Scatterbug = this.#impl.of(4, `Scatterbug`)
  public static readonly Spewpa = this.#impl.of(5, `Spewpa`)
  public static readonly Vivillon = this.#impl.of(6, `Vivillon`)
  public static readonly Litleo = this.#impl.of(7, `Litleo`)
  public static readonly Pyroar = this.#impl.of(8, `Pyroar`)
  public static readonly Flabebe = this.#impl.of(9, `Flabebe`)
  public static readonly Floette = this.#impl.of(0, `Floette`)
  public static readonly Florges = this.#impl.of(1, `Florges`)
  public static readonly Skiddo = this.#impl.of(2, `Skiddo`)
  public static readonly Gogoat = this.#impl.of(3, `Gogoat`)
  public static readonly Pancham = this.#impl.of(4, `Pancham`)
  public static readonly Pangoro = this.#impl.of(5, `Pangoro`)
  public static readonly Furfrou = this.#impl.of(6, `Furfrou`)
  public static readonly Espurr = this.#impl.of(7, `Espurr`)
  public static readonly Meowstic = this.#impl.of(8, `Meowstic`)
  public static readonly Honedge = this.#impl.of(9, `Honedge`)
  public static readonly Doublade = this.#impl.of(0, `Doublade`)
  public static readonly Aegislash = this.#impl.of(1, `Aegislash`)
  public static readonly Spritzee = this.#impl.of(2, `Spritzee`)
  public static readonly Aromatisse = this.#impl.of(3, `Aromatisse`)
  public static readonly Swirlix = this.#impl.of(4, `Swirlix`)
  public static readonly Slurpuff = this.#impl.of(5, `Slurpuff`)
  public static readonly Inkay = this.#impl.of(6, `Inkay`)
  public static readonly Malamar = this.#impl.of(7, `Malamar`)
  public static readonly Binacle = this.#impl.of(8, `Binacle`)
  public static readonly Barbaracle = this.#impl.of(9, `Barbaracle`)
  public static readonly Skrelp = this.#impl.of(0, `Skrelp`)
  public static readonly Dragalge = this.#impl.of(1, `Dragalge`)
  public static readonly Clauncher = this.#impl.of(2, `Clauncher`)
  public static readonly Clawitzer = this.#impl.of(3, `Clawitzer`)
  public static readonly Helioptile = this.#impl.of(4, `Helioptile`)
  public static readonly Heliolisk = this.#impl.of(5, `Heliolisk`)
  public static readonly Tyrunt = this.#impl.of(6, `Tyrunt`)
  public static readonly Tyrantrum = this.#impl.of(7, `Tyrantrum`)
  public static readonly Amaura = this.#impl.of(8, `Amaura`)
  public static readonly Aurorus = this.#impl.of(9, `Aurorus`)
  public static readonly Sylveon = this.#impl.of(0, `Sylveon`)
  public static readonly Hawlucha = this.#impl.of(1, `Hawlucha`)
  public static readonly Dedenne = this.#impl.of(2, `Dedenne`)
  public static readonly Carbink = this.#impl.of(3, `Carbink`)
  public static readonly Goomy = this.#impl.of(4, `Goomy`)
  public static readonly Sliggoo = this.#impl.of(5, `Sliggoo`)
  public static readonly Goodra = this.#impl.of(6, `Goodra`)
  public static readonly Klefki = this.#impl.of(7, `Klefki`)
  public static readonly Phantump = this.#impl.of(8, `Phantump`)
  public static readonly Trevenant = this.#impl.of(9, `Trevenant`)
  public static readonly Pumpkaboo = this.#impl.of(0, `Pumpkaboo`)
  public static readonly Gourgeist = this.#impl.of(1, `Gourgeist`)
  public static readonly Bergmite = this.#impl.of(2, `Bergmite`)
  public static readonly Avalugg = this.#impl.of(3, `Avalugg`)
  public static readonly Noibat = this.#impl.of(4, `Noibat`)
  public static readonly Noivern = this.#impl.of(5, `Noivern`)
  public static readonly Xerneas = this.#impl.of(6, `Xerneas`)
  public static readonly Yveltal = this.#impl.of(7, `Yveltal`)
  public static readonly Zygarde = this.#impl.of(8, `Zygarde`)
  public static readonly Diancie = this.#impl.of(9, `Diancie`)
  public static readonly Hoopa = this.#impl.of(0, `Hoopa`)
  public static readonly Volcanion = this.#impl.of(1, `Volcanion`)
  public static readonly Rowlet = this.#impl.of(2, `Rowlet`)
  public static readonly Dartrix = this.#impl.of(3, `Dartrix`)
  public static readonly Decidueye = this.#impl.of(4, `Decidueye`)
  public static readonly Litten = this.#impl.of(5, `Litten`)
  public static readonly Torracat = this.#impl.of(6, `Torracat`)
  public static readonly Incineroar = this.#impl.of(7, `Incineroar`)
  public static readonly Popplio = this.#impl.of(8, `Popplio`)
  public static readonly Brionne = this.#impl.of(9, `Brionne`)
  public static readonly Primarina = this.#impl.of(0, `Primarina`)
  public static readonly Pikipek = this.#impl.of(1, `Pikipek`)
  public static readonly Trumbeak = this.#impl.of(2, `Trumbeak`)
  public static readonly Toucannon = this.#impl.of(3, `Toucannon`)
  public static readonly Yungoos = this.#impl.of(4, `Yungoos`)
  public static readonly Gumshoos = this.#impl.of(5, `Gumshoos`)
  public static readonly Grubbin = this.#impl.of(6, `Grubbin`)
  public static readonly Charjabug = this.#impl.of(7, `Charjabug`)
  public static readonly Vikavolt = this.#impl.of(8, `Vikavolt`)
  public static readonly Crabrawler = this.#impl.of(9, `Crabrawler`)
  public static readonly Crabominable = this.#impl.of(0, `Crabominable`)
  public static readonly Oricorio = this.#impl.of(1, `Oricorio`)
  public static readonly Cutiefly = this.#impl.of(2, `Cutiefly`)
  public static readonly Ribombee = this.#impl.of(3, `Ribombee`)
  public static readonly Rockruff = this.#impl.of(4, `Rockruff`)
  public static readonly Lycanroc = this.#impl.of(5, `Lycanroc`)
  public static readonly Wishiwashi = this.#impl.of(6, `Wishiwashi`)
  public static readonly Mareanie = this.#impl.of(7, `Mareanie`)
  public static readonly Toxapex = this.#impl.of(8, `Toxapex`)
  public static readonly Mudbray = this.#impl.of(9, `Mudbray`)
  public static readonly Mudsdale = this.#impl.of(0, `Mudsdale`)
  public static readonly Dewpider = this.#impl.of(1, `Dewpider`)
  public static readonly Araquanid = this.#impl.of(2, `Araquanid`)
  public static readonly Fomantis = this.#impl.of(3, `Fomantis`)
  public static readonly Lurantis = this.#impl.of(4, `Lurantis`)
  public static readonly Morelull = this.#impl.of(5, `Morelull`)
  public static readonly Shiinotic = this.#impl.of(6, `Shiinotic`)
  public static readonly Salandit = this.#impl.of(7, `Salandit`)
  public static readonly Salazzle = this.#impl.of(8, `Salazzle`)
  public static readonly Stufful = this.#impl.of(9, `Stufful`)
  public static readonly Bewear = this.#impl.of(0, `Bewear`)
  public static readonly Bounsweet = this.#impl.of(1, `Bounsweet`)
  public static readonly Steenee = this.#impl.of(2, `Steenee`)
  public static readonly Tsareena = this.#impl.of(3, `Tsareena`)
  public static readonly Comfey = this.#impl.of(4, `Comfey`)
  public static readonly Oranguru = this.#impl.of(5, `Oranguru`)
  public static readonly Passimian = this.#impl.of(6, `Passimian`)
  public static readonly Wimpod = this.#impl.of(7, `Wimpod`)
  public static readonly Golisopod = this.#impl.of(8, `Golisopod`)
  public static readonly Sandygast = this.#impl.of(9, `Sandygast`)
  public static readonly Palossand = this.#impl.of(0, `Palossand`)
  public static readonly Pyukumuku = this.#impl.of(1, `Pyukumuku`)
  public static readonly TypeNull = this.#impl.of(2, `TypeNull`)
  public static readonly Silvally = this.#impl.of(3, `Silvally`)
  public static readonly Minior = this.#impl.of(4, `Minior`)
  public static readonly Komala = this.#impl.of(5, `Komala`)
  public static readonly Turtonator = this.#impl.of(6, `Turtonator`)
  public static readonly Togedemaru = this.#impl.of(7, `Togedemaru`)
  public static readonly Mimikyu = this.#impl.of(8, `Mimikyu`)
  public static readonly Bruxish = this.#impl.of(9, `Bruxish`)
  public static readonly Drampa = this.#impl.of(0, `Drampa`)
  public static readonly Dhelmise = this.#impl.of(1, `Dhelmise`)
  public static readonly Jangmoo = this.#impl.of(2, `Jangmo-o`)
  public static readonly Hakamoo = this.#impl.of(3, `Hakamo-o`)
  public static readonly Kommoo = this.#impl.of(4, `Kommo-o`)
  public static readonly TapuKoko = this.#impl.of(5, `TapuKoko`)
  public static readonly TapuLele = this.#impl.of(6, `TapuLele`)
  public static readonly TapuBulu = this.#impl.of(7, `TapuBulu`)
  public static readonly TapuFini = this.#impl.of(8, `TapuFini`)
  public static readonly Cosmog = this.#impl.of(9, `Cosmog`)
  public static readonly Cosmoem = this.#impl.of(0, `Cosmoem`)
  public static readonly Solgaleo = this.#impl.of(1, `Solgaleo`)
  public static readonly Lunala = this.#impl.of(2, `Lunala`)
  public static readonly Nihilego = this.#impl.of(3, `Nihilego`)
  public static readonly Buzzwole = this.#impl.of(4, `Buzzwole`)
  public static readonly Pheromosa = this.#impl.of(5, `Pheromosa`)
  public static readonly Xurkitree = this.#impl.of(6, `Xurkitree`)
  public static readonly Celesteela = this.#impl.of(7, `Celesteela`)
  public static readonly Kartana = this.#impl.of(8, `Kartana`)
  public static readonly Guzzlord = this.#impl.of(9, `Guzzlord`)
  public static readonly Necrozma = this.#impl.of(0, `Necrozma`)
  public static readonly Magearna = this.#impl.of(1, `Magearna`)
  public static readonly Marshadow = this.#impl.of(2, `Marshadow`)
  public static readonly Poipole = this.#impl.of(3, `Poipole`)
  public static readonly Naganadel = this.#impl.of(4, `Naganadel`)
  public static readonly Stakataka = this.#impl.of(5, `Stakataka`)
  public static readonly Blacephalon = this.#impl.of(6, `Blacephalon`)
  public static readonly Zeraora = this.#impl.of(7, `Zeraora`)
  public static readonly Meltan = this.#impl.of(8, `Meltan`)
  public static readonly Melmetal = this.#impl.of(9, `Melmetal`)
  public static readonly Grookey = this.#impl.of(0, `Grookey`)
  public static readonly Thwackey = this.#impl.of(1, `Thwackey`)
  public static readonly Rillaboom = this.#impl.of(2, `Rillaboom`)
  public static readonly Scorbunny = this.#impl.of(3, `Scorbunny`)
  public static readonly Raboot = this.#impl.of(4, `Raboot`)
  public static readonly Cinderace = this.#impl.of(5, `Cinderace`)
  public static readonly Sobble = this.#impl.of(6, `Sobble`)
  public static readonly Drizzile = this.#impl.of(7, `Drizzile`)
  public static readonly Inteleon = this.#impl.of(8, `Inteleon`)
  public static readonly Skwovet = this.#impl.of(9, `Skwovet`)
  public static readonly Greedent = this.#impl.of(0, `Greedent`)
  public static readonly Rookidee = this.#impl.of(1, `Rookidee`)
  public static readonly Corvisquire = this.#impl.of(2, `Corvisquire`)
  public static readonly Corviknight = this.#impl.of(3, `Corviknight`)
  public static readonly Blipbug = this.#impl.of(4, `Blipbug`)
  public static readonly Dottler = this.#impl.of(5, `Dottler`)
  public static readonly Orbeetle = this.#impl.of(6, `Orbeetle`)
  public static readonly Nickit = this.#impl.of(7, `Nickit`)
  public static readonly Thievul = this.#impl.of(8, `Thievul`)
  public static readonly Gossifleur = this.#impl.of(9, `Gossifleur`)
  public static readonly Eldegoss = this.#impl.of(0, `Eldegoss`)
  public static readonly Wooloo = this.#impl.of(1, `Wooloo`)
  public static readonly Dubwool = this.#impl.of(2, `Dubwool`)
  public static readonly Chewtle = this.#impl.of(3, `Chewtle`)
  public static readonly Drednaw = this.#impl.of(4, `Drednaw`)
  public static readonly Yamper = this.#impl.of(5, `Yamper`)
  public static readonly Boltund = this.#impl.of(6, `Boltund`)
  public static readonly Rolycoly = this.#impl.of(7, `Rolycoly`)
  public static readonly Carkol = this.#impl.of(8, `Carkol`)
  public static readonly Coalossal = this.#impl.of(9, `Coalossal`)
  public static readonly Applin = this.#impl.of(0, `Applin`)
  public static readonly Flapple = this.#impl.of(1, `Flapple`)
  public static readonly Appletun = this.#impl.of(2, `Appletun`)
  public static readonly Silicobra = this.#impl.of(3, `Silicobra`)
  public static readonly Sandaconda = this.#impl.of(4, `Sandaconda`)
  public static readonly Cramorant = this.#impl.of(5, `Cramorant`)
  public static readonly Arrokuda = this.#impl.of(6, `Arrokuda`)
  public static readonly Barraskewda = this.#impl.of(7, `Barraskewda`)
  public static readonly Toxel = this.#impl.of(8, `Toxel`)
  public static readonly Toxtricity = this.#impl.of(9, `Toxtricity`)
  public static readonly Sizzlipede = this.#impl.of(0, `Sizzlipede`)
  public static readonly Centiskorch = this.#impl.of(1, `Centiskorch`)
  public static readonly Clobbopus = this.#impl.of(2, `Clobbopus`)
  public static readonly Grapploct = this.#impl.of(3, `Grapploct`)
  public static readonly Sinistea = this.#impl.of(4, `Sinistea`)
  public static readonly Polteageist = this.#impl.of(5, `Polteageist`)
  public static readonly Hatenna = this.#impl.of(6, `Hatenna`)
  public static readonly Hattrem = this.#impl.of(7, `Hattrem`)
  public static readonly Hatterene = this.#impl.of(8, `Hatterene`)
  public static readonly Impidimp = this.#impl.of(9, `Impidimp`)
  public static readonly Morgrem = this.#impl.of(0, `Morgrem`)
  public static readonly Grimmsnarl = this.#impl.of(1, `Grimmsnarl`)
  public static readonly Obstagoon = this.#impl.of(2, `Obstagoon`)
  public static readonly Perrserker = this.#impl.of(3, `Perrserker`)
  public static readonly Cursola = this.#impl.of(4, `Cursola`)
  public static readonly Sirfetchd = this.#impl.of(5, `Sirfetchd`)
  public static readonly MrRime = this.#impl.of(6, `MrRime`)
  public static readonly Runerigus = this.#impl.of(7, `Runerigus`)
  public static readonly Milcery = this.#impl.of(8, `Milcery`)
  public static readonly Alcremie = this.#impl.of(9, `Alcremie`)
  public static readonly Falinks = this.#impl.of(0, `Falinks`)
  public static readonly Pincurchin = this.#impl.of(1, `Pincurchin`)
  public static readonly Snom = this.#impl.of(2, `Snom`)
  public static readonly Frosmoth = this.#impl.of(3, `Frosmoth`)
  public static readonly Stonjourner = this.#impl.of(4, `Stonjourner`)
  public static readonly Eiscue = this.#impl.of(5, `Eiscue`)
  public static readonly Indeedee = this.#impl.of(6, `Indeedee`)
  public static readonly Morpeko = this.#impl.of(7, `Morpeko`)
  public static readonly Cufant = this.#impl.of(8, `Cufant`)
  public static readonly Copperajah = this.#impl.of(9, `Copperajah`)
  public static readonly Dracozolt = this.#impl.of(0, `Dracozolt`)
  public static readonly Arctozolt = this.#impl.of(1, `Arctozolt`)
  public static readonly Dracovish = this.#impl.of(2, `Dracovish`)
  public static readonly Arctovish = this.#impl.of(3, `Arctovish`)
  public static readonly Duraludon = this.#impl.of(4, `Duraludon`)
  public static readonly Dreepy = this.#impl.of(5, `Dreepy`)
  public static readonly Drakloak = this.#impl.of(6, `Drakloak`)
  public static readonly Dragapult = this.#impl.of(7, `Dragapult`)
  public static readonly Zacian = this.#impl.of(8, `Zacian`)
  public static readonly Zamazenta = this.#impl.of(9, `Zamazenta`)
  public static readonly Eternatus = this.#impl.of(0, `Eternatus`)
  public static readonly Kubfu = this.#impl.of(1, `Kubfu`)
  public static readonly Urshifu = this.#impl.of(2, `Urshifu`)
  public static readonly Zarude = this.#impl.of(3, `Zarude`)
  public static readonly Regieleki = this.#impl.of(4, `Regieleki`)
  public static readonly Regidrago = this.#impl.of(5, `Regidrago`)
  public static readonly Glastrier = this.#impl.of(6, `Glastrier`)
  public static readonly Spectrier = this.#impl.of(7, `Spectrier`)
  public static readonly Calyrex = this.#impl.of(8, `Calyrex`)
  public static readonly Wyrdeer = this.#impl.of(9, `Wyrdeer`)
  /* eslint-enable @typescript-eslint/member-ordering */

  /**
   * Gets the immutable set of species that are considered legendary.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered legendary
   */
  public static getLegendaries(): ReadonlySet<Species> {
    return new Set(Species.#impl.legendaries)
  }

  /**
   * Gets the immutable set of species that are considered ultrabeasts.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered ultrabeast
   */
  public static getUltrabeasts(): ReadonlySet<Species> {
    return new Set(Species.#impl.ultrabeasts)
  }

  /**
   * Gets the readonly set of all the pokemon species.
   *
   * @returns {ReadonlySet<Species>} The readonly set of all the pokemon species
   */
  public static getAllPokemons(): ReadonlySet<Species> {
    return new Set(Species.#impl.allPokemons)
  }

  public static values(): ReadonlySet<Species> {
    return this.getAllPokemons()
  }

  /**
   * Returns whether the given name is a valid Pokemon name.
   *
   * @param {string} name The name of the Pokemon to check
   * @returns {boolean} Whether the given name is a valid species name
   */
  public static has(name: string): boolean {
    return Species.getFromName(name) !== null
  }

  /**
   * Gets the corresponding species with the given name.
   *
   * @param {string} name The name of the Pokemon to get
   * @returns {Species | null} The species that matches the given name, or null if no such species exists.
   * @see {@link has has()}
   */
  public static getFromName(name: string): Species | null {
    for (const pokemon of Species.#impl.allPokemons) {
      if (
        pokemon.getName().toLowerCase() === name.toLowerCase() ||
        pokemon.getLocalizedName().toLowerCase() === name.toLowerCase()
      )
        return pokemon
    }

    return null
  }

  /**
   * Gets the corresponding species with the given pokedex.
   *
   * @param {number | string} dex - The pokedex number of the pokemon.
   * @returns {Species | null} The species that matches the given pokedex, or null if no such species exists.
   */
  public static getFromDex(dex: number | string): Species | null {
    for (const species of Species.#impl.allPokemons) {
      if (
        (typeof dex === `number` &&
          species.getNationalPokedex().asNumber() === dex) ||
        (typeof dex === `string` &&
          species.getNationalPokedex().asString() === dex)
      ) {
        return species
      }
    }

    return null
  }

  /**
   * Returns whether the species is a legendary pokemon.
   *
   * @returns {boolean} Whether the species is a legendary pokemon or not
   */
  public abstract isLegendary(): boolean

  /**
   * Returns whether the species is a ultrabeast.
   *
   * @returns {boolean} Whether the species is a ultrabeast or not
   */
  public abstract isUltraBeast(): boolean

  /**
   * Gets the name of the species.
   *
   * @returns {string} The name of the species
   */
  public abstract getName(): string

  /**
   * Gets the localized name of the species.
   *
   * @returns {string} The localized name of the species
   */
  public abstract getLocalizedName(): string

  /**
   * Gets the localization key of the species.
   *
   * @returns {string} The localization key of the species
   */
  public abstract getLocalizationKey(): string

  /**
   * Gets the Pokedex wrapper of the species.
   *
   * <p>
   *   It returns a wrapper around the national pokedex number of the species,
   *   which could be used to get the national pokedex number as a string with
   *   3 digits, or as a number.
   * </p>
   *
   * @returns {{ asNumber(): number, asString(): string }} The Pokedex wrapper of the species
   */
  public abstract getNationalPokedex(): {
    asNumber(): number
    asString(): string
  }

  /**
   * Indicates whether some other object is equal to this one.
   *
   * <pre>
   *   This method takes one parameter, `other`, which is the EnumSpecies
   *   to compare to. It returns `true` if the other object is an instance
   *   of EnumSpecies or has the same national dex number and name as this one.
   *   Otherwise, it returns `false`.
   *
   *   This method is strongly inspired by the `equals` method of the Java Object class.
   * </pre>
   *
   * @param {Species} other The reference object with which to compare
   * @returns {boolean} `true` if this object is the same as the other object, `false` otherwise
   */
  public abstract equals(other: any): boolean

  static {
    const legendaries = [
      Species.MissingNo,

      /** Generation 1 */
      Species.Articuno,
      Species.Zapdos,
      Species.Moltres,
      Species.Mewtwo,
      Species.Mew,

      /** Generation 2 */
      Species.Raikou,
      Species.Entei,
      Species.Suicune,
      Species.Lugia,
      Species.Hooh,
      Species.Celebi,

      /** Generation 3 */
      Species.Regirock,
      Species.Regice,
      Species.Registeel,
      Species.Latias,
      Species.Latios,
      Species.Kyogre,
      Species.Groudon,
      Species.Rayquaza,
      Species.Jirachi,

      /** Generation 4 */
      Species.Uxie,
      Species.Mesprit,
      Species.Azelf,
      Species.Dialga,
      Species.Palkia,
      Species.Heatran,
      Species.Regigigas,
      Species.Giratina,

      /** Generation 5 */
      Species.Cobalion,
      Species.Terrakion,
      Species.Virizion,
      Species.Tornadus,
      Species.Thundurus,
      Species.Landorus,

      /** Generation 6 */
      Species.Xerneas,
      Species.Yveltal,
      Species.Zygarde,
      Species.Diancie,
      Species.Hoopa,
      Species.Volcanion,

      /** Generation 7 */
      Species.TypeNull,
      Species.Silvally,
      Species.TapuKoko,
      Species.TapuLele,
      Species.TapuBulu,
      Species.TapuFini,
      Species.Cosmog,
      Species.Cosmoem,
      Species.Solgaleo,
      Species.Lunala,
      Species.Necrozma,
      Species.Marshadow,
      Species.Magearna,
      Species.Zeraora,
      Species.Meltan,
      Species.Melmetal,

      /** Generation 8 */
      Species.Zacian,
      Species.Zamazenta,
      Species.Eternatus,
      Species.Kubfu,
      Species.Urshifu,
      Species.Zarude,
      Species.Regieleki,
      Species.Regidrago,
      Species.Glastrier,
      Species.Spectrier,
      Species.Calyrex
    ]

    const ultrabests = [
      Species.Blacephalon,
      Species.Buzzwole,
      Species.Celesteela,
      Species.Guzzlord,
      Species.Poipole,
      Species.Naganadel,
      Species.Nihilego,
      Species.Pheromosa,
      Species.Kartana,
      Species.Stakataka,
      Species.Xurkitree
    ]

    legendaries.forEach(
      Species.#impl.legendaries.add,
      Species.#impl.legendaries
    )
    ultrabests.forEach(Species.#impl.ultrabeasts.add, Species.#impl.ultrabeasts)
  }
}
