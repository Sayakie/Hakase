import {
  type Comparable,
  type Translatable,
  Translation,
  Util
} from '../index.js'

export abstract class Species implements Comparable, Translatable {
  static readonly #impl = class SpeciesImpl extends Species {
    public static readonly legendaries: Set<Species> = new Set()
    public static readonly ultrabeasts: Set<Species> = new Set()
    public static readonly allPokemons: Set<Species> = new Set()

    private constructor(
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

    public override isLegendary(): boolean {
      return Species.#impl.legendaries.has(this)
    }

    public override isUltraBeast(): boolean {
      return Species.#impl.ultrabeasts.has(this)
    }

    public override getName(): string {
      return this.name
    }

    public override getTranslation(): Translation {
      const id = `Pixelmon:${this.name.toLowerCase()}.name`

      return Translation.of(id)
    }

    public override getNationalPokedex(): {
      asNumber(): number
      asString(): string
    } {
      return {
        asNumber: () => this.dex,
        asString: () => String(this.dex).padStart(3, `0`),
        toString: () => String(this.dex).padStart(3, `0`),
        valueOf: () => this.dex
      } as ReturnType<Species[`getNationalPokedex`]>
    }

    public override equals(other: Species): boolean {
      if (this === other) return true
      return (
        this.name === other.getName() &&
        this.dex === other.getNationalPokedex().asNumber()
      )
    }

    public override valueOf(): number {
      return this.dex
    }

    public override toString(): string {
      return Util.toStringHelper(this)
        .add(`nationalDex`, this.dex)
        .add(`name`, this.name)
        .toString()
    }
  }

  public static readonly MissingNo = Species.#impl.of(0, `MissingNo`)

  /**
   * Generation I Pokémon species. (1-151)
   */
  public static readonly Bulbasaur = Species.#impl.of(1, `Bulbasaur`)
  public static readonly Ivysaur = Species.#impl.of(2, `Ivysaur`)
  public static readonly Venusaur = Species.#impl.of(3, `Venusaur`)
  public static readonly Charmander = Species.#impl.of(4, `Charmander`)
  public static readonly Charmeleon = Species.#impl.of(5, `Charmeleon`)
  public static readonly Charizard = Species.#impl.of(6, `Charizard`)
  public static readonly Squirtle = Species.#impl.of(7, `Squirtle`)
  public static readonly Wartortle = Species.#impl.of(8, `Wartortle`)
  public static readonly Blastoise = Species.#impl.of(9, `Blastoise`)
  public static readonly Caterpie = Species.#impl.of(10, `Caterpie`)
  public static readonly Metapod = Species.#impl.of(11, `Metapod`)
  public static readonly Butterfree = Species.#impl.of(12, `Butterfree`)
  public static readonly Weedle = Species.#impl.of(13, `Weedle`)
  public static readonly Kakuna = Species.#impl.of(14, `Kakuna`)
  public static readonly Beedrill = Species.#impl.of(15, `Beedrill`)
  public static readonly Pidgey = Species.#impl.of(16, `Pidgey`)
  public static readonly Pidgeotto = Species.#impl.of(17, `Pidgeotto`)
  public static readonly Pidgeot = Species.#impl.of(18, `Pidgeot`)
  public static readonly Rattata = Species.#impl.of(19, `Rattata`)
  public static readonly Raticate = Species.#impl.of(20, `Raticate`)
  public static readonly Spearow = Species.#impl.of(21, `Spearow`)
  public static readonly Fearow = Species.#impl.of(22, `Fearow`)
  public static readonly Ekans = Species.#impl.of(23, `Ekans`)
  public static readonly Arbok = Species.#impl.of(24, `Arbok`)
  public static readonly Pikachu = Species.#impl.of(25, `Pikachu`)
  public static readonly Raichu = Species.#impl.of(26, `Raichu`)
  public static readonly Sandshrew = Species.#impl.of(27, `Sandshrew`)
  public static readonly Sandslash = Species.#impl.of(28, `Sandslash`)
  public static readonly Nidoranfemale = Species.#impl.of(29, `Nidoranfemale`)
  public static readonly Nidorina = Species.#impl.of(30, `Nidorina`)
  public static readonly Nidoqueen = Species.#impl.of(31, `Nidoqueen`)
  public static readonly Nidoranmale = Species.#impl.of(32, `Nidoranmale`)
  public static readonly Nidorino = Species.#impl.of(33, `Nidorino`)
  public static readonly Nidoking = Species.#impl.of(34, `Nidoking`)
  public static readonly Clefairy = Species.#impl.of(35, `Clefairy`)
  public static readonly Clefable = Species.#impl.of(36, `Clefable`)
  public static readonly Vulpix = Species.#impl.of(37, `Vulpix`)
  public static readonly Ninetales = Species.#impl.of(38, `Ninetales`)
  public static readonly Jigglypuff = Species.#impl.of(39, `Jigglypuff`)
  public static readonly Wigglytuff = Species.#impl.of(40, `Wigglytuff`)
  public static readonly Zubat = Species.#impl.of(41, `Zubat`)
  public static readonly Golbat = Species.#impl.of(42, `Golbat`)
  public static readonly Oddish = Species.#impl.of(43, `Oddish`)
  public static readonly Gloom = Species.#impl.of(44, `Gloom`)
  public static readonly Vileplume = Species.#impl.of(45, `Vileplume`)
  public static readonly Paras = Species.#impl.of(46, `Paras`)
  public static readonly Parasect = Species.#impl.of(47, `Parasect`)
  public static readonly Venonat = Species.#impl.of(48, `Venonat`)
  public static readonly Venomoth = Species.#impl.of(49, `Venomoth`)
  public static readonly Diglett = Species.#impl.of(50, `Diglett`)
  public static readonly Dugtrio = Species.#impl.of(51, `Dugtrio`)
  public static readonly Meowth = Species.#impl.of(52, `Meowth`)
  public static readonly Persian = Species.#impl.of(53, `Persian`)
  public static readonly Psyduck = Species.#impl.of(54, `Psyduck`)
  public static readonly Golduck = Species.#impl.of(55, `Golduck`)
  public static readonly Mankey = Species.#impl.of(56, `Mankey`)
  public static readonly Primeape = Species.#impl.of(57, `Primeape`)
  public static readonly Growlithe = Species.#impl.of(58, `Growlithe`)
  public static readonly Arcanine = Species.#impl.of(59, `Arcanine`)
  public static readonly Poliwag = Species.#impl.of(60, `Poliwag`)
  public static readonly Poliwhirl = Species.#impl.of(61, `Poliwhirl`)
  public static readonly Poliwrath = Species.#impl.of(62, `Poliwrath`)
  public static readonly Abra = Species.#impl.of(63, `Abra`)
  public static readonly Kadabra = Species.#impl.of(64, `Kadabra`)
  public static readonly Alakazam = Species.#impl.of(65, `Alakazam`)
  public static readonly Machop = Species.#impl.of(66, `Machop`)
  public static readonly Machoke = Species.#impl.of(67, `Machoke`)
  public static readonly Machamp = Species.#impl.of(68, `Machamp`)
  public static readonly Bellsprout = Species.#impl.of(69, `Bellsprout`)
  public static readonly Weepinbell = Species.#impl.of(70, `Weepinbell`)
  public static readonly Victreebel = Species.#impl.of(71, `Victreebel`)
  public static readonly Tentacool = Species.#impl.of(72, `Tentacool`)
  public static readonly Tentacruel = Species.#impl.of(73, `Tentacruel`)
  public static readonly Geodude = Species.#impl.of(74, `Geodude`)
  public static readonly Graveler = Species.#impl.of(75, `Graveler`)
  public static readonly Golem = Species.#impl.of(76, `Golem`)
  public static readonly Ponyta = Species.#impl.of(77, `Ponyta`)
  public static readonly Rapidash = Species.#impl.of(78, `Rapidash`)
  public static readonly Slowpoke = Species.#impl.of(79, `Slowpoke`)
  public static readonly Slowbro = Species.#impl.of(80, `Slowbro`)
  public static readonly Magnemite = Species.#impl.of(81, `Magnemite`)
  public static readonly Magneton = Species.#impl.of(82, `Magneton`)
  public static readonly Farfetchd = Species.#impl.of(83, `Farfetchd`)
  public static readonly Doduo = Species.#impl.of(84, `Doduo`)
  public static readonly Dodrio = Species.#impl.of(85, `Dodrio`)
  public static readonly Seel = Species.#impl.of(86, `Seel`)
  public static readonly Dewgong = Species.#impl.of(87, `Dewgong`)
  public static readonly Grimer = Species.#impl.of(88, `Grimer`)
  public static readonly Muk = Species.#impl.of(89, `Muk`)
  public static readonly Shellder = Species.#impl.of(90, `Shellder`)
  public static readonly Cloyster = Species.#impl.of(91, `Cloyster`)
  public static readonly Gastly = Species.#impl.of(92, `Gastly`)
  public static readonly Haunter = Species.#impl.of(93, `Haunter`)
  public static readonly Gengar = Species.#impl.of(94, `Gengar`)
  public static readonly Onix = Species.#impl.of(95, `Onix`)
  public static readonly Drowzee = Species.#impl.of(96, `Drowzee`)
  public static readonly Hypno = Species.#impl.of(97, `Hypno`)
  public static readonly Krabby = Species.#impl.of(98, `Krabby`)
  public static readonly Kingler = Species.#impl.of(99, `Kingler`)
  public static readonly Voltorb = Species.#impl.of(100, `Voltorb`)
  public static readonly Electrode = Species.#impl.of(101, `Electrode`)
  public static readonly Exeggcute = Species.#impl.of(102, `Exeggcute`)
  public static readonly Exeggutor = Species.#impl.of(103, `Exeggutor`)
  public static readonly Cubone = Species.#impl.of(104, `Cubone`)
  public static readonly Marowak = Species.#impl.of(105, `Marowak`)
  public static readonly Hitmonlee = Species.#impl.of(106, `Hitmonlee`)
  public static readonly Hitmonchan = Species.#impl.of(107, `Hitmonchan`)
  public static readonly Lickitung = Species.#impl.of(108, `Lickitung`)
  public static readonly Koffing = Species.#impl.of(109, `Koffing`)
  public static readonly Weezing = Species.#impl.of(110, `Weezing`)
  public static readonly Rhyhorn = Species.#impl.of(111, `Rhyhorn`)
  public static readonly Rhydon = Species.#impl.of(112, `Rhydon`)
  public static readonly Chansey = Species.#impl.of(113, `Chansey`)
  public static readonly Tangela = Species.#impl.of(114, `Tangela`)
  public static readonly Kangaskhan = Species.#impl.of(115, `Kangaskhan`)
  public static readonly Horsea = Species.#impl.of(116, `Horsea`)
  public static readonly Seadra = Species.#impl.of(117, `Seadra`)
  public static readonly Goldeen = Species.#impl.of(118, `Goldeen`)
  public static readonly Seaking = Species.#impl.of(119, `Seaking`)
  public static readonly Staryu = Species.#impl.of(120, `Staryu`)
  public static readonly Starmie = Species.#impl.of(121, `Starmie`)
  public static readonly MrMime = Species.#impl.of(122, `MrMime`)
  public static readonly Scyther = Species.#impl.of(123, `Scyther`)
  public static readonly Jynx = Species.#impl.of(124, `Jynx`)
  public static readonly Electabuzz = Species.#impl.of(125, `Electabuzz`)
  public static readonly Magmar = Species.#impl.of(126, `Magmar`)
  public static readonly Pinsir = Species.#impl.of(127, `Pinsir`)
  public static readonly Tauros = Species.#impl.of(128, `Tauros`)
  public static readonly Magikarp = Species.#impl.of(129, `Magikarp`)
  public static readonly Gyarados = Species.#impl.of(130, `Gyarados`)
  public static readonly Lapras = Species.#impl.of(131, `Lapras`)
  public static readonly Ditto = Species.#impl.of(132, `Ditto`)
  public static readonly Eevee = Species.#impl.of(133, `Eevee`)
  public static readonly Vaporeon = Species.#impl.of(134, `Vaporeon`)
  public static readonly Jolteon = Species.#impl.of(135, `Jolteon`)
  public static readonly Flareon = Species.#impl.of(136, `Flareon`)
  public static readonly Porygon = Species.#impl.of(137, `Porygon`)
  public static readonly Omanyte = Species.#impl.of(138, `Omanyte`)
  public static readonly Omastar = Species.#impl.of(139, `Omastar`)
  public static readonly Kabuto = Species.#impl.of(140, `Kabuto`)
  public static readonly Kabutops = Species.#impl.of(141, `Kabutops`)
  public static readonly Aerodactyl = Species.#impl.of(142, `Aerodactyl`)
  public static readonly Snorlax = Species.#impl.of(143, `Snorlax`)
  public static readonly Articuno = Species.#impl.of(144, `Articuno`)
  public static readonly Zapdos = Species.#impl.of(145, `Zapdos`)
  public static readonly Moltres = Species.#impl.of(146, `Moltres`)
  public static readonly Dratini = Species.#impl.of(147, `Dratini`)
  public static readonly Dragonair = Species.#impl.of(148, `Dragonair`)
  public static readonly Dragonite = Species.#impl.of(149, `Dragonite`)
  public static readonly Mewtwo = Species.#impl.of(150, `Mewtwo`)
  public static readonly Mew = Species.#impl.of(151, `Mew`)

  /**
   * Generation II Pokémon species. (152-251)
   */
  public static readonly Chikorita = Species.#impl.of(152, `Chikorita`)
  public static readonly Bayleef = Species.#impl.of(153, `Bayleef`)
  public static readonly Meganium = Species.#impl.of(154, `Meganium`)
  public static readonly Cyndaquil = Species.#impl.of(155, `Cyndaquil`)
  public static readonly Quilava = Species.#impl.of(156, `Quilava`)
  public static readonly Typhlosion = Species.#impl.of(157, `Typhlosion`)
  public static readonly Totodile = Species.#impl.of(158, `Totodile`)
  public static readonly Croconaw = Species.#impl.of(159, `Croconaw`)
  public static readonly Feraligatr = Species.#impl.of(160, `Feraligatr`)
  public static readonly Sentret = Species.#impl.of(161, `Sentret`)
  public static readonly Furret = Species.#impl.of(162, `Furret`)
  public static readonly Hoothoot = Species.#impl.of(163, `Hoothoot`)
  public static readonly Noctowl = Species.#impl.of(164, `Noctowl`)
  public static readonly Ledyba = Species.#impl.of(165, `Ledyba`)
  public static readonly Ledian = Species.#impl.of(166, `Ledian`)
  public static readonly Spinarak = Species.#impl.of(167, `Spinarak`)
  public static readonly Ariados = Species.#impl.of(168, `Ariados`)
  public static readonly Crobat = Species.#impl.of(169, `Crobat`)
  public static readonly Chinchou = Species.#impl.of(170, `Chinchou`)
  public static readonly Lanturn = Species.#impl.of(171, `Lanturn`)
  public static readonly Pichu = Species.#impl.of(172, `Pichu`)
  public static readonly Cleffa = Species.#impl.of(173, `Cleffa`)
  public static readonly Igglybuff = Species.#impl.of(174, `Igglybuff`)
  public static readonly Togepi = Species.#impl.of(175, `Togepi`)
  public static readonly Togetic = Species.#impl.of(176, `Togetic`)
  public static readonly Natu = Species.#impl.of(177, `Natu`)
  public static readonly Xatu = Species.#impl.of(178, `Xatu`)
  public static readonly Mareep = Species.#impl.of(179, `Mareep`)
  public static readonly Flaaffy = Species.#impl.of(180, `Flaaffy`)
  public static readonly Ampharos = Species.#impl.of(181, `Ampharos`)
  public static readonly Bellossom = Species.#impl.of(182, `Bellossom`)
  public static readonly Marill = Species.#impl.of(183, `Marill`)
  public static readonly Azumarill = Species.#impl.of(184, `Azumarill`)
  public static readonly Sudowoodo = Species.#impl.of(185, `Sudowoodo`)
  public static readonly Politoed = Species.#impl.of(186, `Politoed`)
  public static readonly Hoppip = Species.#impl.of(187, `Hoppip`)
  public static readonly Skiploom = Species.#impl.of(188, `Skiploom`)
  public static readonly Jumpluff = Species.#impl.of(189, `Jumpluff`)
  public static readonly Aipom = Species.#impl.of(190, `Aipom`)
  public static readonly Sunkern = Species.#impl.of(191, `Sunkern`)
  public static readonly Sunflora = Species.#impl.of(192, `Sunflora`)
  public static readonly Yanma = Species.#impl.of(193, `Yanma`)
  public static readonly Wooper = Species.#impl.of(194, `Wooper`)
  public static readonly Quagsire = Species.#impl.of(195, `Quagsire`)
  public static readonly Espeon = Species.#impl.of(196, `Espeon`)
  public static readonly Umbreon = Species.#impl.of(197, `Umbreon`)
  public static readonly Murkrow = Species.#impl.of(198, `Murkrow`)
  public static readonly Slowking = Species.#impl.of(199, `Slowking`)
  public static readonly Misdreavus = Species.#impl.of(200, `Misdreavus`)
  public static readonly Unown = Species.#impl.of(201, `Unown`)
  public static readonly Wobbuffet = Species.#impl.of(202, `Wobbuffet`)
  public static readonly Girafarig = Species.#impl.of(203, `Girafarig`)
  public static readonly Pineco = Species.#impl.of(204, `Pineco`)
  public static readonly Forretress = Species.#impl.of(205, `Forretress`)
  public static readonly Dunsparce = Species.#impl.of(206, `Dunsparce`)
  public static readonly Gligar = Species.#impl.of(207, `Gligar`)
  public static readonly Steelix = Species.#impl.of(208, `Steelix`)
  public static readonly Snubbull = Species.#impl.of(209, `Snubbull`)
  public static readonly Granbull = Species.#impl.of(210, `Granbull`)
  public static readonly Qwilfish = Species.#impl.of(211, `Qwilfish`)
  public static readonly Scizor = Species.#impl.of(212, `Scizor`)
  public static readonly Shuckle = Species.#impl.of(213, `Shuckle`)
  public static readonly Heracross = Species.#impl.of(214, `Heracross`)
  public static readonly Sneasel = Species.#impl.of(215, `Sneasel`)
  public static readonly Teddiursa = Species.#impl.of(216, `Teddiursa`)
  public static readonly Ursaring = Species.#impl.of(217, `Ursaring`)
  public static readonly Slugma = Species.#impl.of(218, `Slugma`)
  public static readonly Magcargo = Species.#impl.of(219, `Magcargo`)
  public static readonly Swinub = Species.#impl.of(220, `Swinub`)
  public static readonly Piloswine = Species.#impl.of(221, `Piloswine`)
  public static readonly Corsola = Species.#impl.of(222, `Corsola`)
  public static readonly Remoraid = Species.#impl.of(223, `Remoraid`)
  public static readonly Octillery = Species.#impl.of(224, `Octillery`)
  public static readonly Delibird = Species.#impl.of(225, `Delibird`)
  public static readonly Mantine = Species.#impl.of(226, `Mantine`)
  public static readonly Skarmory = Species.#impl.of(227, `Skarmory`)
  public static readonly Houndour = Species.#impl.of(228, `Houndour`)
  public static readonly Houndoom = Species.#impl.of(229, `Houndoom`)
  public static readonly Kingdra = Species.#impl.of(230, `Kingdra`)
  public static readonly Phanpy = Species.#impl.of(231, `Phanpy`)
  public static readonly Donphan = Species.#impl.of(232, `Donphan`)
  public static readonly Porygon2 = Species.#impl.of(233, `Porygon2`)
  public static readonly Stantler = Species.#impl.of(234, `Stantler`)
  public static readonly Smeargle = Species.#impl.of(235, `Smeargle`)
  public static readonly Tyrogue = Species.#impl.of(236, `Tyrogue`)
  public static readonly Hitmontop = Species.#impl.of(237, `Hitmontop`)
  public static readonly Smoochum = Species.#impl.of(238, `Smoochum`)
  public static readonly Elekid = Species.#impl.of(239, `Elekid`)
  public static readonly Magby = Species.#impl.of(240, `Magby`)
  public static readonly Miltank = Species.#impl.of(241, `Miltank`)
  public static readonly Blissey = Species.#impl.of(242, `Blissey`)
  public static readonly Raikou = Species.#impl.of(243, `Raikou`)
  public static readonly Entei = Species.#impl.of(244, `Entei`)
  public static readonly Suicune = Species.#impl.of(245, `Suicune`)
  public static readonly Larvitar = Species.#impl.of(246, `Larvitar`)
  public static readonly Pupitar = Species.#impl.of(247, `Pupitar`)
  public static readonly Tyranitar = Species.#impl.of(248, `Tyranitar`)
  public static readonly Lugia = Species.#impl.of(249, `Lugia`)
  public static readonly Hooh = Species.#impl.of(250, `Ho-Oh`)
  public static readonly Celebi = Species.#impl.of(251, `Celebi`)

  /**
   * Generation III Pokémon species. (252-386)
   */
  public static readonly Treecko = Species.#impl.of(252, `Treecko`)
  public static readonly Grovyle = Species.#impl.of(253, `Grovyle`)
  public static readonly Sceptile = Species.#impl.of(254, `Sceptile`)
  public static readonly Torchic = Species.#impl.of(255, `Torchic`)
  public static readonly Combusken = Species.#impl.of(256, `Combusken`)
  public static readonly Blaziken = Species.#impl.of(257, `Blaziken`)
  public static readonly Mudkip = Species.#impl.of(258, `Mudkip`)
  public static readonly Marshtomp = Species.#impl.of(259, `Marshtomp`)
  public static readonly Swampert = Species.#impl.of(260, `Swampert`)
  public static readonly Poochyena = Species.#impl.of(261, `Poochyena`)
  public static readonly Mightyena = Species.#impl.of(262, `Mightyena`)
  public static readonly Zigzagoon = Species.#impl.of(263, `Zigzagoon`)
  public static readonly Linoone = Species.#impl.of(264, `Linoone`)
  public static readonly Wurmple = Species.#impl.of(265, `Wurmple`)
  public static readonly Silcoon = Species.#impl.of(266, `Silcoon`)
  public static readonly Beautifly = Species.#impl.of(267, `Beautifly`)
  public static readonly Cascoon = Species.#impl.of(268, `Cascoon`)
  public static readonly Dustox = Species.#impl.of(269, `Dustox`)
  public static readonly Lotad = Species.#impl.of(270, `Lotad`)
  public static readonly Lombre = Species.#impl.of(271, `Lombre`)
  public static readonly Ludicolo = Species.#impl.of(272, `Ludicolo`)
  public static readonly Seedot = Species.#impl.of(273, `Seedot`)
  public static readonly Nuzleaf = Species.#impl.of(274, `Nuzleaf`)
  public static readonly Shiftry = Species.#impl.of(275, `Shiftry`)
  public static readonly Taillow = Species.#impl.of(276, `Taillow`)
  public static readonly Swellow = Species.#impl.of(277, `Swellow`)
  public static readonly Wingull = Species.#impl.of(278, `Wingull`)
  public static readonly Pelipper = Species.#impl.of(279, `Pelipper`)
  public static readonly Ralts = Species.#impl.of(280, `Ralts`)
  public static readonly Kirlia = Species.#impl.of(281, `Kirlia`)
  public static readonly Gardevoir = Species.#impl.of(282, `Gardevoir`)
  public static readonly Surskit = Species.#impl.of(283, `Surskit`)
  public static readonly Masquerain = Species.#impl.of(284, `Masquerain`)
  public static readonly Shroomish = Species.#impl.of(285, `Shroomish`)
  public static readonly Breloom = Species.#impl.of(286, `Breloom`)
  public static readonly Slakoth = Species.#impl.of(287, `Slakoth`)
  public static readonly Vigoroth = Species.#impl.of(288, `Vigoroth`)
  public static readonly Slaking = Species.#impl.of(289, `Slaking`)
  public static readonly Nincada = Species.#impl.of(290, `Nincada`)
  public static readonly Ninjask = Species.#impl.of(291, `Ninjask`)
  public static readonly Shedinja = Species.#impl.of(292, `Shedinja`)
  public static readonly Whismur = Species.#impl.of(293, `Whismur`)
  public static readonly Loudred = Species.#impl.of(294, `Loudred`)
  public static readonly Exploud = Species.#impl.of(295, `Exploud`)
  public static readonly Makuhita = Species.#impl.of(296, `Makuhita`)
  public static readonly Hariyama = Species.#impl.of(297, `Hariyama`)
  public static readonly Azurill = Species.#impl.of(298, `Azurill`)
  public static readonly Nosepass = Species.#impl.of(299, `Nosepass`)
  public static readonly Skitty = Species.#impl.of(300, `Skitty`)
  public static readonly Delcatty = Species.#impl.of(301, `Delcatty`)
  public static readonly Sableye = Species.#impl.of(302, `Sableye`)
  public static readonly Mawile = Species.#impl.of(303, `Mawile`)
  public static readonly Aron = Species.#impl.of(304, `Aron`)
  public static readonly Lairon = Species.#impl.of(305, `Lairon`)
  public static readonly Aggron = Species.#impl.of(306, `Aggron`)
  public static readonly Meditite = Species.#impl.of(307, `Meditite`)
  public static readonly Medicham = Species.#impl.of(308, `Medicham`)
  public static readonly Electrike = Species.#impl.of(309, `Electrike`)
  public static readonly Manectric = Species.#impl.of(310, `Manectric`)
  public static readonly Plusle = Species.#impl.of(311, `Plusle`)
  public static readonly Minun = Species.#impl.of(312, `Minun`)
  public static readonly Volbeat = Species.#impl.of(313, `Volbeat`)
  public static readonly Illumise = Species.#impl.of(314, `Illumise`)
  public static readonly Roselia = Species.#impl.of(315, `Roselia`)
  public static readonly Gulpin = Species.#impl.of(316, `Gulpin`)
  public static readonly Swalot = Species.#impl.of(317, `Swalot`)
  public static readonly Carvanha = Species.#impl.of(318, `Carvanha`)
  public static readonly Sharpedo = Species.#impl.of(319, `Sharpedo`)
  public static readonly Wailmer = Species.#impl.of(320, `Wailmer`)
  public static readonly Wailord = Species.#impl.of(321, `Wailord`)
  public static readonly Numel = Species.#impl.of(322, `Numel`)
  public static readonly Camerupt = Species.#impl.of(323, `Camerupt`)
  public static readonly Torkoal = Species.#impl.of(324, `Torkoal`)
  public static readonly Spoink = Species.#impl.of(325, `Spoink`)
  public static readonly Grumpig = Species.#impl.of(326, `Grumpig`)
  public static readonly Spinda = Species.#impl.of(327, `Spinda`)
  public static readonly Trapinch = Species.#impl.of(328, `Trapinch`)
  public static readonly Vibrava = Species.#impl.of(329, `Vibrava`)
  public static readonly Flygon = Species.#impl.of(330, `Flygon`)
  public static readonly Cacnea = Species.#impl.of(331, `Cacnea`)
  public static readonly Cacturne = Species.#impl.of(332, `Cacturne`)
  public static readonly Swablu = Species.#impl.of(333, `Swablu`)
  public static readonly Altaria = Species.#impl.of(334, `Altaria`)
  public static readonly Zangoose = Species.#impl.of(335, `Zangoose`)
  public static readonly Seviper = Species.#impl.of(336, `Seviper`)
  public static readonly Lunatone = Species.#impl.of(337, `Lunatone`)
  public static readonly Solrock = Species.#impl.of(338, `Solrock`)
  public static readonly Barboach = Species.#impl.of(339, `Barboach`)
  public static readonly Whiscash = Species.#impl.of(340, `Whiscash`)
  public static readonly Corphish = Species.#impl.of(341, `Corphish`)
  public static readonly Crawdaunt = Species.#impl.of(342, `Crawdaunt`)
  public static readonly Baltoy = Species.#impl.of(343, `Baltoy`)
  public static readonly Claydol = Species.#impl.of(344, `Claydol`)
  public static readonly Lileep = Species.#impl.of(345, `Lileep`)
  public static readonly Cradily = Species.#impl.of(346, `Cradily`)
  public static readonly Anorith = Species.#impl.of(347, `Anorith`)
  public static readonly Armaldo = Species.#impl.of(348, `Armaldo`)
  public static readonly Feebas = Species.#impl.of(349, `Feebas`)
  public static readonly Milotic = Species.#impl.of(350, `Milotic`)
  public static readonly Castform = Species.#impl.of(351, `Castform`)
  public static readonly Kecleon = Species.#impl.of(352, `Kecleon`)
  public static readonly Shuppet = Species.#impl.of(353, `Shuppet`)
  public static readonly Banette = Species.#impl.of(354, `Banette`)
  public static readonly Duskull = Species.#impl.of(355, `Duskull`)
  public static readonly Dusclops = Species.#impl.of(356, `Dusclops`)
  public static readonly Tropius = Species.#impl.of(357, `Tropius`)
  public static readonly Chimecho = Species.#impl.of(358, `Chimecho`)
  public static readonly Absol = Species.#impl.of(359, `Absol`)
  public static readonly Wynaut = Species.#impl.of(360, `Wynaut`)
  public static readonly Snorunt = Species.#impl.of(361, `Snorunt`)
  public static readonly Glalie = Species.#impl.of(362, `Glalie`)
  public static readonly Spheal = Species.#impl.of(363, `Spheal`)
  public static readonly Sealeo = Species.#impl.of(364, `Sealeo`)
  public static readonly Walrein = Species.#impl.of(365, `Walrein`)
  public static readonly Clamperl = Species.#impl.of(366, `Clamperl`)
  public static readonly Huntail = Species.#impl.of(367, `Huntail`)
  public static readonly Gorebyss = Species.#impl.of(368, `Gorebyss`)
  public static readonly Relicanth = Species.#impl.of(369, `Relicanth`)
  public static readonly Luvdisc = Species.#impl.of(370, `Luvdisc`)
  public static readonly Bagon = Species.#impl.of(371, `Bagon`)
  public static readonly Shelgon = Species.#impl.of(372, `Shelgon`)
  public static readonly Salamence = Species.#impl.of(373, `Salamence`)
  public static readonly Beldum = Species.#impl.of(374, `Beldum`)
  public static readonly Metang = Species.#impl.of(375, `Metang`)
  public static readonly Metagross = Species.#impl.of(376, `Metagross`)
  public static readonly Regirock = Species.#impl.of(377, `Regirock`)
  public static readonly Regice = Species.#impl.of(378, `Regice`)
  public static readonly Registeel = Species.#impl.of(379, `Registeel`)
  public static readonly Latias = Species.#impl.of(380, `Latias`)
  public static readonly Latios = Species.#impl.of(381, `Latios`)
  public static readonly Kyogre = Species.#impl.of(382, `Kyogre`)
  public static readonly Groudon = Species.#impl.of(383, `Groudon`)
  public static readonly Rayquaza = Species.#impl.of(384, `Rayquaza`)
  public static readonly Jirachi = Species.#impl.of(385, `Jirachi`)
  public static readonly Deoxys = Species.#impl.of(386, `Deoxys`)

  /**
   * Generation IV Pokémon species. (387-493)
   */
  public static readonly Turtwig = Species.#impl.of(387, `Turtwig`)
  public static readonly Grotle = Species.#impl.of(388, `Grotle`)
  public static readonly Torterra = Species.#impl.of(389, `Torterra`)
  public static readonly Chimchar = Species.#impl.of(390, `Chimchar`)
  public static readonly Monferno = Species.#impl.of(391, `Monferno`)
  public static readonly Infernape = Species.#impl.of(392, `Infernape`)
  public static readonly Piplup = Species.#impl.of(393, `Piplup`)
  public static readonly Prinplup = Species.#impl.of(394, `Prinplup`)
  public static readonly Empoleon = Species.#impl.of(395, `Empoleon`)
  public static readonly Starly = Species.#impl.of(396, `Starly`)
  public static readonly Staravia = Species.#impl.of(397, `Staravia`)
  public static readonly Staraptor = Species.#impl.of(398, `Staraptor`)
  public static readonly Bidoof = Species.#impl.of(399, `Bidoof`)
  public static readonly Bibarel = Species.#impl.of(400, `Bibarel`)
  public static readonly Kricketot = Species.#impl.of(401, `Kricketot`)
  public static readonly Kricketune = Species.#impl.of(402, `Kricketune`)
  public static readonly Shinx = Species.#impl.of(403, `Shinx`)
  public static readonly Luxio = Species.#impl.of(404, `Luxio`)
  public static readonly Luxray = Species.#impl.of(405, `Luxray`)
  public static readonly Budew = Species.#impl.of(406, `Budew`)
  public static readonly Roserade = Species.#impl.of(407, `Roserade`)
  public static readonly Cranidos = Species.#impl.of(408, `Cranidos`)
  public static readonly Rampardos = Species.#impl.of(409, `Rampardos`)
  public static readonly Shieldon = Species.#impl.of(410, `Shieldon`)
  public static readonly Bastiodon = Species.#impl.of(411, `Bastiodon`)
  public static readonly Burmy = Species.#impl.of(412, `Burmy`)
  public static readonly Wormadam = Species.#impl.of(413, `Wormadam`)
  public static readonly Mothim = Species.#impl.of(414, `Mothim`)
  public static readonly Combee = Species.#impl.of(415, `Combee`)
  public static readonly Vespiquen = Species.#impl.of(416, `Vespiquen`)
  public static readonly Pachirisu = Species.#impl.of(417, `Pachirisu`)
  public static readonly Buizel = Species.#impl.of(418, `Buizel`)
  public static readonly Floatzel = Species.#impl.of(419, `Floatzel`)
  public static readonly Cherubi = Species.#impl.of(420, `Cherubi`)
  public static readonly Cherrim = Species.#impl.of(421, `Cherrim`)
  public static readonly Shellos = Species.#impl.of(422, `Shellos`)
  public static readonly Gastrodon = Species.#impl.of(423, `Gastrodon`)
  public static readonly Ambipom = Species.#impl.of(424, `Ambipom`)
  public static readonly Drifloon = Species.#impl.of(425, `Drifloon`)
  public static readonly Drifblim = Species.#impl.of(426, `Drifblim`)
  public static readonly Buneary = Species.#impl.of(427, `Buneary`)
  public static readonly Lopunny = Species.#impl.of(428, `Lopunny`)
  public static readonly Mismagius = Species.#impl.of(429, `Mismagius`)
  public static readonly Honchkrow = Species.#impl.of(430, `Honchkrow`)
  public static readonly Glameow = Species.#impl.of(431, `Glameow`)
  public static readonly Purugly = Species.#impl.of(432, `Purugly`)
  public static readonly Chingling = Species.#impl.of(433, `Chingling`)
  public static readonly Stunky = Species.#impl.of(434, `Stunky`)
  public static readonly Skuntank = Species.#impl.of(435, `Skuntank`)
  public static readonly Bronzor = Species.#impl.of(436, `Bronzor`)
  public static readonly Bronzong = Species.#impl.of(437, `Bronzong`)
  public static readonly Bonsly = Species.#impl.of(438, `Bonsly`)
  public static readonly MimeJr = Species.#impl.of(439, `MimeJr`)
  public static readonly Happiny = Species.#impl.of(440, `Happiny`)
  public static readonly Chatot = Species.#impl.of(441, `Chatot`)
  public static readonly Spiritomb = Species.#impl.of(442, `Spiritomb`)
  public static readonly Gible = Species.#impl.of(443, `Gible`)
  public static readonly Gabite = Species.#impl.of(444, `Gabite`)
  public static readonly Garchomp = Species.#impl.of(445, `Garchomp`)
  public static readonly Munchlax = Species.#impl.of(446, `Munchlax`)
  public static readonly Riolu = Species.#impl.of(447, `Riolu`)
  public static readonly Lucario = Species.#impl.of(448, `Lucario`)
  public static readonly Hippopotas = Species.#impl.of(449, `Hippopotas`)
  public static readonly Hippowdon = Species.#impl.of(450, `Hippowdon`)
  public static readonly Skorupi = Species.#impl.of(451, `Skorupi`)
  public static readonly Drapion = Species.#impl.of(452, `Drapion`)
  public static readonly Croagunk = Species.#impl.of(453, `Croagunk`)
  public static readonly Toxicroak = Species.#impl.of(454, `Toxicroak`)
  public static readonly Carnivine = Species.#impl.of(455, `Carnivine`)
  public static readonly Finneon = Species.#impl.of(456, `Finneon`)
  public static readonly Lumineon = Species.#impl.of(457, `Lumineon`)
  public static readonly Mantyke = Species.#impl.of(458, `Mantyke`)
  public static readonly Snover = Species.#impl.of(459, `Snover`)
  public static readonly Abomasnow = Species.#impl.of(460, `Abomasnow`)
  public static readonly Weavile = Species.#impl.of(461, `Weavile`)
  public static readonly Magnezone = Species.#impl.of(462, `Magnezone`)
  public static readonly Lickilicky = Species.#impl.of(463, `Lickilicky`)
  public static readonly Rhyperior = Species.#impl.of(464, `Rhyperior`)
  public static readonly Tangrowth = Species.#impl.of(465, `Tangrowth`)
  public static readonly Electivire = Species.#impl.of(466, `Electivire`)
  public static readonly Magmortar = Species.#impl.of(467, `Magmortar`)
  public static readonly Togekiss = Species.#impl.of(468, `Togekiss`)
  public static readonly Yanmega = Species.#impl.of(469, `Yanmega`)
  public static readonly Leafeon = Species.#impl.of(470, `Leafeon`)
  public static readonly Glaceon = Species.#impl.of(471, `Glaceon`)
  public static readonly Gliscor = Species.#impl.of(472, `Gliscor`)
  public static readonly Mamoswine = Species.#impl.of(473, `Mamoswine`)
  public static readonly PorygonZ = Species.#impl.of(474, `Porygon-Z`)
  public static readonly Gallade = Species.#impl.of(475, `Gallade`)
  public static readonly Probopass = Species.#impl.of(476, `Probopass`)
  public static readonly Dusknoir = Species.#impl.of(477, `Dusknoir`)
  public static readonly Froslass = Species.#impl.of(478, `Froslass`)
  public static readonly Rotom = Species.#impl.of(479, `Rotom`)
  public static readonly Uxie = Species.#impl.of(480, `Uxie`)
  public static readonly Mesprit = Species.#impl.of(481, `Mesprit`)
  public static readonly Azelf = Species.#impl.of(482, `Azelf`)
  public static readonly Dialga = Species.#impl.of(483, `Dialga`)
  public static readonly Palkia = Species.#impl.of(484, `Palkia`)
  public static readonly Heatran = Species.#impl.of(485, `Heatran`)
  public static readonly Regigigas = Species.#impl.of(486, `Regigigas`)
  public static readonly Giratina = Species.#impl.of(487, `Giratina`)
  public static readonly Cresselia = Species.#impl.of(488, `Cresselia`)
  public static readonly Phione = Species.#impl.of(489, `Phione`)
  public static readonly Manaphy = Species.#impl.of(490, `Manaphy`)
  public static readonly Darkrai = Species.#impl.of(491, `Darkrai`)
  public static readonly Shaymin = Species.#impl.of(492, `Shaymin`)
  public static readonly Arceus = Species.#impl.of(493, `Arceus`)

  /**
   * Generation V Pokémon species. (494-649)
   */
  public static readonly Victini = Species.#impl.of(494, `Victini`)
  public static readonly Snivy = Species.#impl.of(495, `Snivy`)
  public static readonly Servine = Species.#impl.of(496, `Servine`)
  public static readonly Serperior = Species.#impl.of(497, `Serperior`)
  public static readonly Tepig = Species.#impl.of(498, `Tepig`)
  public static readonly Pignite = Species.#impl.of(499, `Pignite`)
  public static readonly Emboar = Species.#impl.of(500, `Emboar`)
  public static readonly Oshawott = Species.#impl.of(501, `Oshawott`)
  public static readonly Dewott = Species.#impl.of(502, `Dewott`)
  public static readonly Samurott = Species.#impl.of(503, `Samurott`)
  public static readonly Patrat = Species.#impl.of(504, `Patrat`)
  public static readonly Watchog = Species.#impl.of(505, `Watchog`)
  public static readonly Lillipup = Species.#impl.of(506, `Lillipup`)
  public static readonly Herdier = Species.#impl.of(507, `Herdier`)
  public static readonly Stoutland = Species.#impl.of(508, `Stoutland`)
  public static readonly Purrloin = Species.#impl.of(509, `Purrloin`)
  public static readonly Liepard = Species.#impl.of(510, `Liepard`)
  public static readonly Pansage = Species.#impl.of(511, `Pansage`)
  public static readonly Simisage = Species.#impl.of(512, `Simisage`)
  public static readonly Pansear = Species.#impl.of(513, `Pansear`)
  public static readonly Simisear = Species.#impl.of(514, `Simisear`)
  public static readonly Panpour = Species.#impl.of(515, `Panpour`)
  public static readonly Simipour = Species.#impl.of(516, `Simipour`)
  public static readonly Munna = Species.#impl.of(517, `Munna`)
  public static readonly Musharna = Species.#impl.of(518, `Musharna`)
  public static readonly Pidove = Species.#impl.of(519, `Pidove`)
  public static readonly Tranquill = Species.#impl.of(520, `Tranquill`)
  public static readonly Unfezant = Species.#impl.of(521, `Unfezant`)
  public static readonly Blitzle = Species.#impl.of(522, `Blitzle`)
  public static readonly Zebstrika = Species.#impl.of(523, `Zebstrika`)
  public static readonly Roggenrola = Species.#impl.of(524, `Roggenrola`)
  public static readonly Boldore = Species.#impl.of(525, `Boldore`)
  public static readonly Gigalith = Species.#impl.of(526, `Gigalith`)
  public static readonly Woobat = Species.#impl.of(527, `Woobat`)
  public static readonly Swoobat = Species.#impl.of(528, `Swoobat`)
  public static readonly Drilbur = Species.#impl.of(529, `Drilbur`)
  public static readonly Excadrill = Species.#impl.of(530, `Excadrill`)
  public static readonly Audino = Species.#impl.of(531, `Audino`)
  public static readonly Timburr = Species.#impl.of(532, `Timburr`)
  public static readonly Gurdurr = Species.#impl.of(533, `Gurdurr`)
  public static readonly Conkeldurr = Species.#impl.of(534, `Conkeldurr`)
  public static readonly Tympole = Species.#impl.of(535, `Tympole`)
  public static readonly Palpitoad = Species.#impl.of(536, `Palpitoad`)
  public static readonly Seismitoad = Species.#impl.of(537, `Seismitoad`)
  public static readonly Throh = Species.#impl.of(538, `Throh`)
  public static readonly Sawk = Species.#impl.of(539, `Sawk`)
  public static readonly Sewaddle = Species.#impl.of(540, `Sewaddle`)
  public static readonly Swadloon = Species.#impl.of(541, `Swadloon`)
  public static readonly Leavanny = Species.#impl.of(542, `Leavanny`)
  public static readonly Venipede = Species.#impl.of(543, `Venipede`)
  public static readonly Whirlipede = Species.#impl.of(544, `Whirlipede`)
  public static readonly Scolipede = Species.#impl.of(545, `Scolipede`)
  public static readonly Cottonee = Species.#impl.of(546, `Cottonee`)
  public static readonly Whimsicott = Species.#impl.of(547, `Whimsicott`)
  public static readonly Petilil = Species.#impl.of(548, `Petilil`)
  public static readonly Lilligant = Species.#impl.of(549, `Lilligant`)
  public static readonly Basculin = Species.#impl.of(550, `Basculin`)
  public static readonly Sandile = Species.#impl.of(551, `Sandile`)
  public static readonly Krokorok = Species.#impl.of(552, `Krokorok`)
  public static readonly Krookodile = Species.#impl.of(553, `Krookodile`)
  public static readonly Darumaka = Species.#impl.of(554, `Darumaka`)
  public static readonly Darmanitan = Species.#impl.of(555, `Darmanitan`)
  public static readonly Maractus = Species.#impl.of(556, `Maractus`)
  public static readonly Dwebble = Species.#impl.of(557, `Dwebble`)
  public static readonly Crustle = Species.#impl.of(558, `Crustle`)
  public static readonly Scraggy = Species.#impl.of(559, `Scraggy`)
  public static readonly Scrafty = Species.#impl.of(560, `Scrafty`)
  public static readonly Sigilyph = Species.#impl.of(561, `Sigilyph`)
  public static readonly Yamask = Species.#impl.of(562, `Yamask`)
  public static readonly Cofagrigus = Species.#impl.of(563, `Cofagrigus`)
  public static readonly Tirtouga = Species.#impl.of(564, `Tirtouga`)
  public static readonly Carracosta = Species.#impl.of(565, `Carracosta`)
  public static readonly Archen = Species.#impl.of(566, `Archen`)
  public static readonly Archeops = Species.#impl.of(567, `Archeops`)
  public static readonly Trubbish = Species.#impl.of(568, `Trubbish`)
  public static readonly Garbodor = Species.#impl.of(569, `Garbodor`)
  public static readonly Zorua = Species.#impl.of(570, `Zorua`)
  public static readonly Zoroark = Species.#impl.of(571, `Zoroark`)
  public static readonly Minccino = Species.#impl.of(572, `Minccino`)
  public static readonly Cinccino = Species.#impl.of(573, `Cinccino`)
  public static readonly Gothita = Species.#impl.of(574, `Gothita`)
  public static readonly Gothorita = Species.#impl.of(575, `Gothorita`)
  public static readonly Gothitelle = Species.#impl.of(576, `Gothitelle`)
  public static readonly Solosis = Species.#impl.of(577, `Solosis`)
  public static readonly Duosion = Species.#impl.of(578, `Duosion`)
  public static readonly Reuniclus = Species.#impl.of(579, `Reuniclus`)
  public static readonly Ducklett = Species.#impl.of(580, `Ducklett`)
  public static readonly Swanna = Species.#impl.of(581, `Swanna`)
  public static readonly Vanillite = Species.#impl.of(582, `Vanillite`)
  public static readonly Vanillish = Species.#impl.of(583, `Vanillish`)
  public static readonly Vanilluxe = Species.#impl.of(584, `Vanilluxe`)
  public static readonly Deerling = Species.#impl.of(585, `Deerling`)
  public static readonly Sawsbuck = Species.#impl.of(586, `Sawsbuck`)
  public static readonly Emolga = Species.#impl.of(587, `Emolga`)
  public static readonly Karrablast = Species.#impl.of(588, `Karrablast`)
  public static readonly Escavalier = Species.#impl.of(589, `Escavalier`)
  public static readonly Foongus = Species.#impl.of(590, `Foongus`)
  public static readonly Amoonguss = Species.#impl.of(591, `Amoonguss`)
  public static readonly Frillish = Species.#impl.of(592, `Frillish`)
  public static readonly Jellicent = Species.#impl.of(593, `Jellicent`)
  public static readonly Alomomola = Species.#impl.of(594, `Alomomola`)
  public static readonly Joltik = Species.#impl.of(595, `Joltik`)
  public static readonly Galvantula = Species.#impl.of(596, `Galvantula`)
  public static readonly Ferroseed = Species.#impl.of(597, `Ferroseed`)
  public static readonly Ferrothorn = Species.#impl.of(598, `Ferrothorn`)
  public static readonly Klink = Species.#impl.of(599, `Klink`)
  public static readonly Klang = Species.#impl.of(600, `Klang`)
  public static readonly Klinklang = Species.#impl.of(601, `Klinklang`)
  public static readonly Tynamo = Species.#impl.of(602, `Tynamo`)
  public static readonly Eelektrik = Species.#impl.of(603, `Eelektrik`)
  public static readonly Eelektross = Species.#impl.of(604, `Eelektross`)
  public static readonly Elgyem = Species.#impl.of(605, `Elgyem`)
  public static readonly Beheeyem = Species.#impl.of(606, `Beheeyem`)
  public static readonly Litwick = Species.#impl.of(607, `Litwick`)
  public static readonly Lampent = Species.#impl.of(608, `Lampent`)
  public static readonly Chandelure = Species.#impl.of(609, `Chandelure`)
  public static readonly Axew = Species.#impl.of(610, `Axew`)
  public static readonly Fraxure = Species.#impl.of(611, `Fraxure`)
  public static readonly Haxorus = Species.#impl.of(612, `Haxorus`)
  public static readonly Cubchoo = Species.#impl.of(613, `Cubchoo`)
  public static readonly Beartic = Species.#impl.of(614, `Beartic`)
  public static readonly Cryogonal = Species.#impl.of(615, `Cryogonal`)
  public static readonly Shelmet = Species.#impl.of(616, `Shelmet`)
  public static readonly Accelgor = Species.#impl.of(617, `Accelgor`)
  public static readonly Stunfisk = Species.#impl.of(618, `Stunfisk`)
  public static readonly Mienfoo = Species.#impl.of(619, `Mienfoo`)
  public static readonly Mienshao = Species.#impl.of(620, `Mienshao`)
  public static readonly Druddigon = Species.#impl.of(621, `Druddigon`)
  public static readonly Golett = Species.#impl.of(622, `Golett`)
  public static readonly Golurk = Species.#impl.of(623, `Golurk`)
  public static readonly Pawniard = Species.#impl.of(624, `Pawniard`)
  public static readonly Bisharp = Species.#impl.of(625, `Bisharp`)
  public static readonly Bouffalant = Species.#impl.of(626, `Bouffalant`)
  public static readonly Rufflet = Species.#impl.of(627, `Rufflet`)
  public static readonly Braviary = Species.#impl.of(628, `Braviary`)
  public static readonly Vullaby = Species.#impl.of(629, `Vullaby`)
  public static readonly Mandibuzz = Species.#impl.of(630, `Mandibuzz`)
  public static readonly Heatmor = Species.#impl.of(631, `Heatmor`)
  public static readonly Durant = Species.#impl.of(632, `Durant`)
  public static readonly Deino = Species.#impl.of(633, `Deino`)
  public static readonly Zweilous = Species.#impl.of(634, `Zweilous`)
  public static readonly Hydreigon = Species.#impl.of(635, `Hydreigon`)
  public static readonly Larvesta = Species.#impl.of(636, `Larvesta`)
  public static readonly Volcarona = Species.#impl.of(637, `Volcarona`)
  public static readonly Cobalion = Species.#impl.of(638, `Cobalion`)
  public static readonly Terrakion = Species.#impl.of(639, `Terrakion`)
  public static readonly Virizion = Species.#impl.of(640, `Virizion`)
  public static readonly Tornadus = Species.#impl.of(641, `Tornadus`)
  public static readonly Thundurus = Species.#impl.of(642, `Thundurus`)
  public static readonly Reshiram = Species.#impl.of(643, `Reshiram`)
  public static readonly Zekrom = Species.#impl.of(644, `Zekrom`)
  public static readonly Landorus = Species.#impl.of(645, `Landorus`)
  public static readonly Kyurem = Species.#impl.of(646, `Kyurem`)
  public static readonly Keldeo = Species.#impl.of(647, `Keldeo`)
  public static readonly Meloetta = Species.#impl.of(648, `Meloetta`)
  public static readonly Genesect = Species.#impl.of(649, `Genesect`)

  /**
   * Generation VI Pokémon species. (650-721)
   */
  public static readonly Chespin = Species.#impl.of(650, `Chespin`)
  public static readonly Quilladin = Species.#impl.of(651, `Quilladin`)
  public static readonly Chesnaught = Species.#impl.of(652, `Chesnaught`)
  public static readonly Fennekin = Species.#impl.of(653, `Fennekin`)
  public static readonly Braixen = Species.#impl.of(654, `Braixen`)
  public static readonly Delphox = Species.#impl.of(655, `Delphox`)
  public static readonly Froakie = Species.#impl.of(656, `Froakie`)
  public static readonly Frogadier = Species.#impl.of(657, `Frogadier`)
  public static readonly Greninja = Species.#impl.of(658, `Greninja`)
  public static readonly Bunnelby = Species.#impl.of(659, `Bunnelby`)
  public static readonly Diggersby = Species.#impl.of(660, `Diggersby`)
  public static readonly Fletchling = Species.#impl.of(661, `Fletchling`)
  public static readonly Fletchinder = Species.#impl.of(662, `Fletchinder`)
  public static readonly Talonflame = Species.#impl.of(663, `Talonflame`)
  public static readonly Scatterbug = Species.#impl.of(664, `Scatterbug`)
  public static readonly Spewpa = Species.#impl.of(665, `Spewpa`)
  public static readonly Vivillon = Species.#impl.of(666, `Vivillon`)
  public static readonly Litleo = Species.#impl.of(667, `Litleo`)
  public static readonly Pyroar = Species.#impl.of(668, `Pyroar`)
  public static readonly Flabebe = Species.#impl.of(669, `Flabebe`)
  public static readonly Floette = Species.#impl.of(670, `Floette`)
  public static readonly Florges = Species.#impl.of(671, `Florges`)
  public static readonly Skiddo = Species.#impl.of(672, `Skiddo`)
  public static readonly Gogoat = Species.#impl.of(673, `Gogoat`)
  public static readonly Pancham = Species.#impl.of(674, `Pancham`)
  public static readonly Pangoro = Species.#impl.of(675, `Pangoro`)
  public static readonly Furfrou = Species.#impl.of(676, `Furfrou`)
  public static readonly Espurr = Species.#impl.of(677, `Espurr`)
  public static readonly Meowstic = Species.#impl.of(678, `Meowstic`)
  public static readonly Honedge = Species.#impl.of(679, `Honedge`)
  public static readonly Doublade = Species.#impl.of(680, `Doublade`)
  public static readonly Aegislash = Species.#impl.of(681, `Aegislash`)
  public static readonly Spritzee = Species.#impl.of(682, `Spritzee`)
  public static readonly Aromatisse = Species.#impl.of(683, `Aromatisse`)
  public static readonly Swirlix = Species.#impl.of(684, `Swirlix`)
  public static readonly Slurpuff = Species.#impl.of(685, `Slurpuff`)
  public static readonly Inkay = Species.#impl.of(686, `Inkay`)
  public static readonly Malamar = Species.#impl.of(687, `Malamar`)
  public static readonly Binacle = Species.#impl.of(688, `Binacle`)
  public static readonly Barbaracle = Species.#impl.of(689, `Barbaracle`)
  public static readonly Skrelp = Species.#impl.of(690, `Skrelp`)
  public static readonly Dragalge = Species.#impl.of(691, `Dragalge`)
  public static readonly Clauncher = Species.#impl.of(692, `Clauncher`)
  public static readonly Clawitzer = Species.#impl.of(693, `Clawitzer`)
  public static readonly Helioptile = Species.#impl.of(694, `Helioptile`)
  public static readonly Heliolisk = Species.#impl.of(695, `Heliolisk`)
  public static readonly Tyrunt = Species.#impl.of(696, `Tyrunt`)
  public static readonly Tyrantrum = Species.#impl.of(697, `Tyrantrum`)
  public static readonly Amaura = Species.#impl.of(698, `Amaura`)
  public static readonly Aurorus = Species.#impl.of(699, `Aurorus`)
  public static readonly Sylveon = Species.#impl.of(700, `Sylveon`)
  public static readonly Hawlucha = Species.#impl.of(701, `Hawlucha`)
  public static readonly Dedenne = Species.#impl.of(702, `Dedenne`)
  public static readonly Carbink = Species.#impl.of(703, `Carbink`)
  public static readonly Goomy = Species.#impl.of(704, `Goomy`)
  public static readonly Sliggoo = Species.#impl.of(705, `Sliggoo`)
  public static readonly Goodra = Species.#impl.of(706, `Goodra`)
  public static readonly Klefki = Species.#impl.of(707, `Klefki`)
  public static readonly Phantump = Species.#impl.of(708, `Phantump`)
  public static readonly Trevenant = Species.#impl.of(709, `Trevenant`)
  public static readonly Pumpkaboo = Species.#impl.of(710, `Pumpkaboo`)
  public static readonly Gourgeist = Species.#impl.of(711, `Gourgeist`)
  public static readonly Bergmite = Species.#impl.of(712, `Bergmite`)
  public static readonly Avalugg = Species.#impl.of(713, `Avalugg`)
  public static readonly Noibat = Species.#impl.of(714, `Noibat`)
  public static readonly Noivern = Species.#impl.of(715, `Noivern`)
  public static readonly Xerneas = Species.#impl.of(716, `Xerneas`)
  public static readonly Yveltal = Species.#impl.of(717, `Yveltal`)
  public static readonly Zygarde = Species.#impl.of(718, `Zygarde`)
  public static readonly Diancie = Species.#impl.of(719, `Diancie`)
  public static readonly Hoopa = Species.#impl.of(720, `Hoopa`)
  public static readonly Volcanion = Species.#impl.of(721, `Volcanion`)

  /**
   * Generation VII Pokémon species. (722-907)
   */
  public static readonly Rowlet = Species.#impl.of(722, `Rowlet`)
  public static readonly Dartrix = Species.#impl.of(723, `Dartrix`)
  public static readonly Decidueye = Species.#impl.of(724, `Decidueye`)
  public static readonly Litten = Species.#impl.of(725, `Litten`)
  public static readonly Torracat = Species.#impl.of(726, `Torracat`)
  public static readonly Incineroar = Species.#impl.of(727, `Incineroar`)
  public static readonly Popplio = Species.#impl.of(728, `Popplio`)
  public static readonly Brionne = Species.#impl.of(729, `Brionne`)
  public static readonly Primarina = Species.#impl.of(730, `Primarina`)
  public static readonly Pikipek = Species.#impl.of(731, `Pikipek`)
  public static readonly Trumbeak = Species.#impl.of(732, `Trumbeak`)
  public static readonly Toucannon = Species.#impl.of(733, `Toucannon`)
  public static readonly Yungoos = Species.#impl.of(734, `Yungoos`)
  public static readonly Gumshoos = Species.#impl.of(735, `Gumshoos`)
  public static readonly Grubbin = Species.#impl.of(736, `Grubbin`)
  public static readonly Charjabug = Species.#impl.of(737, `Charjabug`)
  public static readonly Vikavolt = Species.#impl.of(738, `Vikavolt`)
  public static readonly Crabrawler = Species.#impl.of(739, `Crabrawler`)
  public static readonly Crabominable = Species.#impl.of(740, `Crabominable`)
  public static readonly Oricorio = Species.#impl.of(741, `Oricorio`)
  public static readonly Cutiefly = Species.#impl.of(742, `Cutiefly`)
  public static readonly Ribombee = Species.#impl.of(743, `Ribombee`)
  public static readonly Rockruff = Species.#impl.of(744, `Rockruff`)
  public static readonly Lycanroc = Species.#impl.of(745, `Lycanroc`)
  public static readonly Wishiwashi = Species.#impl.of(746, `Wishiwashi`)
  public static readonly Mareanie = Species.#impl.of(747, `Mareanie`)
  public static readonly Toxapex = Species.#impl.of(748, `Toxapex`)
  public static readonly Mudbray = Species.#impl.of(749, `Mudbray`)
  public static readonly Mudsdale = Species.#impl.of(750, `Mudsdale`)
  public static readonly Dewpider = Species.#impl.of(751, `Dewpider`)
  public static readonly Araquanid = Species.#impl.of(752, `Araquanid`)
  public static readonly Fomantis = Species.#impl.of(753, `Fomantis`)
  public static readonly Lurantis = Species.#impl.of(754, `Lurantis`)
  public static readonly Morelull = Species.#impl.of(755, `Morelull`)
  public static readonly Shiinotic = Species.#impl.of(756, `Shiinotic`)
  public static readonly Salandit = Species.#impl.of(757, `Salandit`)
  public static readonly Salazzle = Species.#impl.of(758, `Salazzle`)
  public static readonly Stufful = Species.#impl.of(759, `Stufful`)
  public static readonly Bewear = Species.#impl.of(760, `Bewear`)
  public static readonly Bounsweet = Species.#impl.of(761, `Bounsweet`)
  public static readonly Steenee = Species.#impl.of(762, `Steenee`)
  public static readonly Tsareena = Species.#impl.of(763, `Tsareena`)
  public static readonly Comfey = Species.#impl.of(764, `Comfey`)
  public static readonly Oranguru = Species.#impl.of(765, `Oranguru`)
  public static readonly Passimian = Species.#impl.of(766, `Passimian`)
  public static readonly Wimpod = Species.#impl.of(767, `Wimpod`)
  public static readonly Golisopod = Species.#impl.of(768, `Golisopod`)
  public static readonly Sandygast = Species.#impl.of(769, `Sandygast`)
  public static readonly Palossand = Species.#impl.of(770, `Palossand`)
  public static readonly Pyukumuku = Species.#impl.of(771, `Pyukumuku`)
  public static readonly TypeNull = Species.#impl.of(772, `TypeNull`)
  public static readonly Silvally = Species.#impl.of(773, `Silvally`)
  public static readonly Minior = Species.#impl.of(774, `Minior`)
  public static readonly Komala = Species.#impl.of(775, `Komala`)
  public static readonly Turtonator = Species.#impl.of(776, `Turtonator`)
  public static readonly Togedemaru = Species.#impl.of(777, `Togedemaru`)
  public static readonly Mimikyu = Species.#impl.of(778, `Mimikyu`)
  public static readonly Bruxish = Species.#impl.of(779, `Bruxish`)
  public static readonly Drampa = Species.#impl.of(780, `Drampa`)
  public static readonly Dhelmise = Species.#impl.of(781, `Dhelmise`)
  public static readonly Jangmoo = Species.#impl.of(782, `Jangmo-o`)
  public static readonly Hakamoo = Species.#impl.of(783, `Hakamo-o`)
  public static readonly Kommoo = Species.#impl.of(784, `Kommo-o`)
  public static readonly TapuKoko = Species.#impl.of(785, `TapuKoko`)
  public static readonly TapuLele = Species.#impl.of(786, `TapuLele`)
  public static readonly TapuBulu = Species.#impl.of(787, `TapuBulu`)
  public static readonly TapuFini = Species.#impl.of(788, `TapuFini`)
  public static readonly Cosmog = Species.#impl.of(789, `Cosmog`)
  public static readonly Cosmoem = Species.#impl.of(790, `Cosmoem`)
  public static readonly Solgaleo = Species.#impl.of(791, `Solgaleo`)
  public static readonly Lunala = Species.#impl.of(792, `Lunala`)
  public static readonly Nihilego = Species.#impl.of(793, `Nihilego`)
  public static readonly Buzzwole = Species.#impl.of(794, `Buzzwole`)
  public static readonly Pheromosa = Species.#impl.of(795, `Pheromosa`)
  public static readonly Xurkitree = Species.#impl.of(796, `Xurkitree`)
  public static readonly Celesteela = Species.#impl.of(797, `Celesteela`)
  public static readonly Kartana = Species.#impl.of(798, `Kartana`)
  public static readonly Guzzlord = Species.#impl.of(799, `Guzzlord`)
  public static readonly Necrozma = Species.#impl.of(800, `Necrozma`)
  public static readonly Magearna = Species.#impl.of(801, `Magearna`)
  public static readonly Marshadow = Species.#impl.of(802, `Marshadow`)
  public static readonly Poipole = Species.#impl.of(803, `Poipole`)
  public static readonly Naganadel = Species.#impl.of(804, `Naganadel`)
  public static readonly Stakataka = Species.#impl.of(805, `Stakataka`)
  public static readonly Blacephalon = Species.#impl.of(806, `Blacephalon`)
  public static readonly Zeraora = Species.#impl.of(807, `Zeraora`)
  public static readonly Meltan = Species.#impl.of(808, `Meltan`)
  public static readonly Melmetal = Species.#impl.of(809, `Melmetal`)

  /**
   * Generation VIII Pokémon species. (810-905)
   */
  public static readonly Grookey = Species.#impl.of(810, `Grookey`)
  public static readonly Thwackey = Species.#impl.of(811, `Thwackey`)
  public static readonly Rillaboom = Species.#impl.of(812, `Rillaboom`)
  public static readonly Scorbunny = Species.#impl.of(813, `Scorbunny`)
  public static readonly Raboot = Species.#impl.of(814, `Raboot`)
  public static readonly Cinderace = Species.#impl.of(815, `Cinderace`)
  public static readonly Sobble = Species.#impl.of(816, `Sobble`)
  public static readonly Drizzile = Species.#impl.of(817, `Drizzile`)
  public static readonly Inteleon = Species.#impl.of(818, `Inteleon`)
  public static readonly Skwovet = Species.#impl.of(819, `Skwovet`)
  public static readonly Greedent = Species.#impl.of(820, `Greedent`)
  public static readonly Rookidee = Species.#impl.of(821, `Rookidee`)
  public static readonly Corvisquire = Species.#impl.of(822, `Corvisquire`)
  public static readonly Corviknight = Species.#impl.of(823, `Corviknight`)
  public static readonly Blipbug = Species.#impl.of(824, `Blipbug`)
  public static readonly Dottler = Species.#impl.of(825, `Dottler`)
  public static readonly Orbeetle = Species.#impl.of(826, `Orbeetle`)
  public static readonly Nickit = Species.#impl.of(827, `Nickit`)
  public static readonly Thievul = Species.#impl.of(828, `Thievul`)
  public static readonly Gossifleur = Species.#impl.of(829, `Gossifleur`)
  public static readonly Eldegoss = Species.#impl.of(830, `Eldegoss`)
  public static readonly Wooloo = Species.#impl.of(831, `Wooloo`)
  public static readonly Dubwool = Species.#impl.of(832, `Dubwool`)
  public static readonly Chewtle = Species.#impl.of(833, `Chewtle`)
  public static readonly Drednaw = Species.#impl.of(834, `Drednaw`)
  public static readonly Yamper = Species.#impl.of(835, `Yamper`)
  public static readonly Boltund = Species.#impl.of(836, `Boltund`)
  public static readonly Rolycoly = Species.#impl.of(837, `Rolycoly`)
  public static readonly Carkol = Species.#impl.of(838, `Carkol`)
  public static readonly Coalossal = Species.#impl.of(839, `Coalossal`)
  public static readonly Applin = Species.#impl.of(840, `Applin`)
  public static readonly Flapple = Species.#impl.of(841, `Flapple`)
  public static readonly Appletun = Species.#impl.of(842, `Appletun`)
  public static readonly Silicobra = Species.#impl.of(843, `Silicobra`)
  public static readonly Sandaconda = Species.#impl.of(844, `Sandaconda`)
  public static readonly Cramorant = Species.#impl.of(845, `Cramorant`)
  public static readonly Arrokuda = Species.#impl.of(846, `Arrokuda`)
  public static readonly Barraskewda = Species.#impl.of(847, `Barraskewda`)
  public static readonly Toxel = Species.#impl.of(848, `Toxel`)
  public static readonly Toxtricity = Species.#impl.of(849, `Toxtricity`)
  public static readonly Sizzlipede = Species.#impl.of(850, `Sizzlipede`)
  public static readonly Centiskorch = Species.#impl.of(851, `Centiskorch`)
  public static readonly Clobbopus = Species.#impl.of(852, `Clobbopus`)
  public static readonly Grapploct = Species.#impl.of(853, `Grapploct`)
  public static readonly Sinistea = Species.#impl.of(854, `Sinistea`)
  public static readonly Polteageist = Species.#impl.of(855, `Polteageist`)
  public static readonly Hatenna = Species.#impl.of(856, `Hatenna`)
  public static readonly Hattrem = Species.#impl.of(857, `Hattrem`)
  public static readonly Hatterene = Species.#impl.of(858, `Hatterene`)
  public static readonly Impidimp = Species.#impl.of(859, `Impidimp`)
  public static readonly Morgrem = Species.#impl.of(860, `Morgrem`)
  public static readonly Grimmsnarl = Species.#impl.of(861, `Grimmsnarl`)
  public static readonly Obstagoon = Species.#impl.of(862, `Obstagoon`)
  public static readonly Perrserker = Species.#impl.of(863, `Perrserker`)
  public static readonly Cursola = Species.#impl.of(864, `Cursola`)
  public static readonly Sirfetchd = Species.#impl.of(865, `Sirfetchd`)
  public static readonly MrRime = Species.#impl.of(866, `MrRime`)
  public static readonly Runerigus = Species.#impl.of(867, `Runerigus`)
  public static readonly Milcery = Species.#impl.of(868, `Milcery`)
  public static readonly Alcremie = Species.#impl.of(869, `Alcremie`)
  public static readonly Falinks = Species.#impl.of(870, `Falinks`)
  public static readonly Pincurchin = Species.#impl.of(871, `Pincurchin`)
  public static readonly Snom = Species.#impl.of(872, `Snom`)
  public static readonly Frosmoth = Species.#impl.of(873, `Frosmoth`)
  public static readonly Stonjourner = Species.#impl.of(874, `Stonjourner`)
  public static readonly Eiscue = Species.#impl.of(875, `Eiscue`)
  public static readonly Indeedee = Species.#impl.of(876, `Indeedee`)
  public static readonly Morpeko = Species.#impl.of(877, `Morpeko`)
  public static readonly Cufant = Species.#impl.of(878, `Cufant`)
  public static readonly Copperajah = Species.#impl.of(879, `Copperajah`)
  public static readonly Dracozolt = Species.#impl.of(880, `Dracozolt`)
  public static readonly Arctozolt = Species.#impl.of(881, `Arctozolt`)
  public static readonly Dracovish = Species.#impl.of(882, `Dracovish`)
  public static readonly Arctovish = Species.#impl.of(883, `Arctovish`)
  public static readonly Duraludon = Species.#impl.of(884, `Duraludon`)
  public static readonly Dreepy = Species.#impl.of(885, `Dreepy`)
  public static readonly Drakloak = Species.#impl.of(886, `Drakloak`)
  public static readonly Dragapult = Species.#impl.of(887, `Dragapult`)
  public static readonly Zacian = Species.#impl.of(888, `Zacian`)
  public static readonly Zamazenta = Species.#impl.of(889, `Zamazenta`)
  public static readonly Eternatus = Species.#impl.of(890, `Eternatus`)
  public static readonly Kubfu = Species.#impl.of(891, `Kubfu`)
  public static readonly Urshifu = Species.#impl.of(892, `Urshifu`)
  public static readonly Zarude = Species.#impl.of(893, `Zarude`)
  public static readonly Regieleki = Species.#impl.of(894, `Regieleki`)
  public static readonly Regidrago = Species.#impl.of(895, `Regidrago`)
  public static readonly Glastrier = Species.#impl.of(896, `Glastrier`)
  public static readonly Spectrier = Species.#impl.of(897, `Spectrier`)
  public static readonly Calyrex = Species.#impl.of(898, `Calyrex`)
  public static readonly Wyrdeer = Species.#impl.of(899, `Wyrdeer`)
  public static readonly Kleavor = Species.#impl.of(900, `Kleavor`)
  public static readonly Ursaluna = Species.#impl.of(901, `Ursaluna`)
  public static readonly Basculegion = Species.#impl.of(902, `Basculegion`)
  public static readonly Sneasler = Species.#impl.of(903, `Sneasler`)
  public static readonly Overqwil = Species.#impl.of(904, `Overqwil`)
  public static readonly Enamorus = Species.#impl.of(905, `Enamorus`)

  /**
   * Generation IX Pokémon species. (906-???)
   */
  public static readonly Sprigatito = Species.#impl.of(906, `Sprigatito`)
  public static readonly Fuecoco = Species.#impl.of(907, `Fuecoco`)
  public static readonly Quaxly = Species.#impl.of(908, `Quaxly`)

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
        pokemon.getTranslation().get().toLowerCase() === name.toLowerCase()
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
   * Gets the translatable name of the species.
   *
   * @returns {Translation} The translatable name of the species
   */
  public abstract getTranslation(): Translation

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
