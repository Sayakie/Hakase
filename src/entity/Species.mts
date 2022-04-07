import i18next from 'i18next'

import { type Comparable, Util } from '../index.mjs'

export abstract class Species implements Comparable {
  private static readonly $impl = class extends Species {
    public static readonly legendaries: Set<Species> = new Set()
    public static readonly ultrabeasts: Set<Species> = new Set()
    public static readonly allPokemons: Set<Species> = new Set()

    protected constructor(
      protected readonly dex: number,
      protected readonly name: string
    ) {
      super()

      Species.$impl.allPokemons.add(this)
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

      return new Species.$impl(dex, name)
    }

    public isLegendary(): boolean {
      return Species.$impl.legendaries.has(this)
    }

    public isUltraBeast(): boolean {
      return Species.$impl.ultrabeasts.has(this)
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
  public static readonly MissingNo = this.$impl.of(0, 'MissingNo')
  public static readonly Bulbasaur = this.$impl.of(1, 'Bulbasaur')
  public static readonly Ivysaur = this.$impl.of(2, 'Ivysaur')
  public static readonly Venusaur = this.$impl.of(3, 'Venusaur')
  public static readonly Charmander = this.$impl.of(4, 'Charmander')
  public static readonly Charmeleon = this.$impl.of(5, 'Charmeleon')
  public static readonly Charizard = this.$impl.of(6, 'Charizard')
  public static readonly Squirtle = this.$impl.of(7, 'Squirtle')
  public static readonly Wartortle = this.$impl.of(8, 'Wartortle')
  public static readonly Blastoise = this.$impl.of(9, 'Blastoise')
  public static readonly Caterpie = this.$impl.of(10, 'Caterpie')
  public static readonly Metapod = this.$impl.of(11, 'Metapod')
  public static readonly Butterfree = this.$impl.of(12, 'Butterfree')
  public static readonly Weedle = this.$impl.of(13, 'Weedle')
  public static readonly Kakuna = this.$impl.of(14, 'Kakuna')
  public static readonly Beedrill = this.$impl.of(15, 'Beedrill')
  public static readonly Pidgey = this.$impl.of(16, 'Pidgey')
  public static readonly Pidgeotto = this.$impl.of(17, 'Pidgeotto')
  public static readonly Pidgeot = this.$impl.of(18, 'Pidgeot')
  public static readonly Rattata = this.$impl.of(19, 'Rattata')
  public static readonly Raticate = this.$impl.of(20, 'Raticate')
  public static readonly Spearow = this.$impl.of(21, 'Spearow')
  public static readonly Fearow = this.$impl.of(22, 'Fearow')
  public static readonly Ekans = this.$impl.of(23, 'Ekans')
  public static readonly Arbok = this.$impl.of(24, 'Arbok')
  public static readonly Pikachu = this.$impl.of(25, 'Pikachu')
  public static readonly Raichu = this.$impl.of(26, 'Raichu')
  public static readonly Sandshrew = this.$impl.of(27, 'Sandshrew')
  public static readonly Sandslash = this.$impl.of(28, 'Sandslash')
  public static readonly Nidoranfemale = this.$impl.of(29, 'Nidoranfemale')
  public static readonly Nidorina = this.$impl.of(30, 'Nidorina')
  public static readonly Nidoqueen = this.$impl.of(31, 'Nidoqueen')
  public static readonly Nidoranmale = this.$impl.of(32, 'Nidoranmale')
  public static readonly Nidorino = this.$impl.of(33, 'Nidorino')
  public static readonly Nidoking = this.$impl.of(34, 'Nidoking')
  public static readonly Clefairy = this.$impl.of(35, 'Clefairy')
  public static readonly Clefable = this.$impl.of(36, 'Clefable')
  public static readonly Vulpix = this.$impl.of(37, 'Vulpix')
  public static readonly Ninetales = this.$impl.of(38, 'Ninetales')
  public static readonly Jigglypuff = this.$impl.of(39, 'Jigglypuff')
  public static readonly Wigglytuff = this.$impl.of(40, 'Wigglytuff')
  public static readonly Zubat = this.$impl.of(41, 'Zubat')
  public static readonly Golbat = this.$impl.of(42, 'Golbat')
  public static readonly Oddish = this.$impl.of(43, 'Oddish')
  public static readonly Gloom = this.$impl.of(44, 'Gloom')
  public static readonly Vileplume = this.$impl.of(45, 'Vileplume')
  public static readonly Paras = this.$impl.of(46, 'Paras')
  public static readonly Parasect = this.$impl.of(47, 'Parasect')
  public static readonly Venonat = this.$impl.of(48, 'Venonat')
  public static readonly Venomoth = this.$impl.of(49, 'Venomoth')
  public static readonly Diglett = this.$impl.of(50, 'Diglett')
  public static readonly Dugtrio = this.$impl.of(51, 'Dugtrio')
  public static readonly Meowth = this.$impl.of(52, 'Meowth')
  public static readonly Persian = this.$impl.of(53, 'Persian')
  public static readonly Psyduck = this.$impl.of(54, 'Psyduck')
  public static readonly Golduck = this.$impl.of(55, 'Golduck')
  public static readonly Mankey = this.$impl.of(56, 'Mankey')
  public static readonly Primeape = this.$impl.of(57, 'Primeape')
  public static readonly Growlithe = this.$impl.of(58, 'Growlithe')
  public static readonly Arcanine = this.$impl.of(59, 'Arcanine')
  public static readonly Poliwag = this.$impl.of(60, 'Poliwag')
  public static readonly Poliwhirl = this.$impl.of(61, 'Poliwhirl')
  public static readonly Poliwrath = this.$impl.of(62, 'Poliwrath')
  public static readonly Abra = this.$impl.of(63, 'Abra')
  public static readonly Kadabra = this.$impl.of(64, 'Kadabra')
  public static readonly Alakazam = this.$impl.of(65, 'Alakazam')
  public static readonly Machop = this.$impl.of(66, 'Machop')
  public static readonly Machoke = this.$impl.of(67, 'Machoke')
  public static readonly Machamp = this.$impl.of(68, 'Machamp')
  public static readonly Bellsprout = this.$impl.of(69, 'Bellsprout')
  public static readonly Weepinbell = this.$impl.of(70, 'Weepinbell')
  public static readonly Victreebel = this.$impl.of(71, 'Victreebel')
  public static readonly Tentacool = this.$impl.of(72, 'Tentacool')
  public static readonly Tentacruel = this.$impl.of(73, 'Tentacruel')
  public static readonly Geodude = this.$impl.of(74, 'Geodude')
  public static readonly Graveler = this.$impl.of(75, 'Graveler')
  public static readonly Golem = this.$impl.of(76, 'Golem')
  public static readonly Ponyta = this.$impl.of(77, 'Ponyta')
  public static readonly Rapidash = this.$impl.of(78, 'Rapidash')
  public static readonly Slowpoke = this.$impl.of(79, 'Slowpoke')
  public static readonly Slowbro = this.$impl.of(80, 'Slowbro')
  public static readonly Magnemite = this.$impl.of(81, 'Magnemite')
  public static readonly Magneton = this.$impl.of(82, 'Magneton')
  public static readonly Farfetchd = this.$impl.of(83, 'Farfetchd')
  public static readonly Doduo = this.$impl.of(84, 'Doduo')
  public static readonly Dodrio = this.$impl.of(85, 'Dodrio')
  public static readonly Seel = this.$impl.of(86, 'Seel')
  public static readonly Dewgong = this.$impl.of(87, 'Dewgong')
  public static readonly Grimer = this.$impl.of(88, 'Grimer')
  public static readonly Muk = this.$impl.of(89, 'Muk')
  public static readonly Shellder = this.$impl.of(90, 'Shellder')
  public static readonly Cloyster = this.$impl.of(91, 'Cloyster')
  public static readonly Gastly = this.$impl.of(92, 'Gastly')
  public static readonly Haunter = this.$impl.of(93, 'Haunter')
  public static readonly Gengar = this.$impl.of(94, 'Gengar')
  public static readonly Onix = this.$impl.of(95, 'Onix')
  public static readonly Drowzee = this.$impl.of(96, 'Drowzee')
  public static readonly Hypno = this.$impl.of(97, 'Hypno')
  public static readonly Krabby = this.$impl.of(98, 'Krabby')
  public static readonly Kingler = this.$impl.of(99, 'Kingler')
  public static readonly Voltorb = this.$impl.of(100, 'Voltorb')
  public static readonly Electrode = this.$impl.of(101, 'Electrode')
  public static readonly Exeggcute = this.$impl.of(102, 'Exeggcute')
  public static readonly Exeggutor = this.$impl.of(103, 'Exeggutor')
  public static readonly Cubone = this.$impl.of(104, 'Cubone')
  public static readonly Marowak = this.$impl.of(105, 'Marowak')
  public static readonly Hitmonlee = this.$impl.of(106, 'Hitmonlee')
  public static readonly Hitmonchan = this.$impl.of(107, 'Hitmonchan')
  public static readonly Lickitung = this.$impl.of(108, 'Lickitung')
  public static readonly Koffing = this.$impl.of(109, 'Koffing')
  public static readonly Weezing = this.$impl.of(110, 'Weezing')
  public static readonly Rhyhorn = this.$impl.of(111, 'Rhyhorn')
  public static readonly Rhydon = this.$impl.of(112, 'Rhydon')
  public static readonly Chansey = this.$impl.of(113, 'Chansey')
  public static readonly Tangela = this.$impl.of(114, 'Tangela')
  public static readonly Kangaskhan = this.$impl.of(115, 'Kangaskhan')
  public static readonly Horsea = this.$impl.of(116, 'Horsea')
  public static readonly Seadra = this.$impl.of(117, 'Seadra')
  public static readonly Goldeen = this.$impl.of(118, 'Goldeen')
  public static readonly Seaking = this.$impl.of(119, 'Seaking')
  public static readonly Staryu = this.$impl.of(120, 'Staryu')
  public static readonly Starmie = this.$impl.of(121, 'Starmie')
  public static readonly MrMime = this.$impl.of(122, 'MrMime')
  public static readonly Scyther = this.$impl.of(123, 'Scyther')
  public static readonly Jynx = this.$impl.of(124, 'Jynx')
  public static readonly Electabuzz = this.$impl.of(125, 'Electabuzz')
  public static readonly Magmar = this.$impl.of(126, 'Magmar')
  public static readonly Pinsir = this.$impl.of(127, 'Pinsir')
  public static readonly Tauros = this.$impl.of(128, 'Tauros')
  public static readonly Magikarp = this.$impl.of(129, 'Magikarp')
  public static readonly Gyarados = this.$impl.of(130, 'Gyarados')
  public static readonly Lapras = this.$impl.of(131, 'Lapras')
  public static readonly Ditto = this.$impl.of(132, 'Ditto')
  public static readonly Eevee = this.$impl.of(133, 'Eevee')
  public static readonly Vaporeon = this.$impl.of(134, 'Vaporeon')
  public static readonly Jolteon = this.$impl.of(135, 'Jolteon')
  public static readonly Flareon = this.$impl.of(136, 'Flareon')
  public static readonly Porygon = this.$impl.of(137, 'Porygon')
  public static readonly Omanyte = this.$impl.of(138, 'Omanyte')
  public static readonly Omastar = this.$impl.of(139, 'Omastar')
  public static readonly Kabuto = this.$impl.of(140, 'Kabuto')
  public static readonly Kabutops = this.$impl.of(141, 'Kabutops')
  public static readonly Aerodactyl = this.$impl.of(142, 'Aerodactyl')
  public static readonly Snorlax = this.$impl.of(143, 'Snorlax')
  public static readonly Articuno = this.$impl.of(144, 'Articuno')
  public static readonly Zapdos = this.$impl.of(145, 'Zapdos')
  public static readonly Moltres = this.$impl.of(146, 'Moltres')
  public static readonly Dratini = this.$impl.of(147, 'Dratini')
  public static readonly Dragonair = this.$impl.of(148, 'Dragonair')
  public static readonly Dragonite = this.$impl.of(149, 'Dragonite')
  public static readonly Mewtwo = this.$impl.of(150, 'Mewtwo')
  public static readonly Mew = this.$impl.of(151, 'Mew')
  public static readonly Chikorita = this.$impl.of(152, 'Chikorita')
  public static readonly Bayleef = this.$impl.of(153, 'Bayleef')
  public static readonly Meganium = this.$impl.of(154, 'Meganium')
  public static readonly Cyndaquil = this.$impl.of(155, 'Cyndaquil')
  public static readonly Quilava = this.$impl.of(156, 'Quilava')
  public static readonly Typhlosion = this.$impl.of(157, 'Typhlosion')
  public static readonly Totodile = this.$impl.of(158, 'Totodile')
  public static readonly Croconaw = this.$impl.of(159, 'Croconaw')
  public static readonly Feraligatr = this.$impl.of(160, 'Feraligatr')
  public static readonly Sentret = this.$impl.of(161, 'Sentret')
  public static readonly Furret = this.$impl.of(162, 'Furret')
  public static readonly Hoothoot = this.$impl.of(163, 'Hoothoot')
  public static readonly Noctowl = this.$impl.of(164, 'Noctowl')
  public static readonly Ledyba = this.$impl.of(165, 'Ledyba')
  public static readonly Ledian = this.$impl.of(166, 'Ledian')
  public static readonly Spinarak = this.$impl.of(167, 'Spinarak')
  public static readonly Ariados = this.$impl.of(168, 'Ariados')
  public static readonly Crobat = this.$impl.of(169, 'Crobat')
  public static readonly Chinchou = this.$impl.of(170, 'Chinchou')
  public static readonly Lanturn = this.$impl.of(171, 'Lanturn')
  public static readonly Pichu = this.$impl.of(172, 'Pichu')
  public static readonly Cleffa = this.$impl.of(173, 'Cleffa')
  public static readonly Igglybuff = this.$impl.of(174, 'Igglybuff')
  public static readonly Togepi = this.$impl.of(175, 'Togepi')
  public static readonly Togetic = this.$impl.of(176, 'Togetic')
  public static readonly Natu = this.$impl.of(177, 'Natu')
  public static readonly Xatu = this.$impl.of(178, 'Xatu')
  public static readonly Mareep = this.$impl.of(179, 'Mareep')
  public static readonly Flaaffy = this.$impl.of(180, 'Flaaffy')
  public static readonly Ampharos = this.$impl.of(181, 'Ampharos')
  public static readonly Bellossom = this.$impl.of(182, 'Bellossom')
  public static readonly Marill = this.$impl.of(183, 'Marill')
  public static readonly Azumarill = this.$impl.of(184, 'Azumarill')
  public static readonly Sudowoodo = this.$impl.of(185, 'Sudowoodo')
  public static readonly Politoed = this.$impl.of(186, 'Politoed')
  public static readonly Hoppip = this.$impl.of(187, 'Hoppip')
  public static readonly Skiploom = this.$impl.of(188, 'Skiploom')
  public static readonly Jumpluff = this.$impl.of(189, 'Jumpluff')
  public static readonly Aipom = this.$impl.of(190, 'Aipom')
  public static readonly Sunkern = this.$impl.of(191, 'Sunkern')
  public static readonly Sunflora = this.$impl.of(192, 'Sunflora')
  public static readonly Yanma = this.$impl.of(193, 'Yanma')
  public static readonly Wooper = this.$impl.of(194, 'Wooper')
  public static readonly Quagsire = this.$impl.of(195, 'Quagsire')
  public static readonly Espeon = this.$impl.of(196, 'Espeon')
  public static readonly Umbreon = this.$impl.of(197, 'Umbreon')
  public static readonly Murkrow = this.$impl.of(198, 'Murkrow')
  public static readonly Slowking = this.$impl.of(199, 'Slowking')
  public static readonly Misdreavus = this.$impl.of(200, 'Misdreavus')
  public static readonly Unown = this.$impl.of(201, 'Unown')
  public static readonly Wobbuffet = this.$impl.of(202, 'Wobbuffet')
  public static readonly Girafarig = this.$impl.of(203, 'Girafarig')
  public static readonly Pineco = this.$impl.of(204, 'Pineco')
  public static readonly Forretress = this.$impl.of(205, 'Forretress')
  public static readonly Dunsparce = this.$impl.of(206, 'Dunsparce')
  public static readonly Gligar = this.$impl.of(207, 'Gligar')
  public static readonly Steelix = this.$impl.of(208, 'Steelix')
  public static readonly Snubbull = this.$impl.of(209, 'Snubbull')
  public static readonly Granbull = this.$impl.of(210, 'Granbull')
  public static readonly Qwilfish = this.$impl.of(211, 'Qwilfish')
  public static readonly Scizor = this.$impl.of(212, 'Scizor')
  public static readonly Shuckle = this.$impl.of(213, 'Shuckle')
  public static readonly Heracross = this.$impl.of(214, 'Heracross')
  public static readonly Sneasel = this.$impl.of(215, 'Sneasel')
  public static readonly Teddiursa = this.$impl.of(216, 'Teddiursa')
  public static readonly Ursaring = this.$impl.of(217, 'Ursaring')
  public static readonly Slugma = this.$impl.of(218, 'Slugma')
  public static readonly Magcargo = this.$impl.of(219, 'Magcargo')
  public static readonly Swinub = this.$impl.of(220, 'Swinub')
  public static readonly Piloswine = this.$impl.of(221, 'Piloswine')
  public static readonly Corsola = this.$impl.of(222, 'Corsola')
  public static readonly Remoraid = this.$impl.of(223, 'Remoraid')
  public static readonly Octillery = this.$impl.of(224, 'Octillery')
  public static readonly Delibird = this.$impl.of(225, 'Delibird')
  public static readonly Mantine = this.$impl.of(226, 'Mantine')
  public static readonly Skarmory = this.$impl.of(227, 'Skarmory')
  public static readonly Houndour = this.$impl.of(228, 'Houndour')
  public static readonly Houndoom = this.$impl.of(229, 'Houndoom')
  public static readonly Kingdra = this.$impl.of(230, 'Kingdra')
  public static readonly Phanpy = this.$impl.of(231, 'Phanpy')
  public static readonly Donphan = this.$impl.of(232, 'Donphan')
  public static readonly Porygon2 = this.$impl.of(233, 'Porygon2')
  public static readonly Stantler = this.$impl.of(234, 'Stantler')
  public static readonly Smeargle = this.$impl.of(235, 'Smeargle')
  public static readonly Tyrogue = this.$impl.of(236, 'Tyrogue')
  public static readonly Hitmontop = this.$impl.of(237, 'Hitmontop')
  public static readonly Smoochum = this.$impl.of(238, 'Smoochum')
  public static readonly Elekid = this.$impl.of(239, 'Elekid')
  public static readonly Magby = this.$impl.of(240, 'Magby')
  public static readonly Miltank = this.$impl.of(241, 'Miltank')
  public static readonly Blissey = this.$impl.of(242, 'Blissey')
  public static readonly Raikou = this.$impl.of(243, 'Raikou')
  public static readonly Entei = this.$impl.of(244, 'Entei')
  public static readonly Suicune = this.$impl.of(245, 'Suicune')
  public static readonly Larvitar = this.$impl.of(246, 'Larvitar')
  public static readonly Pupitar = this.$impl.of(247, 'Pupitar')
  public static readonly Tyranitar = this.$impl.of(248, 'Tyranitar')
  public static readonly Lugia = this.$impl.of(249, 'Lugia')
  public static readonly Hooh = this.$impl.of(250, 'Ho-Oh')
  public static readonly Celebi = this.$impl.of(251, 'Celebi')
  public static readonly Treecko = this.$impl.of(252, 'Treecko')
  public static readonly Grovyle = this.$impl.of(253, 'Grovyle')
  public static readonly Sceptile = this.$impl.of(254, 'Sceptile')
  public static readonly Torchic = this.$impl.of(255, 'Torchic')
  public static readonly Combusken = this.$impl.of(256, 'Combusken')
  public static readonly Blaziken = this.$impl.of(257, 'Blaziken')
  public static readonly Mudkip = this.$impl.of(258, 'Mudkip')
  public static readonly Marshtomp = this.$impl.of(259, 'Marshtomp')
  public static readonly Swampert = this.$impl.of(260, 'Swampert')
  public static readonly Poochyena = this.$impl.of(261, 'Poochyena')
  public static readonly Mightyena = this.$impl.of(262, 'Mightyena')
  public static readonly Zigzagoon = this.$impl.of(263, 'Zigzagoon')
  public static readonly Linoone = this.$impl.of(264, 'Linoone')
  public static readonly Wurmple = this.$impl.of(265, 'Wurmple')
  public static readonly Silcoon = this.$impl.of(266, 'Silcoon')
  public static readonly Beautifly = this.$impl.of(267, 'Beautifly')
  public static readonly Cascoon = this.$impl.of(268, 'Cascoon')
  public static readonly Dustox = this.$impl.of(269, 'Dustox')
  public static readonly Lotad = this.$impl.of(270, 'Lotad')
  public static readonly Lombre = this.$impl.of(271, 'Lombre')
  public static readonly Ludicolo = this.$impl.of(272, 'Ludicolo')
  public static readonly Seedot = this.$impl.of(273, 'Seedot')
  public static readonly Nuzleaf = this.$impl.of(274, 'Nuzleaf')
  public static readonly Shiftry = this.$impl.of(275, 'Shiftry')
  public static readonly Taillow = this.$impl.of(276, 'Taillow')
  public static readonly Swellow = this.$impl.of(277, 'Swellow')
  public static readonly Wingull = this.$impl.of(278, 'Wingull')
  public static readonly Pelipper = this.$impl.of(279, 'Pelipper')
  public static readonly Ralts = this.$impl.of(280, 'Ralts')
  public static readonly Kirlia = this.$impl.of(281, 'Kirlia')
  public static readonly Gardevoir = this.$impl.of(282, 'Gardevoir')
  public static readonly Surskit = this.$impl.of(283, 'Surskit')
  public static readonly Masquerain = this.$impl.of(284, 'Masquerain')
  public static readonly Shroomish = this.$impl.of(285, 'Shroomish')
  public static readonly Breloom = this.$impl.of(286, 'Breloom')
  public static readonly Slakoth = this.$impl.of(287, 'Slakoth')
  public static readonly Vigoroth = this.$impl.of(288, 'Vigoroth')
  public static readonly Slaking = this.$impl.of(289, 'Slaking')
  public static readonly Nincada = this.$impl.of(290, 'Nincada')
  public static readonly Ninjask = this.$impl.of(291, 'Ninjask')
  public static readonly Shedinja = this.$impl.of(292, 'Shedinja')
  public static readonly Whismur = this.$impl.of(293, 'Whismur')
  public static readonly Loudred = this.$impl.of(294, 'Loudred')
  public static readonly Exploud = this.$impl.of(295, 'Exploud')
  public static readonly Makuhita = this.$impl.of(296, 'Makuhita')
  public static readonly Hariyama = this.$impl.of(297, 'Hariyama')
  public static readonly Azurill = this.$impl.of(298, 'Azurill')
  public static readonly Nosepass = this.$impl.of(299, 'Nosepass')
  public static readonly Skitty = this.$impl.of(300, 'Skitty')
  public static readonly Delcatty = this.$impl.of(301, 'Delcatty')
  public static readonly Sableye = this.$impl.of(302, 'Sableye')
  public static readonly Mawile = this.$impl.of(303, 'Mawile')
  public static readonly Aron = this.$impl.of(304, 'Aron')
  public static readonly Lairon = this.$impl.of(305, 'Lairon')
  public static readonly Aggron = this.$impl.of(306, 'Aggron')
  public static readonly Meditite = this.$impl.of(307, 'Meditite')
  public static readonly Medicham = this.$impl.of(308, 'Medicham')
  public static readonly Electrike = this.$impl.of(309, 'Electrike')
  public static readonly Manectric = this.$impl.of(310, 'Manectric')
  public static readonly Plusle = this.$impl.of(311, 'Plusle')
  public static readonly Minun = this.$impl.of(312, 'Minun')
  public static readonly Volbeat = this.$impl.of(313, 'Volbeat')
  public static readonly Illumise = this.$impl.of(314, 'Illumise')
  public static readonly Roselia = this.$impl.of(315, 'Roselia')
  public static readonly Gulpin = this.$impl.of(316, 'Gulpin')
  public static readonly Swalot = this.$impl.of(317, 'Swalot')
  public static readonly Carvanha = this.$impl.of(318, 'Carvanha')
  public static readonly Sharpedo = this.$impl.of(319, 'Sharpedo')
  public static readonly Wailmer = this.$impl.of(320, 'Wailmer')
  public static readonly Wailord = this.$impl.of(321, 'Wailord')
  public static readonly Numel = this.$impl.of(322, 'Numel')
  public static readonly Camerupt = this.$impl.of(323, 'Camerupt')
  public static readonly Torkoal = this.$impl.of(324, 'Torkoal')
  public static readonly Spoink = this.$impl.of(325, 'Spoink')
  public static readonly Grumpig = this.$impl.of(326, 'Grumpig')
  public static readonly Spinda = this.$impl.of(327, 'Spinda')
  public static readonly Trapinch = this.$impl.of(328, 'Trapinch')
  public static readonly Vibrava = this.$impl.of(329, 'Vibrava')
  public static readonly Flygon = this.$impl.of(330, 'Flygon')
  public static readonly Cacnea = this.$impl.of(331, 'Cacnea')
  public static readonly Cacturne = this.$impl.of(332, 'Cacturne')
  public static readonly Swablu = this.$impl.of(333, 'Swablu')
  public static readonly Altaria = this.$impl.of(334, 'Altaria')
  public static readonly Zangoose = this.$impl.of(335, 'Zangoose')
  public static readonly Seviper = this.$impl.of(336, 'Seviper')
  public static readonly Lunatone = this.$impl.of(337, 'Lunatone')
  public static readonly Solrock = this.$impl.of(338, 'Solrock')
  public static readonly Barboach = this.$impl.of(339, 'Barboach')
  public static readonly Whiscash = this.$impl.of(340, 'Whiscash')
  public static readonly Corphish = this.$impl.of(341, 'Corphish')
  public static readonly Crawdaunt = this.$impl.of(342, 'Crawdaunt')
  public static readonly Baltoy = this.$impl.of(343, 'Baltoy')
  public static readonly Claydol = this.$impl.of(344, 'Claydol')
  public static readonly Lileep = this.$impl.of(345, 'Lileep')
  public static readonly Cradily = this.$impl.of(346, 'Cradily')
  public static readonly Anorith = this.$impl.of(347, 'Anorith')
  public static readonly Armaldo = this.$impl.of(348, 'Armaldo')
  public static readonly Feebas = this.$impl.of(349, 'Feebas')
  public static readonly Milotic = this.$impl.of(350, 'Milotic')
  public static readonly Castform = this.$impl.of(351, 'Castform')
  public static readonly Kecleon = this.$impl.of(352, 'Kecleon')
  public static readonly Shuppet = this.$impl.of(353, 'Shuppet')
  public static readonly Banette = this.$impl.of(354, 'Banette')
  public static readonly Duskull = this.$impl.of(355, 'Duskull')
  public static readonly Dusclops = this.$impl.of(356, 'Dusclops')
  public static readonly Tropius = this.$impl.of(357, 'Tropius')
  public static readonly Chimecho = this.$impl.of(358, 'Chimecho')
  public static readonly Absol = this.$impl.of(359, 'Absol')
  public static readonly Wynaut = this.$impl.of(360, 'Wynaut')
  public static readonly Snorunt = this.$impl.of(361, 'Snorunt')
  public static readonly Glalie = this.$impl.of(362, 'Glalie')
  public static readonly Spheal = this.$impl.of(363, 'Spheal')
  public static readonly Sealeo = this.$impl.of(364, 'Sealeo')
  public static readonly Walrein = this.$impl.of(365, 'Walrein')
  public static readonly Clamperl = this.$impl.of(366, 'Clamperl')
  public static readonly Huntail = this.$impl.of(367, 'Huntail')
  public static readonly Gorebyss = this.$impl.of(368, 'Gorebyss')
  public static readonly Relicanth = this.$impl.of(369, 'Relicanth')
  public static readonly Luvdisc = this.$impl.of(370, 'Luvdisc')
  public static readonly Bagon = this.$impl.of(371, 'Bagon')
  public static readonly Shelgon = this.$impl.of(372, 'Shelgon')
  public static readonly Salamence = this.$impl.of(373, 'Salamence')
  public static readonly Beldum = this.$impl.of(374, 'Beldum')
  public static readonly Metang = this.$impl.of(375, 'Metang')
  public static readonly Metagross = this.$impl.of(376, 'Metagross')
  public static readonly Regirock = this.$impl.of(377, 'Regirock')
  public static readonly Regice = this.$impl.of(378, 'Regice')
  public static readonly Registeel = this.$impl.of(379, 'Registeel')
  public static readonly Latias = this.$impl.of(380, 'Latias')
  public static readonly Latios = this.$impl.of(381, 'Latios')
  public static readonly Kyogre = this.$impl.of(382, 'Kyogre')
  public static readonly Groudon = this.$impl.of(383, 'Groudon')
  public static readonly Rayquaza = this.$impl.of(384, 'Rayquaza')
  public static readonly Jirachi = this.$impl.of(385, 'Jirachi')
  public static readonly Deoxys = this.$impl.of(386, 'Deoxys')
  public static readonly Turtwig = this.$impl.of(387, 'Turtwig')
  public static readonly Grotle = this.$impl.of(388, 'Grotle')
  public static readonly Torterra = this.$impl.of(389, 'Torterra')
  public static readonly Chimchar = this.$impl.of(390, 'Chimchar')
  public static readonly Monferno = this.$impl.of(391, 'Monferno')
  public static readonly Infernape = this.$impl.of(392, 'Infernape')
  public static readonly Piplup = this.$impl.of(393, 'Piplup')
  public static readonly Prinplup = this.$impl.of(394, 'Prinplup')
  public static readonly Empoleon = this.$impl.of(395, 'Empoleon')
  public static readonly Starly = this.$impl.of(396, 'Starly')
  public static readonly Staravia = this.$impl.of(397, 'Staravia')
  public static readonly Staraptor = this.$impl.of(398, 'Staraptor')
  public static readonly Bidoof = this.$impl.of(399, 'Bidoof')
  public static readonly Bibarel = this.$impl.of(400, 'Bibarel')
  public static readonly Kricketot = this.$impl.of(401, 'Kricketot')
  public static readonly Kricketune = this.$impl.of(402, 'Kricketune')
  public static readonly Shinx = this.$impl.of(403, 'Shinx')
  public static readonly Luxio = this.$impl.of(404, 'Luxio')
  public static readonly Luxray = this.$impl.of(405, 'Luxray')
  public static readonly Budew = this.$impl.of(406, 'Budew')
  public static readonly Roserade = this.$impl.of(407, 'Roserade')
  public static readonly Cranidos = this.$impl.of(408, 'Cranidos')
  public static readonly Rampardos = this.$impl.of(409, 'Rampardos')
  public static readonly Shieldon = this.$impl.of(410, 'Shieldon')
  public static readonly Bastiodon = this.$impl.of(411, 'Bastiodon')
  public static readonly Burmy = this.$impl.of(412, 'Burmy')
  public static readonly Wormadam = this.$impl.of(413, 'Wormadam')
  public static readonly Mothim = this.$impl.of(414, 'Mothim')
  public static readonly Combee = this.$impl.of(415, 'Combee')
  public static readonly Vespiquen = this.$impl.of(416, 'Vespiquen')
  public static readonly Pachirisu = this.$impl.of(417, 'Pachirisu')
  public static readonly Buizel = this.$impl.of(418, 'Buizel')
  public static readonly Floatzel = this.$impl.of(419, 'Floatzel')
  public static readonly Cherubi = this.$impl.of(420, 'Cherubi')
  public static readonly Cherrim = this.$impl.of(421, 'Cherrim')
  public static readonly Shellos = this.$impl.of(422, 'Shellos')
  public static readonly Gastrodon = this.$impl.of(423, 'Gastrodon')
  public static readonly Ambipom = this.$impl.of(424, 'Ambipom')
  public static readonly Drifloon = this.$impl.of(425, 'Drifloon')
  public static readonly Drifblim = this.$impl.of(426, 'Drifblim')
  public static readonly Buneary = this.$impl.of(427, 'Buneary')
  public static readonly Lopunny = this.$impl.of(428, 'Lopunny')
  public static readonly Mismagius = this.$impl.of(429, 'Mismagius')
  public static readonly Honchkrow = this.$impl.of(430, 'Honchkrow')
  public static readonly Glameow = this.$impl.of(431, 'Glameow')
  public static readonly Purugly = this.$impl.of(432, 'Purugly')
  public static readonly Chingling = this.$impl.of(433, 'Chingling')
  public static readonly Stunky = this.$impl.of(434, 'Stunky')
  public static readonly Skuntank = this.$impl.of(435, 'Skuntank')
  public static readonly Bronzor = this.$impl.of(436, 'Bronzor')
  public static readonly Bronzong = this.$impl.of(437, 'Bronzong')
  public static readonly Bonsly = this.$impl.of(438, 'Bonsly')
  public static readonly MimeJr = this.$impl.of(439, 'MimeJr')
  public static readonly Happiny = this.$impl.of(440, 'Happiny')
  public static readonly Chatot = this.$impl.of(441, 'Chatot')
  public static readonly Spiritomb = this.$impl.of(442, 'Spiritomb')
  public static readonly Gible = this.$impl.of(443, 'Gible')
  public static readonly Gabite = this.$impl.of(444, 'Gabite')
  public static readonly Garchomp = this.$impl.of(445, 'Garchomp')
  public static readonly Munchlax = this.$impl.of(446, 'Munchlax')
  public static readonly Riolu = this.$impl.of(447, 'Riolu')
  public static readonly Lucario = this.$impl.of(448, 'Lucario')
  public static readonly Hippopotas = this.$impl.of(449, 'Hippopotas')
  public static readonly Hippowdon = this.$impl.of(450, 'Hippowdon')
  public static readonly Skorupi = this.$impl.of(451, 'Skorupi')
  public static readonly Drapion = this.$impl.of(452, 'Drapion')
  public static readonly Croagunk = this.$impl.of(453, 'Croagunk')
  public static readonly Toxicroak = this.$impl.of(454, 'Toxicroak')
  public static readonly Carnivine = this.$impl.of(455, 'Carnivine')
  public static readonly Finneon = this.$impl.of(456, 'Finneon')
  public static readonly Lumineon = this.$impl.of(457, 'Lumineon')
  public static readonly Mantyke = this.$impl.of(458, 'Mantyke')
  public static readonly Snover = this.$impl.of(459, 'Snover')
  public static readonly Abomasnow = this.$impl.of(460, 'Abomasnow')
  public static readonly Weavile = this.$impl.of(461, 'Weavile')
  public static readonly Magnezone = this.$impl.of(462, 'Magnezone')
  public static readonly Lickilicky = this.$impl.of(463, 'Lickilicky')
  public static readonly Rhyperior = this.$impl.of(464, 'Rhyperior')
  public static readonly Tangrowth = this.$impl.of(465, 'Tangrowth')
  public static readonly Electivire = this.$impl.of(466, 'Electivire')
  public static readonly Magmortar = this.$impl.of(467, 'Magmortar')
  public static readonly Togekiss = this.$impl.of(468, 'Togekiss')
  public static readonly Yanmega = this.$impl.of(469, 'Yanmega')
  public static readonly Leafeon = this.$impl.of(470, 'Leafeon')
  public static readonly Glaceon = this.$impl.of(471, 'Glaceon')
  public static readonly Gliscor = this.$impl.of(472, 'Gliscor')
  public static readonly Mamoswine = this.$impl.of(473, 'Mamoswine')
  public static readonly PorygonZ = this.$impl.of(474, 'Porygon-Z')
  public static readonly Gallade = this.$impl.of(475, 'Gallade')
  public static readonly Probopass = this.$impl.of(476, 'Probopass')
  public static readonly Dusknoir = this.$impl.of(477, 'Dusknoir')
  public static readonly Froslass = this.$impl.of(478, 'Froslass')
  public static readonly Rotom = this.$impl.of(479, 'Rotom')
  public static readonly Uxie = this.$impl.of(480, 'Uxie')
  public static readonly Mesprit = this.$impl.of(481, 'Mesprit')
  public static readonly Azelf = this.$impl.of(482, 'Azelf')
  public static readonly Dialga = this.$impl.of(483, 'Dialga')
  public static readonly Palkia = this.$impl.of(484, 'Palkia')
  public static readonly Heatran = this.$impl.of(485, 'Heatran')
  public static readonly Regigigas = this.$impl.of(486, 'Regigigas')
  public static readonly Giratina = this.$impl.of(487, 'Giratina')
  public static readonly Cresselia = this.$impl.of(488, 'Cresselia')
  public static readonly Phione = this.$impl.of(489, 'Phione')
  public static readonly Manaphy = this.$impl.of(490, 'Manaphy')
  public static readonly Darkrai = this.$impl.of(491, 'Darkrai')
  public static readonly Shaymin = this.$impl.of(492, 'Shaymin')
  public static readonly Arceus = this.$impl.of(493, 'Arceus')
  public static readonly Victini = this.$impl.of(494, 'Victini')
  public static readonly Snivy = this.$impl.of(495, 'Snivy')
  public static readonly Servine = this.$impl.of(496, 'Servine')
  public static readonly Serperior = this.$impl.of(497, 'Serperior')
  public static readonly Tepig = this.$impl.of(498, 'Tepig')
  public static readonly Pignite = this.$impl.of(499, 'Pignite')
  public static readonly Emboar = this.$impl.of(500, 'Emboar')
  public static readonly Oshawott = this.$impl.of(501, 'Oshawott')
  public static readonly Dewott = this.$impl.of(502, 'Dewott')
  public static readonly Samurott = this.$impl.of(503, 'Samurott')
  public static readonly Patrat = this.$impl.of(504, 'Patrat')
  public static readonly Watchog = this.$impl.of(505, 'Watchog')
  public static readonly Lillipup = this.$impl.of(506, 'Lillipup')
  public static readonly Herdier = this.$impl.of(507, 'Herdier')
  public static readonly Stoutland = this.$impl.of(508, 'Stoutland')
  public static readonly Purrloin = this.$impl.of(509, 'Purrloin')
  public static readonly Liepard = this.$impl.of(510, 'Liepard')
  public static readonly Pansage = this.$impl.of(511, 'Pansage')
  public static readonly Simisage = this.$impl.of(512, 'Simisage')
  public static readonly Pansear = this.$impl.of(513, 'Pansear')
  public static readonly Simisear = this.$impl.of(514, 'Simisear')
  public static readonly Panpour = this.$impl.of(515, 'Panpour')
  public static readonly Simipour = this.$impl.of(516, 'Simipour')
  public static readonly Munna = this.$impl.of(517, 'Munna')
  public static readonly Musharna = this.$impl.of(518, 'Musharna')
  public static readonly Pidove = this.$impl.of(519, 'Pidove')
  public static readonly Tranquill = this.$impl.of(520, 'Tranquill')
  public static readonly Unfezant = this.$impl.of(521, 'Unfezant')
  public static readonly Blitzle = this.$impl.of(522, 'Blitzle')
  public static readonly Zebstrika = this.$impl.of(523, 'Zebstrika')
  public static readonly Roggenrola = this.$impl.of(524, 'Roggenrola')
  public static readonly Boldore = this.$impl.of(525, 'Boldore')
  public static readonly Gigalith = this.$impl.of(526, 'Gigalith')
  public static readonly Woobat = this.$impl.of(527, 'Woobat')
  public static readonly Swoobat = this.$impl.of(528, 'Swoobat')
  public static readonly Drilbur = this.$impl.of(529, 'Drilbur')
  public static readonly Excadrill = this.$impl.of(530, 'Excadrill')
  public static readonly Audino = this.$impl.of(531, 'Audino')
  public static readonly Timburr = this.$impl.of(532, 'Timburr')
  public static readonly Gurdurr = this.$impl.of(533, 'Gurdurr')
  public static readonly Conkeldurr = this.$impl.of(534, 'Conkeldurr')
  public static readonly Tympole = this.$impl.of(535, 'Tympole')
  public static readonly Palpitoad = this.$impl.of(536, 'Palpitoad')
  public static readonly Seismitoad = this.$impl.of(537, 'Seismitoad')
  public static readonly Throh = this.$impl.of(538, 'Throh')
  public static readonly Sawk = this.$impl.of(539, 'Sawk')
  public static readonly Sewaddle = this.$impl.of(540, 'Sewaddle')
  public static readonly Swadloon = this.$impl.of(541, 'Swadloon')
  public static readonly Leavanny = this.$impl.of(542, 'Leavanny')
  public static readonly Venipede = this.$impl.of(543, 'Venipede')
  public static readonly Whirlipede = this.$impl.of(544, 'Whirlipede')
  public static readonly Scolipede = this.$impl.of(545, 'Scolipede')
  public static readonly Cottonee = this.$impl.of(546, 'Cottonee')
  public static readonly Whimsicott = this.$impl.of(547, 'Whimsicott')
  public static readonly Petilil = this.$impl.of(548, 'Petilil')
  public static readonly Lilligant = this.$impl.of(549, 'Lilligant')
  public static readonly Basculin = this.$impl.of(550, 'Basculin')
  public static readonly Sandile = this.$impl.of(551, 'Sandile')
  public static readonly Krokorok = this.$impl.of(552, 'Krokorok')
  public static readonly Krookodile = this.$impl.of(553, 'Krookodile')
  public static readonly Darumaka = this.$impl.of(554, 'Darumaka')
  public static readonly Darmanitan = this.$impl.of(555, 'Darmanitan')
  public static readonly Maractus = this.$impl.of(556, 'Maractus')
  public static readonly Dwebble = this.$impl.of(557, 'Dwebble')
  public static readonly Crustle = this.$impl.of(558, 'Crustle')
  public static readonly Scraggy = this.$impl.of(559, 'Scraggy')
  public static readonly Scrafty = this.$impl.of(560, 'Scrafty')
  public static readonly Sigilyph = this.$impl.of(561, 'Sigilyph')
  public static readonly Yamask = this.$impl.of(562, 'Yamask')
  public static readonly Cofagrigus = this.$impl.of(563, 'Cofagrigus')
  public static readonly Tirtouga = this.$impl.of(564, 'Tirtouga')
  public static readonly Carracosta = this.$impl.of(565, 'Carracosta')
  public static readonly Archen = this.$impl.of(566, 'Archen')
  public static readonly Archeops = this.$impl.of(567, 'Archeops')
  public static readonly Trubbish = this.$impl.of(568, 'Trubbish')
  public static readonly Garbodor = this.$impl.of(569, 'Garbodor')
  public static readonly Zorua = this.$impl.of(570, 'Zorua')
  public static readonly Zoroark = this.$impl.of(571, 'Zoroark')
  public static readonly Minccino = this.$impl.of(572, 'Minccino')
  public static readonly Cinccino = this.$impl.of(573, 'Cinccino')
  public static readonly Gothita = this.$impl.of(574, 'Gothita')
  public static readonly Gothorita = this.$impl.of(575, 'Gothorita')
  public static readonly Gothitelle = this.$impl.of(576, 'Gothitelle')
  public static readonly Solosis = this.$impl.of(577, 'Solosis')
  public static readonly Duosion = this.$impl.of(578, 'Duosion')
  public static readonly Reuniclus = this.$impl.of(579, 'Reuniclus')
  public static readonly Ducklett = this.$impl.of(580, 'Ducklett')
  public static readonly Swanna = this.$impl.of(581, 'Swanna')
  public static readonly Vanillite = this.$impl.of(582, 'Vanillite')
  public static readonly Vanillish = this.$impl.of(583, 'Vanillish')
  public static readonly Vanilluxe = this.$impl.of(584, 'Vanilluxe')
  public static readonly Deerling = this.$impl.of(585, 'Deerling')
  public static readonly Sawsbuck = this.$impl.of(586, 'Sawsbuck')
  public static readonly Emolga = this.$impl.of(587, 'Emolga')
  public static readonly Karrablast = this.$impl.of(588, 'Karrablast')
  public static readonly Escavalier = this.$impl.of(589, 'Escavalier')
  public static readonly Foongus = this.$impl.of(590, 'Foongus')
  public static readonly Amoonguss = this.$impl.of(591, 'Amoonguss')
  public static readonly Frillish = this.$impl.of(592, 'Frillish')
  public static readonly Jellicent = this.$impl.of(593, 'Jellicent')
  public static readonly Alomomola = this.$impl.of(594, 'Alomomola')
  public static readonly Joltik = this.$impl.of(595, 'Joltik')
  public static readonly Galvantula = this.$impl.of(596, 'Galvantula')
  public static readonly Ferroseed = this.$impl.of(597, 'Ferroseed')
  public static readonly Ferrothorn = this.$impl.of(598, 'Ferrothorn')
  public static readonly Klink = this.$impl.of(599, 'Klink')
  public static readonly Klang = this.$impl.of(600, 'Klang')
  public static readonly Klinklang = this.$impl.of(601, 'Klinklang')
  public static readonly Tynamo = this.$impl.of(602, 'Tynamo')
  public static readonly Eelektrik = this.$impl.of(603, 'Eelektrik')
  public static readonly Eelektross = this.$impl.of(604, 'Eelektross')
  public static readonly Elgyem = this.$impl.of(605, 'Elgyem')
  public static readonly Beheeyem = this.$impl.of(606, 'Beheeyem')
  public static readonly Litwick = this.$impl.of(607, 'Litwick')
  public static readonly Lampent = this.$impl.of(608, 'Lampent')
  public static readonly Chandelure = this.$impl.of(609, 'Chandelure')
  public static readonly Axew = this.$impl.of(610, 'Axew')
  public static readonly Fraxure = this.$impl.of(611, 'Fraxure')
  public static readonly Haxorus = this.$impl.of(612, 'Haxorus')
  public static readonly Cubchoo = this.$impl.of(613, 'Cubchoo')
  public static readonly Beartic = this.$impl.of(614, 'Beartic')
  public static readonly Cryogonal = this.$impl.of(615, 'Cryogonal')
  public static readonly Shelmet = this.$impl.of(616, 'Shelmet')
  public static readonly Accelgor = this.$impl.of(617, 'Accelgor')
  public static readonly Stunfisk = this.$impl.of(618, 'Stunfisk')
  public static readonly Mienfoo = this.$impl.of(619, 'Mienfoo')
  public static readonly Mienshao = this.$impl.of(620, 'Mienshao')
  public static readonly Druddigon = this.$impl.of(621, 'Druddigon')
  public static readonly Golett = this.$impl.of(622, 'Golett')
  public static readonly Golurk = this.$impl.of(623, 'Golurk')
  public static readonly Pawniard = this.$impl.of(624, 'Pawniard')
  public static readonly Bisharp = this.$impl.of(625, 'Bisharp')
  public static readonly Bouffalant = this.$impl.of(626, 'Bouffalant')
  public static readonly Rufflet = this.$impl.of(627, 'Rufflet')
  public static readonly Braviary = this.$impl.of(628, 'Braviary')
  public static readonly Vullaby = this.$impl.of(629, 'Vullaby')
  public static readonly Mandibuzz = this.$impl.of(630, 'Mandibuzz')
  public static readonly Heatmor = this.$impl.of(631, 'Heatmor')
  public static readonly Durant = this.$impl.of(632, 'Durant')
  public static readonly Deino = this.$impl.of(633, 'Deino')
  public static readonly Zweilous = this.$impl.of(634, 'Zweilous')
  public static readonly Hydreigon = this.$impl.of(635, 'Hydreigon')
  public static readonly Larvesta = this.$impl.of(636, 'Larvesta')
  public static readonly Volcarona = this.$impl.of(637, 'Volcarona')
  public static readonly Cobalion = this.$impl.of(638, 'Cobalion')
  public static readonly Terrakion = this.$impl.of(639, 'Terrakion')
  public static readonly Virizion = this.$impl.of(640, 'Virizion')
  public static readonly Tornadus = this.$impl.of(641, 'Tornadus')
  public static readonly Thundurus = this.$impl.of(642, 'Thundurus')
  public static readonly Reshiram = this.$impl.of(643, 'Reshiram')
  public static readonly Zekrom = this.$impl.of(644, 'Zekrom')
  public static readonly Landorus = this.$impl.of(645, 'Landorus')
  public static readonly Kyurem = this.$impl.of(646, 'Kyurem')
  public static readonly Keldeo = this.$impl.of(647, 'Keldeo')
  public static readonly Meloetta = this.$impl.of(648, 'Meloetta')
  public static readonly Genesect = this.$impl.of(649, 'Genesect')
  public static readonly Chespin = this.$impl.of(650, 'Chespin')
  public static readonly Quilladin = this.$impl.of(651, 'Quilladin')
  public static readonly Chesnaught = this.$impl.of(652, 'Chesnaught')
  public static readonly Fennekin = this.$impl.of(653, 'Fennekin')
  public static readonly Braixen = this.$impl.of(654, 'Braixen')
  public static readonly Delphox = this.$impl.of(655, 'Delphox')
  public static readonly Froakie = this.$impl.of(656, 'Froakie')
  public static readonly Frogadier = this.$impl.of(657, 'Frogadier')
  public static readonly Greninja = this.$impl.of(658, 'Greninja')
  public static readonly Bunnelby = this.$impl.of(659, 'Bunnelby')
  public static readonly Diggersby = this.$impl.of(660, 'Diggersby')
  public static readonly Fletchling = this.$impl.of(661, 'Fletchling')
  public static readonly Fletchinder = this.$impl.of(662, 'Fletchinder')
  public static readonly Talonflame = this.$impl.of(663, 'Talonflame')
  public static readonly Scatterbug = this.$impl.of(664, 'Scatterbug')
  public static readonly Spewpa = this.$impl.of(665, 'Spewpa')
  public static readonly Vivillon = this.$impl.of(666, 'Vivillon')
  public static readonly Litleo = this.$impl.of(667, 'Litleo')
  public static readonly Pyroar = this.$impl.of(668, 'Pyroar')
  public static readonly Flabebe = this.$impl.of(669, 'Flabebe')
  public static readonly Floette = this.$impl.of(670, 'Floette')
  public static readonly Florges = this.$impl.of(671, 'Florges')
  public static readonly Skiddo = this.$impl.of(672, 'Skiddo')
  public static readonly Gogoat = this.$impl.of(673, 'Gogoat')
  public static readonly Pancham = this.$impl.of(674, 'Pancham')
  public static readonly Pangoro = this.$impl.of(675, 'Pangoro')
  public static readonly Furfrou = this.$impl.of(676, 'Furfrou')
  public static readonly Espurr = this.$impl.of(677, 'Espurr')
  public static readonly Meowstic = this.$impl.of(678, 'Meowstic')
  public static readonly Honedge = this.$impl.of(679, 'Honedge')
  public static readonly Doublade = this.$impl.of(680, 'Doublade')
  public static readonly Aegislash = this.$impl.of(681, 'Aegislash')
  public static readonly Spritzee = this.$impl.of(682, 'Spritzee')
  public static readonly Aromatisse = this.$impl.of(683, 'Aromatisse')
  public static readonly Swirlix = this.$impl.of(684, 'Swirlix')
  public static readonly Slurpuff = this.$impl.of(685, 'Slurpuff')
  public static readonly Inkay = this.$impl.of(686, 'Inkay')
  public static readonly Malamar = this.$impl.of(687, 'Malamar')
  public static readonly Binacle = this.$impl.of(688, 'Binacle')
  public static readonly Barbaracle = this.$impl.of(689, 'Barbaracle')
  public static readonly Skrelp = this.$impl.of(690, 'Skrelp')
  public static readonly Dragalge = this.$impl.of(691, 'Dragalge')
  public static readonly Clauncher = this.$impl.of(692, 'Clauncher')
  public static readonly Clawitzer = this.$impl.of(693, 'Clawitzer')
  public static readonly Helioptile = this.$impl.of(694, 'Helioptile')
  public static readonly Heliolisk = this.$impl.of(695, 'Heliolisk')
  public static readonly Tyrunt = this.$impl.of(696, 'Tyrunt')
  public static readonly Tyrantrum = this.$impl.of(697, 'Tyrantrum')
  public static readonly Amaura = this.$impl.of(698, 'Amaura')
  public static readonly Aurorus = this.$impl.of(699, 'Aurorus')
  public static readonly Sylveon = this.$impl.of(700, 'Sylveon')
  public static readonly Hawlucha = this.$impl.of(701, 'Hawlucha')
  public static readonly Dedenne = this.$impl.of(702, 'Dedenne')
  public static readonly Carbink = this.$impl.of(703, 'Carbink')
  public static readonly Goomy = this.$impl.of(704, 'Goomy')
  public static readonly Sliggoo = this.$impl.of(705, 'Sliggoo')
  public static readonly Goodra = this.$impl.of(706, 'Goodra')
  public static readonly Klefki = this.$impl.of(707, 'Klefki')
  public static readonly Phantump = this.$impl.of(708, 'Phantump')
  public static readonly Trevenant = this.$impl.of(709, 'Trevenant')
  public static readonly Pumpkaboo = this.$impl.of(710, 'Pumpkaboo')
  public static readonly Gourgeist = this.$impl.of(711, 'Gourgeist')
  public static readonly Bergmite = this.$impl.of(712, 'Bergmite')
  public static readonly Avalugg = this.$impl.of(713, 'Avalugg')
  public static readonly Noibat = this.$impl.of(714, 'Noibat')
  public static readonly Noivern = this.$impl.of(715, 'Noivern')
  public static readonly Xerneas = this.$impl.of(716, 'Xerneas')
  public static readonly Yveltal = this.$impl.of(717, 'Yveltal')
  public static readonly Zygarde = this.$impl.of(718, 'Zygarde')
  public static readonly Diancie = this.$impl.of(719, 'Diancie')
  public static readonly Hoopa = this.$impl.of(720, 'Hoopa')
  public static readonly Volcanion = this.$impl.of(721, 'Volcanion')
  public static readonly Rowlet = this.$impl.of(722, 'Rowlet')
  public static readonly Dartrix = this.$impl.of(723, 'Dartrix')
  public static readonly Decidueye = this.$impl.of(724, 'Decidueye')
  public static readonly Litten = this.$impl.of(725, 'Litten')
  public static readonly Torracat = this.$impl.of(726, 'Torracat')
  public static readonly Incineroar = this.$impl.of(727, 'Incineroar')
  public static readonly Popplio = this.$impl.of(728, 'Popplio')
  public static readonly Brionne = this.$impl.of(729, 'Brionne')
  public static readonly Primarina = this.$impl.of(730, 'Primarina')
  public static readonly Pikipek = this.$impl.of(731, 'Pikipek')
  public static readonly Trumbeak = this.$impl.of(732, 'Trumbeak')
  public static readonly Toucannon = this.$impl.of(733, 'Toucannon')
  public static readonly Yungoos = this.$impl.of(734, 'Yungoos')
  public static readonly Gumshoos = this.$impl.of(735, 'Gumshoos')
  public static readonly Grubbin = this.$impl.of(736, 'Grubbin')
  public static readonly Charjabug = this.$impl.of(737, 'Charjabug')
  public static readonly Vikavolt = this.$impl.of(738, 'Vikavolt')
  public static readonly Crabrawler = this.$impl.of(739, 'Crabrawler')
  public static readonly Crabominable = this.$impl.of(740, 'Crabominable')
  public static readonly Oricorio = this.$impl.of(741, 'Oricorio')
  public static readonly Cutiefly = this.$impl.of(742, 'Cutiefly')
  public static readonly Ribombee = this.$impl.of(743, 'Ribombee')
  public static readonly Rockruff = this.$impl.of(744, 'Rockruff')
  public static readonly Lycanroc = this.$impl.of(745, 'Lycanroc')
  public static readonly Wishiwashi = this.$impl.of(746, 'Wishiwashi')
  public static readonly Mareanie = this.$impl.of(747, 'Mareanie')
  public static readonly Toxapex = this.$impl.of(748, 'Toxapex')
  public static readonly Mudbray = this.$impl.of(749, 'Mudbray')
  public static readonly Mudsdale = this.$impl.of(750, 'Mudsdale')
  public static readonly Dewpider = this.$impl.of(751, 'Dewpider')
  public static readonly Araquanid = this.$impl.of(752, 'Araquanid')
  public static readonly Fomantis = this.$impl.of(753, 'Fomantis')
  public static readonly Lurantis = this.$impl.of(754, 'Lurantis')
  public static readonly Morelull = this.$impl.of(755, 'Morelull')
  public static readonly Shiinotic = this.$impl.of(756, 'Shiinotic')
  public static readonly Salandit = this.$impl.of(757, 'Salandit')
  public static readonly Salazzle = this.$impl.of(758, 'Salazzle')
  public static readonly Stufful = this.$impl.of(759, 'Stufful')
  public static readonly Bewear = this.$impl.of(760, 'Bewear')
  public static readonly Bounsweet = this.$impl.of(761, 'Bounsweet')
  public static readonly Steenee = this.$impl.of(762, 'Steenee')
  public static readonly Tsareena = this.$impl.of(763, 'Tsareena')
  public static readonly Comfey = this.$impl.of(764, 'Comfey')
  public static readonly Oranguru = this.$impl.of(765, 'Oranguru')
  public static readonly Passimian = this.$impl.of(766, 'Passimian')
  public static readonly Wimpod = this.$impl.of(767, 'Wimpod')
  public static readonly Golisopod = this.$impl.of(768, 'Golisopod')
  public static readonly Sandygast = this.$impl.of(769, 'Sandygast')
  public static readonly Palossand = this.$impl.of(770, 'Palossand')
  public static readonly Pyukumuku = this.$impl.of(771, 'Pyukumuku')
  public static readonly TypeNull = this.$impl.of(772, 'TypeNull')
  public static readonly Silvally = this.$impl.of(773, 'Silvally')
  public static readonly Minior = this.$impl.of(774, 'Minior')
  public static readonly Komala = this.$impl.of(775, 'Komala')
  public static readonly Turtonator = this.$impl.of(776, 'Turtonator')
  public static readonly Togedemaru = this.$impl.of(777, 'Togedemaru')
  public static readonly Mimikyu = this.$impl.of(778, 'Mimikyu')
  public static readonly Bruxish = this.$impl.of(779, 'Bruxish')
  public static readonly Drampa = this.$impl.of(780, 'Drampa')
  public static readonly Dhelmise = this.$impl.of(781, 'Dhelmise')
  public static readonly Jangmoo = this.$impl.of(782, 'Jangmo-o')
  public static readonly Hakamoo = this.$impl.of(783, 'Hakamo-o')
  public static readonly Kommoo = this.$impl.of(784, 'Kommo-o')
  public static readonly TapuKoko = this.$impl.of(785, 'TapuKoko')
  public static readonly TapuLele = this.$impl.of(786, 'TapuLele')
  public static readonly TapuBulu = this.$impl.of(787, 'TapuBulu')
  public static readonly TapuFini = this.$impl.of(788, 'TapuFini')
  public static readonly Cosmog = this.$impl.of(789, 'Cosmog')
  public static readonly Cosmoem = this.$impl.of(790, 'Cosmoem')
  public static readonly Solgaleo = this.$impl.of(791, 'Solgaleo')
  public static readonly Lunala = this.$impl.of(792, 'Lunala')
  public static readonly Nihilego = this.$impl.of(793, 'Nihilego')
  public static readonly Buzzwole = this.$impl.of(794, 'Buzzwole')
  public static readonly Pheromosa = this.$impl.of(795, 'Pheromosa')
  public static readonly Xurkitree = this.$impl.of(796, 'Xurkitree')
  public static readonly Celesteela = this.$impl.of(797, 'Celesteela')
  public static readonly Kartana = this.$impl.of(798, 'Kartana')
  public static readonly Guzzlord = this.$impl.of(799, 'Guzzlord')
  public static readonly Necrozma = this.$impl.of(800, 'Necrozma')
  public static readonly Magearna = this.$impl.of(801, 'Magearna')
  public static readonly Marshadow = this.$impl.of(802, 'Marshadow')
  public static readonly Poipole = this.$impl.of(803, 'Poipole')
  public static readonly Naganadel = this.$impl.of(804, 'Naganadel')
  public static readonly Stakataka = this.$impl.of(805, 'Stakataka')
  public static readonly Blacephalon = this.$impl.of(806, 'Blacephalon')
  public static readonly Zeraora = this.$impl.of(807, 'Zeraora')
  public static readonly Meltan = this.$impl.of(808, 'Meltan')
  public static readonly Melmetal = this.$impl.of(809, 'Melmetal')
  public static readonly Grookey = this.$impl.of(810, 'Grookey')
  public static readonly Thwackey = this.$impl.of(811, 'Thwackey')
  public static readonly Rillaboom = this.$impl.of(812, 'Rillaboom')
  public static readonly Scorbunny = this.$impl.of(813, 'Scorbunny')
  public static readonly Raboot = this.$impl.of(814, 'Raboot')
  public static readonly Cinderace = this.$impl.of(815, 'Cinderace')
  public static readonly Sobble = this.$impl.of(816, 'Sobble')
  public static readonly Drizzile = this.$impl.of(817, 'Drizzile')
  public static readonly Inteleon = this.$impl.of(818, 'Inteleon')
  public static readonly Skwovet = this.$impl.of(819, 'Skwovet')
  public static readonly Greedent = this.$impl.of(820, 'Greedent')
  public static readonly Rookidee = this.$impl.of(821, 'Rookidee')
  public static readonly Corvisquire = this.$impl.of(822, 'Corvisquire')
  public static readonly Corviknight = this.$impl.of(823, 'Corviknight')
  public static readonly Blipbug = this.$impl.of(824, 'Blipbug')
  public static readonly Dottler = this.$impl.of(825, 'Dottler')
  public static readonly Orbeetle = this.$impl.of(826, 'Orbeetle')
  public static readonly Nickit = this.$impl.of(827, 'Nickit')
  public static readonly Thievul = this.$impl.of(828, 'Thievul')
  public static readonly Gossifleur = this.$impl.of(829, 'Gossifleur')
  public static readonly Eldegoss = this.$impl.of(830, 'Eldegoss')
  public static readonly Wooloo = this.$impl.of(831, 'Wooloo')
  public static readonly Dubwool = this.$impl.of(832, 'Dubwool')
  public static readonly Chewtle = this.$impl.of(833, 'Chewtle')
  public static readonly Drednaw = this.$impl.of(834, 'Drednaw')
  public static readonly Yamper = this.$impl.of(835, 'Yamper')
  public static readonly Boltund = this.$impl.of(836, 'Boltund')
  public static readonly Rolycoly = this.$impl.of(837, 'Rolycoly')
  public static readonly Carkol = this.$impl.of(838, 'Carkol')
  public static readonly Coalossal = this.$impl.of(839, 'Coalossal')
  public static readonly Applin = this.$impl.of(840, 'Applin')
  public static readonly Flapple = this.$impl.of(841, 'Flapple')
  public static readonly Appletun = this.$impl.of(842, 'Appletun')
  public static readonly Silicobra = this.$impl.of(843, 'Silicobra')
  public static readonly Sandaconda = this.$impl.of(844, 'Sandaconda')
  public static readonly Cramorant = this.$impl.of(845, 'Cramorant')
  public static readonly Arrokuda = this.$impl.of(846, 'Arrokuda')
  public static readonly Barraskewda = this.$impl.of(847, 'Barraskewda')
  public static readonly Toxel = this.$impl.of(848, 'Toxel')
  public static readonly Toxtricity = this.$impl.of(849, 'Toxtricity')
  public static readonly Sizzlipede = this.$impl.of(850, 'Sizzlipede')
  public static readonly Centiskorch = this.$impl.of(851, 'Centiskorch')
  public static readonly Clobbopus = this.$impl.of(852, 'Clobbopus')
  public static readonly Grapploct = this.$impl.of(853, 'Grapploct')
  public static readonly Sinistea = this.$impl.of(854, 'Sinistea')
  public static readonly Polteageist = this.$impl.of(855, 'Polteageist')
  public static readonly Hatenna = this.$impl.of(856, 'Hatenna')
  public static readonly Hattrem = this.$impl.of(857, 'Hattrem')
  public static readonly Hatterene = this.$impl.of(858, 'Hatterene')
  public static readonly Impidimp = this.$impl.of(859, 'Impidimp')
  public static readonly Morgrem = this.$impl.of(860, 'Morgrem')
  public static readonly Grimmsnarl = this.$impl.of(861, 'Grimmsnarl')
  public static readonly Obstagoon = this.$impl.of(862, 'Obstagoon')
  public static readonly Perrserker = this.$impl.of(863, 'Perrserker')
  public static readonly Cursola = this.$impl.of(864, 'Cursola')
  public static readonly Sirfetchd = this.$impl.of(865, 'Sirfetchd')
  public static readonly MrRime = this.$impl.of(866, 'MrRime')
  public static readonly Runerigus = this.$impl.of(867, 'Runerigus')
  public static readonly Milcery = this.$impl.of(868, 'Milcery')
  public static readonly Alcremie = this.$impl.of(869, 'Alcremie')
  public static readonly Falinks = this.$impl.of(870, 'Falinks')
  public static readonly Pincurchin = this.$impl.of(871, 'Pincurchin')
  public static readonly Snom = this.$impl.of(872, 'Snom')
  public static readonly Frosmoth = this.$impl.of(873, 'Frosmoth')
  public static readonly Stonjourner = this.$impl.of(874, 'Stonjourner')
  public static readonly Eiscue = this.$impl.of(875, 'Eiscue')
  public static readonly Indeedee = this.$impl.of(876, 'Indeedee')
  public static readonly Morpeko = this.$impl.of(877, 'Morpeko')
  public static readonly Cufant = this.$impl.of(878, 'Cufant')
  public static readonly Copperajah = this.$impl.of(879, 'Copperajah')
  public static readonly Dracozolt = this.$impl.of(880, 'Dracozolt')
  public static readonly Arctozolt = this.$impl.of(881, 'Arctozolt')
  public static readonly Dracovish = this.$impl.of(882, 'Dracovish')
  public static readonly Arctovish = this.$impl.of(883, 'Arctovish')
  public static readonly Duraludon = this.$impl.of(884, 'Duraludon')
  public static readonly Dreepy = this.$impl.of(885, 'Dreepy')
  public static readonly Drakloak = this.$impl.of(886, 'Drakloak')
  public static readonly Dragapult = this.$impl.of(887, 'Dragapult')
  public static readonly Zacian = this.$impl.of(888, 'Zacian')
  public static readonly Zamazenta = this.$impl.of(889, 'Zamazenta')
  public static readonly Eternatus = this.$impl.of(890, 'Eternatus')
  public static readonly Kubfu = this.$impl.of(891, 'Kubfu')
  public static readonly Urshifu = this.$impl.of(892, 'Urshifu')
  public static readonly Zarude = this.$impl.of(893, 'Zarude')
  public static readonly Regieleki = this.$impl.of(894, 'Regieleki')
  public static readonly Regidrago = this.$impl.of(895, 'Regidrago')
  public static readonly Glastrier = this.$impl.of(896, 'Glastrier')
  public static readonly Spectrier = this.$impl.of(897, 'Spectrier')
  public static readonly Calyrex = this.$impl.of(898, 'Calyrex')
  public static readonly Wyrdeer = this.$impl.of(899, 'Wyrdeer')
  /* eslint-enable @typescript-eslint/member-ordering */

  /**
   * Gets the immutable set of species that are considered legendary.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered legendary
   */
  public static getLegendaries(): ReadonlySet<Species> {
    return new Set(Species.$impl.legendaries)
  }

  /**
   * Gets the immutable set of species that are considered ultrabeasts.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered ultrabeast
   */
  public static getUltrabeasts(): ReadonlySet<Species> {
    return new Set(Species.$impl.ultrabeasts)
  }

  /**
   * Gets the readonly set of all the pokemon species.
   *
   * @returns {ReadonlySet<Species>} The readonly set of all the pokemon species
   */
  public static getAllPokemons(): ReadonlySet<Species> {
    return new Set(Species.$impl.allPokemons)
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
    for (const pokemon of Species.$impl.allPokemons) {
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
    for (const species of Species.$impl.allPokemons) {
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
      Species.$impl.legendaries.add,
      Species.$impl.legendaries
    )
    ultrabests.forEach(Species.$impl.ultrabeasts.add, Species.$impl.ultrabeasts)
  }
}
