import i18next from 'i18next'

import { type Comparable, Util } from '../index.mjs'

export abstract class Species implements Comparable {
  private static readonly $implementation = class extends Species {
    public static readonly legendaries: Set<Species> = new Set()
    public static readonly ultrabeasts: Set<Species> = new Set()
    public static readonly allPokemons: Set<Species> = new Set()

    protected constructor(
      protected readonly dex: number,
      protected readonly name: string
    ) {
      super()

      Species.$implementation.allPokemons.add(this)
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

      return new Species.$implementation(dex, name)
    }

    public isLegendary(): boolean {
      return Species.$implementation.legendaries.has(this)
    }

    public isUltraBeast(): boolean {
      return Species.$implementation.ultrabeasts.has(this)
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
  public static readonly MissingNo = this.$implementation.of(0, 'MissingNo')
  public static readonly Bulbasaur = this.$implementation.of(1, 'Bulbasaur')
  public static readonly Ivysaur = this.$implementation.of(2, 'Ivysaur')
  public static readonly Venusaur = this.$implementation.of(3, 'Venusaur')
  public static readonly Charmander = this.$implementation.of(4, 'Charmander')
  public static readonly Charmeleon = this.$implementation.of(5, 'Charmeleon')
  public static readonly Charizard = this.$implementation.of(6, 'Charizard')
  public static readonly Squirtle = this.$implementation.of(7, 'Squirtle')
  public static readonly Wartortle = this.$implementation.of(8, 'Wartortle')
  public static readonly Blastoise = this.$implementation.of(9, 'Blastoise')
  public static readonly Caterpie = this.$implementation.of(10, 'Caterpie')
  public static readonly Metapod = this.$implementation.of(11, 'Metapod')
  public static readonly Butterfree = this.$implementation.of(12, 'Butterfree')
  public static readonly Weedle = this.$implementation.of(13, 'Weedle')
  public static readonly Kakuna = this.$implementation.of(14, 'Kakuna')
  public static readonly Beedrill = this.$implementation.of(15, 'Beedrill')
  public static readonly Pidgey = this.$implementation.of(16, 'Pidgey')
  public static readonly Pidgeotto = this.$implementation.of(17, 'Pidgeotto')
  public static readonly Pidgeot = this.$implementation.of(18, 'Pidgeot')
  public static readonly Rattata = this.$implementation.of(19, 'Rattata')
  public static readonly Raticate = this.$implementation.of(20, 'Raticate')
  public static readonly Spearow = this.$implementation.of(21, 'Spearow')
  public static readonly Fearow = this.$implementation.of(22, 'Fearow')
  public static readonly Ekans = this.$implementation.of(23, 'Ekans')
  public static readonly Arbok = this.$implementation.of(24, 'Arbok')
  public static readonly Pikachu = this.$implementation.of(25, 'Pikachu')
  public static readonly Raichu = this.$implementation.of(26, 'Raichu')
  public static readonly Sandshrew = this.$implementation.of(27, 'Sandshrew')
  public static readonly Sandslash = this.$implementation.of(28, 'Sandslash')
  public static readonly Nidoranfemale = this.$implementation.of(
    29,
    'Nidoranfemale'
  )
  public static readonly Nidorina = this.$implementation.of(30, 'Nidorina')
  public static readonly Nidoqueen = this.$implementation.of(31, 'Nidoqueen')
  public static readonly Nidoranmale = this.$implementation.of(
    32,
    'Nidoranmale'
  )
  public static readonly Nidorino = this.$implementation.of(33, 'Nidorino')
  public static readonly Nidoking = this.$implementation.of(34, 'Nidoking')
  public static readonly Clefairy = this.$implementation.of(35, 'Clefairy')
  public static readonly Clefable = this.$implementation.of(36, 'Clefable')
  public static readonly Vulpix = this.$implementation.of(37, 'Vulpix')
  public static readonly Ninetales = this.$implementation.of(38, 'Ninetales')
  public static readonly Jigglypuff = this.$implementation.of(39, 'Jigglypuff')
  public static readonly Wigglytuff = this.$implementation.of(40, 'Wigglytuff')
  public static readonly Zubat = this.$implementation.of(41, 'Zubat')
  public static readonly Golbat = this.$implementation.of(42, 'Golbat')
  public static readonly Oddish = this.$implementation.of(43, 'Oddish')
  public static readonly Gloom = this.$implementation.of(44, 'Gloom')
  public static readonly Vileplume = this.$implementation.of(45, 'Vileplume')
  public static readonly Paras = this.$implementation.of(46, 'Paras')
  public static readonly Parasect = this.$implementation.of(47, 'Parasect')
  public static readonly Venonat = this.$implementation.of(48, 'Venonat')
  public static readonly Venomoth = this.$implementation.of(49, 'Venomoth')
  public static readonly Diglett = this.$implementation.of(50, 'Diglett')
  public static readonly Dugtrio = this.$implementation.of(51, 'Dugtrio')
  public static readonly Meowth = this.$implementation.of(52, 'Meowth')
  public static readonly Persian = this.$implementation.of(53, 'Persian')
  public static readonly Psyduck = this.$implementation.of(54, 'Psyduck')
  public static readonly Golduck = this.$implementation.of(55, 'Golduck')
  public static readonly Mankey = this.$implementation.of(56, 'Mankey')
  public static readonly Primeape = this.$implementation.of(57, 'Primeape')
  public static readonly Growlithe = this.$implementation.of(58, 'Growlithe')
  public static readonly Arcanine = this.$implementation.of(59, 'Arcanine')
  public static readonly Poliwag = this.$implementation.of(60, 'Poliwag')
  public static readonly Poliwhirl = this.$implementation.of(61, 'Poliwhirl')
  public static readonly Poliwrath = this.$implementation.of(62, 'Poliwrath')
  public static readonly Abra = this.$implementation.of(63, 'Abra')
  public static readonly Kadabra = this.$implementation.of(64, 'Kadabra')
  public static readonly Alakazam = this.$implementation.of(65, 'Alakazam')
  public static readonly Machop = this.$implementation.of(66, 'Machop')
  public static readonly Machoke = this.$implementation.of(67, 'Machoke')
  public static readonly Machamp = this.$implementation.of(68, 'Machamp')
  public static readonly Bellsprout = this.$implementation.of(69, 'Bellsprout')
  public static readonly Weepinbell = this.$implementation.of(70, 'Weepinbell')
  public static readonly Victreebel = this.$implementation.of(71, 'Victreebel')
  public static readonly Tentacool = this.$implementation.of(72, 'Tentacool')
  public static readonly Tentacruel = this.$implementation.of(73, 'Tentacruel')
  public static readonly Geodude = this.$implementation.of(74, 'Geodude')
  public static readonly Graveler = this.$implementation.of(75, 'Graveler')
  public static readonly Golem = this.$implementation.of(76, 'Golem')
  public static readonly Ponyta = this.$implementation.of(77, 'Ponyta')
  public static readonly Rapidash = this.$implementation.of(78, 'Rapidash')
  public static readonly Slowpoke = this.$implementation.of(79, 'Slowpoke')
  public static readonly Slowbro = this.$implementation.of(80, 'Slowbro')
  public static readonly Magnemite = this.$implementation.of(81, 'Magnemite')
  public static readonly Magneton = this.$implementation.of(82, 'Magneton')
  public static readonly Farfetchd = this.$implementation.of(83, 'Farfetchd')
  public static readonly Doduo = this.$implementation.of(84, 'Doduo')
  public static readonly Dodrio = this.$implementation.of(85, 'Dodrio')
  public static readonly Seel = this.$implementation.of(86, 'Seel')
  public static readonly Dewgong = this.$implementation.of(87, 'Dewgong')
  public static readonly Grimer = this.$implementation.of(88, 'Grimer')
  public static readonly Muk = this.$implementation.of(89, 'Muk')
  public static readonly Shellder = this.$implementation.of(90, 'Shellder')
  public static readonly Cloyster = this.$implementation.of(91, 'Cloyster')
  public static readonly Gastly = this.$implementation.of(92, 'Gastly')
  public static readonly Haunter = this.$implementation.of(93, 'Haunter')
  public static readonly Gengar = this.$implementation.of(94, 'Gengar')
  public static readonly Onix = this.$implementation.of(95, 'Onix')
  public static readonly Drowzee = this.$implementation.of(96, 'Drowzee')
  public static readonly Hypno = this.$implementation.of(97, 'Hypno')
  public static readonly Krabby = this.$implementation.of(98, 'Krabby')
  public static readonly Kingler = this.$implementation.of(99, 'Kingler')
  public static readonly Voltorb = this.$implementation.of(100, 'Voltorb')
  public static readonly Electrode = this.$implementation.of(101, 'Electrode')
  public static readonly Exeggcute = this.$implementation.of(102, 'Exeggcute')
  public static readonly Exeggutor = this.$implementation.of(103, 'Exeggutor')
  public static readonly Cubone = this.$implementation.of(104, 'Cubone')
  public static readonly Marowak = this.$implementation.of(105, 'Marowak')
  public static readonly Hitmonlee = this.$implementation.of(106, 'Hitmonlee')
  public static readonly Hitmonchan = this.$implementation.of(107, 'Hitmonchan')
  public static readonly Lickitung = this.$implementation.of(108, 'Lickitung')
  public static readonly Koffing = this.$implementation.of(109, 'Koffing')
  public static readonly Weezing = this.$implementation.of(110, 'Weezing')
  public static readonly Rhyhorn = this.$implementation.of(111, 'Rhyhorn')
  public static readonly Rhydon = this.$implementation.of(112, 'Rhydon')
  public static readonly Chansey = this.$implementation.of(113, 'Chansey')
  public static readonly Tangela = this.$implementation.of(114, 'Tangela')
  public static readonly Kangaskhan = this.$implementation.of(115, 'Kangaskhan')
  public static readonly Horsea = this.$implementation.of(116, 'Horsea')
  public static readonly Seadra = this.$implementation.of(117, 'Seadra')
  public static readonly Goldeen = this.$implementation.of(118, 'Goldeen')
  public static readonly Seaking = this.$implementation.of(119, 'Seaking')
  public static readonly Staryu = this.$implementation.of(120, 'Staryu')
  public static readonly Starmie = this.$implementation.of(121, 'Starmie')
  public static readonly MrMime = this.$implementation.of(122, 'MrMime')
  public static readonly Scyther = this.$implementation.of(123, 'Scyther')
  public static readonly Jynx = this.$implementation.of(124, 'Jynx')
  public static readonly Electabuzz = this.$implementation.of(125, 'Electabuzz')
  public static readonly Magmar = this.$implementation.of(126, 'Magmar')
  public static readonly Pinsir = this.$implementation.of(127, 'Pinsir')
  public static readonly Tauros = this.$implementation.of(128, 'Tauros')
  public static readonly Magikarp = this.$implementation.of(129, 'Magikarp')
  public static readonly Gyarados = this.$implementation.of(130, 'Gyarados')
  public static readonly Lapras = this.$implementation.of(131, 'Lapras')
  public static readonly Ditto = this.$implementation.of(132, 'Ditto')
  public static readonly Eevee = this.$implementation.of(133, 'Eevee')
  public static readonly Vaporeon = this.$implementation.of(134, 'Vaporeon')
  public static readonly Jolteon = this.$implementation.of(135, 'Jolteon')
  public static readonly Flareon = this.$implementation.of(136, 'Flareon')
  public static readonly Porygon = this.$implementation.of(137, 'Porygon')
  public static readonly Omanyte = this.$implementation.of(138, 'Omanyte')
  public static readonly Omastar = this.$implementation.of(139, 'Omastar')
  public static readonly Kabuto = this.$implementation.of(140, 'Kabuto')
  public static readonly Kabutops = this.$implementation.of(141, 'Kabutops')
  public static readonly Aerodactyl = this.$implementation.of(142, 'Aerodactyl')
  public static readonly Snorlax = this.$implementation.of(143, 'Snorlax')
  public static readonly Articuno = this.$implementation.of(144, 'Articuno')
  public static readonly Zapdos = this.$implementation.of(145, 'Zapdos')
  public static readonly Moltres = this.$implementation.of(146, 'Moltres')
  public static readonly Dratini = this.$implementation.of(147, 'Dratini')
  public static readonly Dragonair = this.$implementation.of(148, 'Dragonair')
  public static readonly Dragonite = this.$implementation.of(149, 'Dragonite')
  public static readonly Mewtwo = this.$implementation.of(150, 'Mewtwo')
  public static readonly Mew = this.$implementation.of(151, 'Mew')
  public static readonly Chikorita = this.$implementation.of(152, 'Chikorita')
  public static readonly Bayleef = this.$implementation.of(153, 'Bayleef')
  public static readonly Meganium = this.$implementation.of(154, 'Meganium')
  public static readonly Cyndaquil = this.$implementation.of(155, 'Cyndaquil')
  public static readonly Quilava = this.$implementation.of(156, 'Quilava')
  public static readonly Typhlosion = this.$implementation.of(157, 'Typhlosion')
  public static readonly Totodile = this.$implementation.of(158, 'Totodile')
  public static readonly Croconaw = this.$implementation.of(159, 'Croconaw')
  public static readonly Feraligatr = this.$implementation.of(160, 'Feraligatr')
  public static readonly Sentret = this.$implementation.of(161, 'Sentret')
  public static readonly Furret = this.$implementation.of(162, 'Furret')
  public static readonly Hoothoot = this.$implementation.of(163, 'Hoothoot')
  public static readonly Noctowl = this.$implementation.of(164, 'Noctowl')
  public static readonly Ledyba = this.$implementation.of(165, 'Ledyba')
  public static readonly Ledian = this.$implementation.of(166, 'Ledian')
  public static readonly Spinarak = this.$implementation.of(167, 'Spinarak')
  public static readonly Ariados = this.$implementation.of(168, 'Ariados')
  public static readonly Crobat = this.$implementation.of(169, 'Crobat')
  public static readonly Chinchou = this.$implementation.of(170, 'Chinchou')
  public static readonly Lanturn = this.$implementation.of(171, 'Lanturn')
  public static readonly Pichu = this.$implementation.of(172, 'Pichu')
  public static readonly Cleffa = this.$implementation.of(173, 'Cleffa')
  public static readonly Igglybuff = this.$implementation.of(174, 'Igglybuff')
  public static readonly Togepi = this.$implementation.of(175, 'Togepi')
  public static readonly Togetic = this.$implementation.of(176, 'Togetic')
  public static readonly Natu = this.$implementation.of(177, 'Natu')
  public static readonly Xatu = this.$implementation.of(178, 'Xatu')
  public static readonly Mareep = this.$implementation.of(179, 'Mareep')
  public static readonly Flaaffy = this.$implementation.of(180, 'Flaaffy')
  public static readonly Ampharos = this.$implementation.of(181, 'Ampharos')
  public static readonly Bellossom = this.$implementation.of(182, 'Bellossom')
  public static readonly Marill = this.$implementation.of(183, 'Marill')
  public static readonly Azumarill = this.$implementation.of(184, 'Azumarill')
  public static readonly Sudowoodo = this.$implementation.of(185, 'Sudowoodo')
  public static readonly Politoed = this.$implementation.of(186, 'Politoed')
  public static readonly Hoppip = this.$implementation.of(187, 'Hoppip')
  public static readonly Skiploom = this.$implementation.of(188, 'Skiploom')
  public static readonly Jumpluff = this.$implementation.of(189, 'Jumpluff')
  public static readonly Aipom = this.$implementation.of(190, 'Aipom')
  public static readonly Sunkern = this.$implementation.of(191, 'Sunkern')
  public static readonly Sunflora = this.$implementation.of(192, 'Sunflora')
  public static readonly Yanma = this.$implementation.of(193, 'Yanma')
  public static readonly Wooper = this.$implementation.of(194, 'Wooper')
  public static readonly Quagsire = this.$implementation.of(195, 'Quagsire')
  public static readonly Espeon = this.$implementation.of(196, 'Espeon')
  public static readonly Umbreon = this.$implementation.of(197, 'Umbreon')
  public static readonly Murkrow = this.$implementation.of(198, 'Murkrow')
  public static readonly Slowking = this.$implementation.of(199, 'Slowking')
  public static readonly Misdreavus = this.$implementation.of(200, 'Misdreavus')
  public static readonly Unown = this.$implementation.of(201, 'Unown')
  public static readonly Wobbuffet = this.$implementation.of(202, 'Wobbuffet')
  public static readonly Girafarig = this.$implementation.of(203, 'Girafarig')
  public static readonly Pineco = this.$implementation.of(204, 'Pineco')
  public static readonly Forretress = this.$implementation.of(205, 'Forretress')
  public static readonly Dunsparce = this.$implementation.of(206, 'Dunsparce')
  public static readonly Gligar = this.$implementation.of(207, 'Gligar')
  public static readonly Steelix = this.$implementation.of(208, 'Steelix')
  public static readonly Snubbull = this.$implementation.of(209, 'Snubbull')
  public static readonly Granbull = this.$implementation.of(210, 'Granbull')
  public static readonly Qwilfish = this.$implementation.of(211, 'Qwilfish')
  public static readonly Scizor = this.$implementation.of(212, 'Scizor')
  public static readonly Shuckle = this.$implementation.of(213, 'Shuckle')
  public static readonly Heracross = this.$implementation.of(214, 'Heracross')
  public static readonly Sneasel = this.$implementation.of(215, 'Sneasel')
  public static readonly Teddiursa = this.$implementation.of(216, 'Teddiursa')
  public static readonly Ursaring = this.$implementation.of(217, 'Ursaring')
  public static readonly Slugma = this.$implementation.of(218, 'Slugma')
  public static readonly Magcargo = this.$implementation.of(219, 'Magcargo')
  public static readonly Swinub = this.$implementation.of(220, 'Swinub')
  public static readonly Piloswine = this.$implementation.of(221, 'Piloswine')
  public static readonly Corsola = this.$implementation.of(222, 'Corsola')
  public static readonly Remoraid = this.$implementation.of(223, 'Remoraid')
  public static readonly Octillery = this.$implementation.of(224, 'Octillery')
  public static readonly Delibird = this.$implementation.of(225, 'Delibird')
  public static readonly Mantine = this.$implementation.of(226, 'Mantine')
  public static readonly Skarmory = this.$implementation.of(227, 'Skarmory')
  public static readonly Houndour = this.$implementation.of(228, 'Houndour')
  public static readonly Houndoom = this.$implementation.of(229, 'Houndoom')
  public static readonly Kingdra = this.$implementation.of(230, 'Kingdra')
  public static readonly Phanpy = this.$implementation.of(231, 'Phanpy')
  public static readonly Donphan = this.$implementation.of(232, 'Donphan')
  public static readonly Porygon2 = this.$implementation.of(233, 'Porygon2')
  public static readonly Stantler = this.$implementation.of(234, 'Stantler')
  public static readonly Smeargle = this.$implementation.of(235, 'Smeargle')
  public static readonly Tyrogue = this.$implementation.of(236, 'Tyrogue')
  public static readonly Hitmontop = this.$implementation.of(237, 'Hitmontop')
  public static readonly Smoochum = this.$implementation.of(238, 'Smoochum')
  public static readonly Elekid = this.$implementation.of(239, 'Elekid')
  public static readonly Magby = this.$implementation.of(240, 'Magby')
  public static readonly Miltank = this.$implementation.of(241, 'Miltank')
  public static readonly Blissey = this.$implementation.of(242, 'Blissey')
  public static readonly Raikou = this.$implementation.of(243, 'Raikou')
  public static readonly Entei = this.$implementation.of(244, 'Entei')
  public static readonly Suicune = this.$implementation.of(245, 'Suicune')
  public static readonly Larvitar = this.$implementation.of(246, 'Larvitar')
  public static readonly Pupitar = this.$implementation.of(247, 'Pupitar')
  public static readonly Tyranitar = this.$implementation.of(248, 'Tyranitar')
  public static readonly Lugia = this.$implementation.of(249, 'Lugia')
  public static readonly Hooh = this.$implementation.of(250, 'Ho-Oh')
  public static readonly Celebi = this.$implementation.of(251, 'Celebi')
  public static readonly Treecko = this.$implementation.of(252, 'Treecko')
  public static readonly Grovyle = this.$implementation.of(253, 'Grovyle')
  public static readonly Sceptile = this.$implementation.of(254, 'Sceptile')
  public static readonly Torchic = this.$implementation.of(255, 'Torchic')
  public static readonly Combusken = this.$implementation.of(256, 'Combusken')
  public static readonly Blaziken = this.$implementation.of(257, 'Blaziken')
  public static readonly Mudkip = this.$implementation.of(258, 'Mudkip')
  public static readonly Marshtomp = this.$implementation.of(259, 'Marshtomp')
  public static readonly Swampert = this.$implementation.of(260, 'Swampert')
  public static readonly Poochyena = this.$implementation.of(261, 'Poochyena')
  public static readonly Mightyena = this.$implementation.of(262, 'Mightyena')
  public static readonly Zigzagoon = this.$implementation.of(263, 'Zigzagoon')
  public static readonly Linoone = this.$implementation.of(264, 'Linoone')
  public static readonly Wurmple = this.$implementation.of(265, 'Wurmple')
  public static readonly Silcoon = this.$implementation.of(266, 'Silcoon')
  public static readonly Beautifly = this.$implementation.of(267, 'Beautifly')
  public static readonly Cascoon = this.$implementation.of(268, 'Cascoon')
  public static readonly Dustox = this.$implementation.of(269, 'Dustox')
  public static readonly Lotad = this.$implementation.of(270, 'Lotad')
  public static readonly Lombre = this.$implementation.of(271, 'Lombre')
  public static readonly Ludicolo = this.$implementation.of(272, 'Ludicolo')
  public static readonly Seedot = this.$implementation.of(273, 'Seedot')
  public static readonly Nuzleaf = this.$implementation.of(274, 'Nuzleaf')
  public static readonly Shiftry = this.$implementation.of(275, 'Shiftry')
  public static readonly Taillow = this.$implementation.of(276, 'Taillow')
  public static readonly Swellow = this.$implementation.of(277, 'Swellow')
  public static readonly Wingull = this.$implementation.of(278, 'Wingull')
  public static readonly Pelipper = this.$implementation.of(279, 'Pelipper')
  public static readonly Ralts = this.$implementation.of(280, 'Ralts')
  public static readonly Kirlia = this.$implementation.of(281, 'Kirlia')
  public static readonly Gardevoir = this.$implementation.of(282, 'Gardevoir')
  public static readonly Surskit = this.$implementation.of(283, 'Surskit')
  public static readonly Masquerain = this.$implementation.of(284, 'Masquerain')
  public static readonly Shroomish = this.$implementation.of(285, 'Shroomish')
  public static readonly Breloom = this.$implementation.of(286, 'Breloom')
  public static readonly Slakoth = this.$implementation.of(287, 'Slakoth')
  public static readonly Vigoroth = this.$implementation.of(288, 'Vigoroth')
  public static readonly Slaking = this.$implementation.of(289, 'Slaking')
  public static readonly Nincada = this.$implementation.of(290, 'Nincada')
  public static readonly Ninjask = this.$implementation.of(291, 'Ninjask')
  public static readonly Shedinja = this.$implementation.of(292, 'Shedinja')
  public static readonly Whismur = this.$implementation.of(293, 'Whismur')
  public static readonly Loudred = this.$implementation.of(294, 'Loudred')
  public static readonly Exploud = this.$implementation.of(295, 'Exploud')
  public static readonly Makuhita = this.$implementation.of(296, 'Makuhita')
  public static readonly Hariyama = this.$implementation.of(297, 'Hariyama')
  public static readonly Azurill = this.$implementation.of(298, 'Azurill')
  public static readonly Nosepass = this.$implementation.of(299, 'Nosepass')
  public static readonly Skitty = this.$implementation.of(300, 'Skitty')
  public static readonly Delcatty = this.$implementation.of(301, 'Delcatty')
  public static readonly Sableye = this.$implementation.of(302, 'Sableye')
  public static readonly Mawile = this.$implementation.of(303, 'Mawile')
  public static readonly Aron = this.$implementation.of(304, 'Aron')
  public static readonly Lairon = this.$implementation.of(305, 'Lairon')
  public static readonly Aggron = this.$implementation.of(306, 'Aggron')
  public static readonly Meditite = this.$implementation.of(307, 'Meditite')
  public static readonly Medicham = this.$implementation.of(308, 'Medicham')
  public static readonly Electrike = this.$implementation.of(309, 'Electrike')
  public static readonly Manectric = this.$implementation.of(310, 'Manectric')
  public static readonly Plusle = this.$implementation.of(311, 'Plusle')
  public static readonly Minun = this.$implementation.of(312, 'Minun')
  public static readonly Volbeat = this.$implementation.of(313, 'Volbeat')
  public static readonly Illumise = this.$implementation.of(314, 'Illumise')
  public static readonly Roselia = this.$implementation.of(315, 'Roselia')
  public static readonly Gulpin = this.$implementation.of(316, 'Gulpin')
  public static readonly Swalot = this.$implementation.of(317, 'Swalot')
  public static readonly Carvanha = this.$implementation.of(318, 'Carvanha')
  public static readonly Sharpedo = this.$implementation.of(319, 'Sharpedo')
  public static readonly Wailmer = this.$implementation.of(320, 'Wailmer')
  public static readonly Wailord = this.$implementation.of(321, 'Wailord')
  public static readonly Numel = this.$implementation.of(322, 'Numel')
  public static readonly Camerupt = this.$implementation.of(323, 'Camerupt')
  public static readonly Torkoal = this.$implementation.of(324, 'Torkoal')
  public static readonly Spoink = this.$implementation.of(325, 'Spoink')
  public static readonly Grumpig = this.$implementation.of(326, 'Grumpig')
  public static readonly Spinda = this.$implementation.of(327, 'Spinda')
  public static readonly Trapinch = this.$implementation.of(328, 'Trapinch')
  public static readonly Vibrava = this.$implementation.of(329, 'Vibrava')
  public static readonly Flygon = this.$implementation.of(330, 'Flygon')
  public static readonly Cacnea = this.$implementation.of(331, 'Cacnea')
  public static readonly Cacturne = this.$implementation.of(332, 'Cacturne')
  public static readonly Swablu = this.$implementation.of(333, 'Swablu')
  public static readonly Altaria = this.$implementation.of(334, 'Altaria')
  public static readonly Zangoose = this.$implementation.of(335, 'Zangoose')
  public static readonly Seviper = this.$implementation.of(336, 'Seviper')
  public static readonly Lunatone = this.$implementation.of(337, 'Lunatone')
  public static readonly Solrock = this.$implementation.of(338, 'Solrock')
  public static readonly Barboach = this.$implementation.of(339, 'Barboach')
  public static readonly Whiscash = this.$implementation.of(340, 'Whiscash')
  public static readonly Corphish = this.$implementation.of(341, 'Corphish')
  public static readonly Crawdaunt = this.$implementation.of(342, 'Crawdaunt')
  public static readonly Baltoy = this.$implementation.of(343, 'Baltoy')
  public static readonly Claydol = this.$implementation.of(344, 'Claydol')
  public static readonly Lileep = this.$implementation.of(345, 'Lileep')
  public static readonly Cradily = this.$implementation.of(346, 'Cradily')
  public static readonly Anorith = this.$implementation.of(347, 'Anorith')
  public static readonly Armaldo = this.$implementation.of(348, 'Armaldo')
  public static readonly Feebas = this.$implementation.of(349, 'Feebas')
  public static readonly Milotic = this.$implementation.of(350, 'Milotic')
  public static readonly Castform = this.$implementation.of(351, 'Castform')
  public static readonly Kecleon = this.$implementation.of(352, 'Kecleon')
  public static readonly Shuppet = this.$implementation.of(353, 'Shuppet')
  public static readonly Banette = this.$implementation.of(354, 'Banette')
  public static readonly Duskull = this.$implementation.of(355, 'Duskull')
  public static readonly Dusclops = this.$implementation.of(356, 'Dusclops')
  public static readonly Tropius = this.$implementation.of(357, 'Tropius')
  public static readonly Chimecho = this.$implementation.of(358, 'Chimecho')
  public static readonly Absol = this.$implementation.of(359, 'Absol')
  public static readonly Wynaut = this.$implementation.of(360, 'Wynaut')
  public static readonly Snorunt = this.$implementation.of(361, 'Snorunt')
  public static readonly Glalie = this.$implementation.of(362, 'Glalie')
  public static readonly Spheal = this.$implementation.of(363, 'Spheal')
  public static readonly Sealeo = this.$implementation.of(364, 'Sealeo')
  public static readonly Walrein = this.$implementation.of(365, 'Walrein')
  public static readonly Clamperl = this.$implementation.of(366, 'Clamperl')
  public static readonly Huntail = this.$implementation.of(367, 'Huntail')
  public static readonly Gorebyss = this.$implementation.of(368, 'Gorebyss')
  public static readonly Relicanth = this.$implementation.of(369, 'Relicanth')
  public static readonly Luvdisc = this.$implementation.of(370, 'Luvdisc')
  public static readonly Bagon = this.$implementation.of(371, 'Bagon')
  public static readonly Shelgon = this.$implementation.of(372, 'Shelgon')
  public static readonly Salamence = this.$implementation.of(373, 'Salamence')
  public static readonly Beldum = this.$implementation.of(374, 'Beldum')
  public static readonly Metang = this.$implementation.of(375, 'Metang')
  public static readonly Metagross = this.$implementation.of(376, 'Metagross')
  public static readonly Regirock = this.$implementation.of(377, 'Regirock')
  public static readonly Regice = this.$implementation.of(378, 'Regice')
  public static readonly Registeel = this.$implementation.of(379, 'Registeel')
  public static readonly Latias = this.$implementation.of(380, 'Latias')
  public static readonly Latios = this.$implementation.of(381, 'Latios')
  public static readonly Kyogre = this.$implementation.of(382, 'Kyogre')
  public static readonly Groudon = this.$implementation.of(383, 'Groudon')
  public static readonly Rayquaza = this.$implementation.of(384, 'Rayquaza')
  public static readonly Jirachi = this.$implementation.of(385, 'Jirachi')
  public static readonly Deoxys = this.$implementation.of(386, 'Deoxys')
  public static readonly Turtwig = this.$implementation.of(387, 'Turtwig')
  public static readonly Grotle = this.$implementation.of(388, 'Grotle')
  public static readonly Torterra = this.$implementation.of(389, 'Torterra')
  public static readonly Chimchar = this.$implementation.of(390, 'Chimchar')
  public static readonly Monferno = this.$implementation.of(391, 'Monferno')
  public static readonly Infernape = this.$implementation.of(392, 'Infernape')
  public static readonly Piplup = this.$implementation.of(393, 'Piplup')
  public static readonly Prinplup = this.$implementation.of(394, 'Prinplup')
  public static readonly Empoleon = this.$implementation.of(395, 'Empoleon')
  public static readonly Starly = this.$implementation.of(396, 'Starly')
  public static readonly Staravia = this.$implementation.of(397, 'Staravia')
  public static readonly Staraptor = this.$implementation.of(398, 'Staraptor')
  public static readonly Bidoof = this.$implementation.of(399, 'Bidoof')
  public static readonly Bibarel = this.$implementation.of(400, 'Bibarel')
  public static readonly Kricketot = this.$implementation.of(401, 'Kricketot')
  public static readonly Kricketune = this.$implementation.of(402, 'Kricketune')
  public static readonly Shinx = this.$implementation.of(403, 'Shinx')
  public static readonly Luxio = this.$implementation.of(404, 'Luxio')
  public static readonly Luxray = this.$implementation.of(405, 'Luxray')
  public static readonly Budew = this.$implementation.of(406, 'Budew')
  public static readonly Roserade = this.$implementation.of(407, 'Roserade')
  public static readonly Cranidos = this.$implementation.of(408, 'Cranidos')
  public static readonly Rampardos = this.$implementation.of(409, 'Rampardos')
  public static readonly Shieldon = this.$implementation.of(410, 'Shieldon')
  public static readonly Bastiodon = this.$implementation.of(411, 'Bastiodon')
  public static readonly Burmy = this.$implementation.of(412, 'Burmy')
  public static readonly Wormadam = this.$implementation.of(413, 'Wormadam')
  public static readonly Mothim = this.$implementation.of(414, 'Mothim')
  public static readonly Combee = this.$implementation.of(415, 'Combee')
  public static readonly Vespiquen = this.$implementation.of(416, 'Vespiquen')
  public static readonly Pachirisu = this.$implementation.of(417, 'Pachirisu')
  public static readonly Buizel = this.$implementation.of(418, 'Buizel')
  public static readonly Floatzel = this.$implementation.of(419, 'Floatzel')
  public static readonly Cherubi = this.$implementation.of(420, 'Cherubi')
  public static readonly Cherrim = this.$implementation.of(421, 'Cherrim')
  public static readonly Shellos = this.$implementation.of(422, 'Shellos')
  public static readonly Gastrodon = this.$implementation.of(423, 'Gastrodon')
  public static readonly Ambipom = this.$implementation.of(424, 'Ambipom')
  public static readonly Drifloon = this.$implementation.of(425, 'Drifloon')
  public static readonly Drifblim = this.$implementation.of(426, 'Drifblim')
  public static readonly Buneary = this.$implementation.of(427, 'Buneary')
  public static readonly Lopunny = this.$implementation.of(428, 'Lopunny')
  public static readonly Mismagius = this.$implementation.of(429, 'Mismagius')
  public static readonly Honchkrow = this.$implementation.of(430, 'Honchkrow')
  public static readonly Glameow = this.$implementation.of(431, 'Glameow')
  public static readonly Purugly = this.$implementation.of(432, 'Purugly')
  public static readonly Chingling = this.$implementation.of(433, 'Chingling')
  public static readonly Stunky = this.$implementation.of(434, 'Stunky')
  public static readonly Skuntank = this.$implementation.of(435, 'Skuntank')
  public static readonly Bronzor = this.$implementation.of(436, 'Bronzor')
  public static readonly Bronzong = this.$implementation.of(437, 'Bronzong')
  public static readonly Bonsly = this.$implementation.of(438, 'Bonsly')
  public static readonly MimeJr = this.$implementation.of(439, 'MimeJr')
  public static readonly Happiny = this.$implementation.of(440, 'Happiny')
  public static readonly Chatot = this.$implementation.of(441, 'Chatot')
  public static readonly Spiritomb = this.$implementation.of(442, 'Spiritomb')
  public static readonly Gible = this.$implementation.of(443, 'Gible')
  public static readonly Gabite = this.$implementation.of(444, 'Gabite')
  public static readonly Garchomp = this.$implementation.of(445, 'Garchomp')
  public static readonly Munchlax = this.$implementation.of(446, 'Munchlax')
  public static readonly Riolu = this.$implementation.of(447, 'Riolu')
  public static readonly Lucario = this.$implementation.of(448, 'Lucario')
  public static readonly Hippopotas = this.$implementation.of(449, 'Hippopotas')
  public static readonly Hippowdon = this.$implementation.of(450, 'Hippowdon')
  public static readonly Skorupi = this.$implementation.of(451, 'Skorupi')
  public static readonly Drapion = this.$implementation.of(452, 'Drapion')
  public static readonly Croagunk = this.$implementation.of(453, 'Croagunk')
  public static readonly Toxicroak = this.$implementation.of(454, 'Toxicroak')
  public static readonly Carnivine = this.$implementation.of(455, 'Carnivine')
  public static readonly Finneon = this.$implementation.of(456, 'Finneon')
  public static readonly Lumineon = this.$implementation.of(457, 'Lumineon')
  public static readonly Mantyke = this.$implementation.of(458, 'Mantyke')
  public static readonly Snover = this.$implementation.of(459, 'Snover')
  public static readonly Abomasnow = this.$implementation.of(460, 'Abomasnow')
  public static readonly Weavile = this.$implementation.of(461, 'Weavile')
  public static readonly Magnezone = this.$implementation.of(462, 'Magnezone')
  public static readonly Lickilicky = this.$implementation.of(463, 'Lickilicky')
  public static readonly Rhyperior = this.$implementation.of(464, 'Rhyperior')
  public static readonly Tangrowth = this.$implementation.of(465, 'Tangrowth')
  public static readonly Electivire = this.$implementation.of(466, 'Electivire')
  public static readonly Magmortar = this.$implementation.of(467, 'Magmortar')
  public static readonly Togekiss = this.$implementation.of(468, 'Togekiss')
  public static readonly Yanmega = this.$implementation.of(469, 'Yanmega')
  public static readonly Leafeon = this.$implementation.of(470, 'Leafeon')
  public static readonly Glaceon = this.$implementation.of(471, 'Glaceon')
  public static readonly Gliscor = this.$implementation.of(472, 'Gliscor')
  public static readonly Mamoswine = this.$implementation.of(473, 'Mamoswine')
  public static readonly PorygonZ = this.$implementation.of(474, 'Porygon-Z')
  public static readonly Gallade = this.$implementation.of(475, 'Gallade')
  public static readonly Probopass = this.$implementation.of(476, 'Probopass')
  public static readonly Dusknoir = this.$implementation.of(477, 'Dusknoir')
  public static readonly Froslass = this.$implementation.of(478, 'Froslass')
  public static readonly Rotom = this.$implementation.of(479, 'Rotom')
  public static readonly Uxie = this.$implementation.of(480, 'Uxie')
  public static readonly Mesprit = this.$implementation.of(481, 'Mesprit')
  public static readonly Azelf = this.$implementation.of(482, 'Azelf')
  public static readonly Dialga = this.$implementation.of(483, 'Dialga')
  public static readonly Palkia = this.$implementation.of(484, 'Palkia')
  public static readonly Heatran = this.$implementation.of(485, 'Heatran')
  public static readonly Regigigas = this.$implementation.of(486, 'Regigigas')
  public static readonly Giratina = this.$implementation.of(487, 'Giratina')
  public static readonly Cresselia = this.$implementation.of(488, 'Cresselia')
  public static readonly Phione = this.$implementation.of(489, 'Phione')
  public static readonly Manaphy = this.$implementation.of(490, 'Manaphy')
  public static readonly Darkrai = this.$implementation.of(491, 'Darkrai')
  public static readonly Shaymin = this.$implementation.of(492, 'Shaymin')
  public static readonly Arceus = this.$implementation.of(493, 'Arceus')
  public static readonly Victini = this.$implementation.of(494, 'Victini')
  public static readonly Snivy = this.$implementation.of(495, 'Snivy')
  public static readonly Servine = this.$implementation.of(496, 'Servine')
  public static readonly Serperior = this.$implementation.of(497, 'Serperior')
  public static readonly Tepig = this.$implementation.of(498, 'Tepig')
  public static readonly Pignite = this.$implementation.of(499, 'Pignite')
  public static readonly Emboar = this.$implementation.of(500, 'Emboar')
  public static readonly Oshawott = this.$implementation.of(501, 'Oshawott')
  public static readonly Dewott = this.$implementation.of(502, 'Dewott')
  public static readonly Samurott = this.$implementation.of(503, 'Samurott')
  public static readonly Patrat = this.$implementation.of(504, 'Patrat')
  public static readonly Watchog = this.$implementation.of(505, 'Watchog')
  public static readonly Lillipup = this.$implementation.of(506, 'Lillipup')
  public static readonly Herdier = this.$implementation.of(507, 'Herdier')
  public static readonly Stoutland = this.$implementation.of(508, 'Stoutland')
  public static readonly Purrloin = this.$implementation.of(509, 'Purrloin')
  public static readonly Liepard = this.$implementation.of(510, 'Liepard')
  public static readonly Pansage = this.$implementation.of(511, 'Pansage')
  public static readonly Simisage = this.$implementation.of(512, 'Simisage')
  public static readonly Pansear = this.$implementation.of(513, 'Pansear')
  public static readonly Simisear = this.$implementation.of(514, 'Simisear')
  public static readonly Panpour = this.$implementation.of(515, 'Panpour')
  public static readonly Simipour = this.$implementation.of(516, 'Simipour')
  public static readonly Munna = this.$implementation.of(517, 'Munna')
  public static readonly Musharna = this.$implementation.of(518, 'Musharna')
  public static readonly Pidove = this.$implementation.of(519, 'Pidove')
  public static readonly Tranquill = this.$implementation.of(520, 'Tranquill')
  public static readonly Unfezant = this.$implementation.of(521, 'Unfezant')
  public static readonly Blitzle = this.$implementation.of(522, 'Blitzle')
  public static readonly Zebstrika = this.$implementation.of(523, 'Zebstrika')
  public static readonly Roggenrola = this.$implementation.of(524, 'Roggenrola')
  public static readonly Boldore = this.$implementation.of(525, 'Boldore')
  public static readonly Gigalith = this.$implementation.of(526, 'Gigalith')
  public static readonly Woobat = this.$implementation.of(527, 'Woobat')
  public static readonly Swoobat = this.$implementation.of(528, 'Swoobat')
  public static readonly Drilbur = this.$implementation.of(529, 'Drilbur')
  public static readonly Excadrill = this.$implementation.of(530, 'Excadrill')
  public static readonly Audino = this.$implementation.of(531, 'Audino')
  public static readonly Timburr = this.$implementation.of(532, 'Timburr')
  public static readonly Gurdurr = this.$implementation.of(533, 'Gurdurr')
  public static readonly Conkeldurr = this.$implementation.of(534, 'Conkeldurr')
  public static readonly Tympole = this.$implementation.of(535, 'Tympole')
  public static readonly Palpitoad = this.$implementation.of(536, 'Palpitoad')
  public static readonly Seismitoad = this.$implementation.of(537, 'Seismitoad')
  public static readonly Throh = this.$implementation.of(538, 'Throh')
  public static readonly Sawk = this.$implementation.of(539, 'Sawk')
  public static readonly Sewaddle = this.$implementation.of(540, 'Sewaddle')
  public static readonly Swadloon = this.$implementation.of(541, 'Swadloon')
  public static readonly Leavanny = this.$implementation.of(542, 'Leavanny')
  public static readonly Venipede = this.$implementation.of(543, 'Venipede')
  public static readonly Whirlipede = this.$implementation.of(544, 'Whirlipede')
  public static readonly Scolipede = this.$implementation.of(545, 'Scolipede')
  public static readonly Cottonee = this.$implementation.of(546, 'Cottonee')
  public static readonly Whimsicott = this.$implementation.of(547, 'Whimsicott')
  public static readonly Petilil = this.$implementation.of(548, 'Petilil')
  public static readonly Lilligant = this.$implementation.of(549, 'Lilligant')
  public static readonly Basculin = this.$implementation.of(550, 'Basculin')
  public static readonly Sandile = this.$implementation.of(551, 'Sandile')
  public static readonly Krokorok = this.$implementation.of(552, 'Krokorok')
  public static readonly Krookodile = this.$implementation.of(553, 'Krookodile')
  public static readonly Darumaka = this.$implementation.of(554, 'Darumaka')
  public static readonly Darmanitan = this.$implementation.of(555, 'Darmanitan')
  public static readonly Maractus = this.$implementation.of(556, 'Maractus')
  public static readonly Dwebble = this.$implementation.of(557, 'Dwebble')
  public static readonly Crustle = this.$implementation.of(558, 'Crustle')
  public static readonly Scraggy = this.$implementation.of(559, 'Scraggy')
  public static readonly Scrafty = this.$implementation.of(560, 'Scrafty')
  public static readonly Sigilyph = this.$implementation.of(561, 'Sigilyph')
  public static readonly Yamask = this.$implementation.of(562, 'Yamask')
  public static readonly Cofagrigus = this.$implementation.of(563, 'Cofagrigus')
  public static readonly Tirtouga = this.$implementation.of(564, 'Tirtouga')
  public static readonly Carracosta = this.$implementation.of(565, 'Carracosta')
  public static readonly Archen = this.$implementation.of(566, 'Archen')
  public static readonly Archeops = this.$implementation.of(567, 'Archeops')
  public static readonly Trubbish = this.$implementation.of(568, 'Trubbish')
  public static readonly Garbodor = this.$implementation.of(569, 'Garbodor')
  public static readonly Zorua = this.$implementation.of(570, 'Zorua')
  public static readonly Zoroark = this.$implementation.of(571, 'Zoroark')
  public static readonly Minccino = this.$implementation.of(572, 'Minccino')
  public static readonly Cinccino = this.$implementation.of(573, 'Cinccino')
  public static readonly Gothita = this.$implementation.of(574, 'Gothita')
  public static readonly Gothorita = this.$implementation.of(575, 'Gothorita')
  public static readonly Gothitelle = this.$implementation.of(576, 'Gothitelle')
  public static readonly Solosis = this.$implementation.of(577, 'Solosis')
  public static readonly Duosion = this.$implementation.of(578, 'Duosion')
  public static readonly Reuniclus = this.$implementation.of(579, 'Reuniclus')
  public static readonly Ducklett = this.$implementation.of(580, 'Ducklett')
  public static readonly Swanna = this.$implementation.of(581, 'Swanna')
  public static readonly Vanillite = this.$implementation.of(582, 'Vanillite')
  public static readonly Vanillish = this.$implementation.of(583, 'Vanillish')
  public static readonly Vanilluxe = this.$implementation.of(584, 'Vanilluxe')
  public static readonly Deerling = this.$implementation.of(585, 'Deerling')
  public static readonly Sawsbuck = this.$implementation.of(586, 'Sawsbuck')
  public static readonly Emolga = this.$implementation.of(587, 'Emolga')
  public static readonly Karrablast = this.$implementation.of(588, 'Karrablast')
  public static readonly Escavalier = this.$implementation.of(589, 'Escavalier')
  public static readonly Foongus = this.$implementation.of(590, 'Foongus')
  public static readonly Amoonguss = this.$implementation.of(591, 'Amoonguss')
  public static readonly Frillish = this.$implementation.of(592, 'Frillish')
  public static readonly Jellicent = this.$implementation.of(593, 'Jellicent')
  public static readonly Alomomola = this.$implementation.of(594, 'Alomomola')
  public static readonly Joltik = this.$implementation.of(595, 'Joltik')
  public static readonly Galvantula = this.$implementation.of(596, 'Galvantula')
  public static readonly Ferroseed = this.$implementation.of(597, 'Ferroseed')
  public static readonly Ferrothorn = this.$implementation.of(598, 'Ferrothorn')
  public static readonly Klink = this.$implementation.of(599, 'Klink')
  public static readonly Klang = this.$implementation.of(600, 'Klang')
  public static readonly Klinklang = this.$implementation.of(601, 'Klinklang')
  public static readonly Tynamo = this.$implementation.of(602, 'Tynamo')
  public static readonly Eelektrik = this.$implementation.of(603, 'Eelektrik')
  public static readonly Eelektross = this.$implementation.of(604, 'Eelektross')
  public static readonly Elgyem = this.$implementation.of(605, 'Elgyem')
  public static readonly Beheeyem = this.$implementation.of(606, 'Beheeyem')
  public static readonly Litwick = this.$implementation.of(607, 'Litwick')
  public static readonly Lampent = this.$implementation.of(608, 'Lampent')
  public static readonly Chandelure = this.$implementation.of(609, 'Chandelure')
  public static readonly Axew = this.$implementation.of(610, 'Axew')
  public static readonly Fraxure = this.$implementation.of(611, 'Fraxure')
  public static readonly Haxorus = this.$implementation.of(612, 'Haxorus')
  public static readonly Cubchoo = this.$implementation.of(613, 'Cubchoo')
  public static readonly Beartic = this.$implementation.of(614, 'Beartic')
  public static readonly Cryogonal = this.$implementation.of(615, 'Cryogonal')
  public static readonly Shelmet = this.$implementation.of(616, 'Shelmet')
  public static readonly Accelgor = this.$implementation.of(617, 'Accelgor')
  public static readonly Stunfisk = this.$implementation.of(618, 'Stunfisk')
  public static readonly Mienfoo = this.$implementation.of(619, 'Mienfoo')
  public static readonly Mienshao = this.$implementation.of(620, 'Mienshao')
  public static readonly Druddigon = this.$implementation.of(621, 'Druddigon')
  public static readonly Golett = this.$implementation.of(622, 'Golett')
  public static readonly Golurk = this.$implementation.of(623, 'Golurk')
  public static readonly Pawniard = this.$implementation.of(624, 'Pawniard')
  public static readonly Bisharp = this.$implementation.of(625, 'Bisharp')
  public static readonly Bouffalant = this.$implementation.of(626, 'Bouffalant')
  public static readonly Rufflet = this.$implementation.of(627, 'Rufflet')
  public static readonly Braviary = this.$implementation.of(628, 'Braviary')
  public static readonly Vullaby = this.$implementation.of(629, 'Vullaby')
  public static readonly Mandibuzz = this.$implementation.of(630, 'Mandibuzz')
  public static readonly Heatmor = this.$implementation.of(631, 'Heatmor')
  public static readonly Durant = this.$implementation.of(632, 'Durant')
  public static readonly Deino = this.$implementation.of(633, 'Deino')
  public static readonly Zweilous = this.$implementation.of(634, 'Zweilous')
  public static readonly Hydreigon = this.$implementation.of(635, 'Hydreigon')
  public static readonly Larvesta = this.$implementation.of(636, 'Larvesta')
  public static readonly Volcarona = this.$implementation.of(637, 'Volcarona')
  public static readonly Cobalion = this.$implementation.of(638, 'Cobalion')
  public static readonly Terrakion = this.$implementation.of(639, 'Terrakion')
  public static readonly Virizion = this.$implementation.of(640, 'Virizion')
  public static readonly Tornadus = this.$implementation.of(641, 'Tornadus')
  public static readonly Thundurus = this.$implementation.of(642, 'Thundurus')
  public static readonly Reshiram = this.$implementation.of(643, 'Reshiram')
  public static readonly Zekrom = this.$implementation.of(644, 'Zekrom')
  public static readonly Landorus = this.$implementation.of(645, 'Landorus')
  public static readonly Kyurem = this.$implementation.of(646, 'Kyurem')
  public static readonly Keldeo = this.$implementation.of(647, 'Keldeo')
  public static readonly Meloetta = this.$implementation.of(648, 'Meloetta')
  public static readonly Genesect = this.$implementation.of(649, 'Genesect')
  public static readonly Chespin = this.$implementation.of(650, 'Chespin')
  public static readonly Quilladin = this.$implementation.of(651, 'Quilladin')
  public static readonly Chesnaught = this.$implementation.of(652, 'Chesnaught')
  public static readonly Fennekin = this.$implementation.of(653, 'Fennekin')
  public static readonly Braixen = this.$implementation.of(654, 'Braixen')
  public static readonly Delphox = this.$implementation.of(655, 'Delphox')
  public static readonly Froakie = this.$implementation.of(656, 'Froakie')
  public static readonly Frogadier = this.$implementation.of(657, 'Frogadier')
  public static readonly Greninja = this.$implementation.of(658, 'Greninja')
  public static readonly Bunnelby = this.$implementation.of(659, 'Bunnelby')
  public static readonly Diggersby = this.$implementation.of(660, 'Diggersby')
  public static readonly Fletchling = this.$implementation.of(661, 'Fletchling')
  public static readonly Fletchinder = this.$implementation.of(
    662,
    'Fletchinder'
  )
  public static readonly Talonflame = this.$implementation.of(663, 'Talonflame')
  public static readonly Scatterbug = this.$implementation.of(664, 'Scatterbug')
  public static readonly Spewpa = this.$implementation.of(665, 'Spewpa')
  public static readonly Vivillon = this.$implementation.of(666, 'Vivillon')
  public static readonly Litleo = this.$implementation.of(667, 'Litleo')
  public static readonly Pyroar = this.$implementation.of(668, 'Pyroar')
  public static readonly Flabebe = this.$implementation.of(669, 'Flabebe')
  public static readonly Floette = this.$implementation.of(670, 'Floette')
  public static readonly Florges = this.$implementation.of(671, 'Florges')
  public static readonly Skiddo = this.$implementation.of(672, 'Skiddo')
  public static readonly Gogoat = this.$implementation.of(673, 'Gogoat')
  public static readonly Pancham = this.$implementation.of(674, 'Pancham')
  public static readonly Pangoro = this.$implementation.of(675, 'Pangoro')
  public static readonly Furfrou = this.$implementation.of(676, 'Furfrou')
  public static readonly Espurr = this.$implementation.of(677, 'Espurr')
  public static readonly Meowstic = this.$implementation.of(678, 'Meowstic')
  public static readonly Honedge = this.$implementation.of(679, 'Honedge')
  public static readonly Doublade = this.$implementation.of(680, 'Doublade')
  public static readonly Aegislash = this.$implementation.of(681, 'Aegislash')
  public static readonly Spritzee = this.$implementation.of(682, 'Spritzee')
  public static readonly Aromatisse = this.$implementation.of(683, 'Aromatisse')
  public static readonly Swirlix = this.$implementation.of(684, 'Swirlix')
  public static readonly Slurpuff = this.$implementation.of(685, 'Slurpuff')
  public static readonly Inkay = this.$implementation.of(686, 'Inkay')
  public static readonly Malamar = this.$implementation.of(687, 'Malamar')
  public static readonly Binacle = this.$implementation.of(688, 'Binacle')
  public static readonly Barbaracle = this.$implementation.of(689, 'Barbaracle')
  public static readonly Skrelp = this.$implementation.of(690, 'Skrelp')
  public static readonly Dragalge = this.$implementation.of(691, 'Dragalge')
  public static readonly Clauncher = this.$implementation.of(692, 'Clauncher')
  public static readonly Clawitzer = this.$implementation.of(693, 'Clawitzer')
  public static readonly Helioptile = this.$implementation.of(694, 'Helioptile')
  public static readonly Heliolisk = this.$implementation.of(695, 'Heliolisk')
  public static readonly Tyrunt = this.$implementation.of(696, 'Tyrunt')
  public static readonly Tyrantrum = this.$implementation.of(697, 'Tyrantrum')
  public static readonly Amaura = this.$implementation.of(698, 'Amaura')
  public static readonly Aurorus = this.$implementation.of(699, 'Aurorus')
  public static readonly Sylveon = this.$implementation.of(700, 'Sylveon')
  public static readonly Hawlucha = this.$implementation.of(701, 'Hawlucha')
  public static readonly Dedenne = this.$implementation.of(702, 'Dedenne')
  public static readonly Carbink = this.$implementation.of(703, 'Carbink')
  public static readonly Goomy = this.$implementation.of(704, 'Goomy')
  public static readonly Sliggoo = this.$implementation.of(705, 'Sliggoo')
  public static readonly Goodra = this.$implementation.of(706, 'Goodra')
  public static readonly Klefki = this.$implementation.of(707, 'Klefki')
  public static readonly Phantump = this.$implementation.of(708, 'Phantump')
  public static readonly Trevenant = this.$implementation.of(709, 'Trevenant')
  public static readonly Pumpkaboo = this.$implementation.of(710, 'Pumpkaboo')
  public static readonly Gourgeist = this.$implementation.of(711, 'Gourgeist')
  public static readonly Bergmite = this.$implementation.of(712, 'Bergmite')
  public static readonly Avalugg = this.$implementation.of(713, 'Avalugg')
  public static readonly Noibat = this.$implementation.of(714, 'Noibat')
  public static readonly Noivern = this.$implementation.of(715, 'Noivern')
  public static readonly Xerneas = this.$implementation.of(716, 'Xerneas')
  public static readonly Yveltal = this.$implementation.of(717, 'Yveltal')
  public static readonly Zygarde = this.$implementation.of(718, 'Zygarde')
  public static readonly Diancie = this.$implementation.of(719, 'Diancie')
  public static readonly Hoopa = this.$implementation.of(720, 'Hoopa')
  public static readonly Volcanion = this.$implementation.of(721, 'Volcanion')
  public static readonly Rowlet = this.$implementation.of(722, 'Rowlet')
  public static readonly Dartrix = this.$implementation.of(723, 'Dartrix')
  public static readonly Decidueye = this.$implementation.of(724, 'Decidueye')
  public static readonly Litten = this.$implementation.of(725, 'Litten')
  public static readonly Torracat = this.$implementation.of(726, 'Torracat')
  public static readonly Incineroar = this.$implementation.of(727, 'Incineroar')
  public static readonly Popplio = this.$implementation.of(728, 'Popplio')
  public static readonly Brionne = this.$implementation.of(729, 'Brionne')
  public static readonly Primarina = this.$implementation.of(730, 'Primarina')
  public static readonly Pikipek = this.$implementation.of(731, 'Pikipek')
  public static readonly Trumbeak = this.$implementation.of(732, 'Trumbeak')
  public static readonly Toucannon = this.$implementation.of(733, 'Toucannon')
  public static readonly Yungoos = this.$implementation.of(734, 'Yungoos')
  public static readonly Gumshoos = this.$implementation.of(735, 'Gumshoos')
  public static readonly Grubbin = this.$implementation.of(736, 'Grubbin')
  public static readonly Charjabug = this.$implementation.of(737, 'Charjabug')
  public static readonly Vikavolt = this.$implementation.of(738, 'Vikavolt')
  public static readonly Crabrawler = this.$implementation.of(739, 'Crabrawler')
  public static readonly Crabominable = this.$implementation.of(
    740,
    'Crabominable'
  )
  public static readonly Oricorio = this.$implementation.of(741, 'Oricorio')
  public static readonly Cutiefly = this.$implementation.of(742, 'Cutiefly')
  public static readonly Ribombee = this.$implementation.of(743, 'Ribombee')
  public static readonly Rockruff = this.$implementation.of(744, 'Rockruff')
  public static readonly Lycanroc = this.$implementation.of(745, 'Lycanroc')
  public static readonly Wishiwashi = this.$implementation.of(746, 'Wishiwashi')
  public static readonly Mareanie = this.$implementation.of(747, 'Mareanie')
  public static readonly Toxapex = this.$implementation.of(748, 'Toxapex')
  public static readonly Mudbray = this.$implementation.of(749, 'Mudbray')
  public static readonly Mudsdale = this.$implementation.of(750, 'Mudsdale')
  public static readonly Dewpider = this.$implementation.of(751, 'Dewpider')
  public static readonly Araquanid = this.$implementation.of(752, 'Araquanid')
  public static readonly Fomantis = this.$implementation.of(753, 'Fomantis')
  public static readonly Lurantis = this.$implementation.of(754, 'Lurantis')
  public static readonly Morelull = this.$implementation.of(755, 'Morelull')
  public static readonly Shiinotic = this.$implementation.of(756, 'Shiinotic')
  public static readonly Salandit = this.$implementation.of(757, 'Salandit')
  public static readonly Salazzle = this.$implementation.of(758, 'Salazzle')
  public static readonly Stufful = this.$implementation.of(759, 'Stufful')
  public static readonly Bewear = this.$implementation.of(760, 'Bewear')
  public static readonly Bounsweet = this.$implementation.of(761, 'Bounsweet')
  public static readonly Steenee = this.$implementation.of(762, 'Steenee')
  public static readonly Tsareena = this.$implementation.of(763, 'Tsareena')
  public static readonly Comfey = this.$implementation.of(764, 'Comfey')
  public static readonly Oranguru = this.$implementation.of(765, 'Oranguru')
  public static readonly Passimian = this.$implementation.of(766, 'Passimian')
  public static readonly Wimpod = this.$implementation.of(767, 'Wimpod')
  public static readonly Golisopod = this.$implementation.of(768, 'Golisopod')
  public static readonly Sandygast = this.$implementation.of(769, 'Sandygast')
  public static readonly Palossand = this.$implementation.of(770, 'Palossand')
  public static readonly Pyukumuku = this.$implementation.of(771, 'Pyukumuku')
  public static readonly TypeNull = this.$implementation.of(772, 'TypeNull')
  public static readonly Silvally = this.$implementation.of(773, 'Silvally')
  public static readonly Minior = this.$implementation.of(774, 'Minior')
  public static readonly Komala = this.$implementation.of(775, 'Komala')
  public static readonly Turtonator = this.$implementation.of(776, 'Turtonator')
  public static readonly Togedemaru = this.$implementation.of(777, 'Togedemaru')
  public static readonly Mimikyu = this.$implementation.of(778, 'Mimikyu')
  public static readonly Bruxish = this.$implementation.of(779, 'Bruxish')
  public static readonly Drampa = this.$implementation.of(780, 'Drampa')
  public static readonly Dhelmise = this.$implementation.of(781, 'Dhelmise')
  public static readonly Jangmoo = this.$implementation.of(782, 'Jangmo-o')
  public static readonly Hakamoo = this.$implementation.of(783, 'Hakamo-o')
  public static readonly Kommoo = this.$implementation.of(784, 'Kommo-o')
  public static readonly TapuKoko = this.$implementation.of(785, 'TapuKoko')
  public static readonly TapuLele = this.$implementation.of(786, 'TapuLele')
  public static readonly TapuBulu = this.$implementation.of(787, 'TapuBulu')
  public static readonly TapuFini = this.$implementation.of(788, 'TapuFini')
  public static readonly Cosmog = this.$implementation.of(789, 'Cosmog')
  public static readonly Cosmoem = this.$implementation.of(790, 'Cosmoem')
  public static readonly Solgaleo = this.$implementation.of(791, 'Solgaleo')
  public static readonly Lunala = this.$implementation.of(792, 'Lunala')
  public static readonly Nihilego = this.$implementation.of(793, 'Nihilego')
  public static readonly Buzzwole = this.$implementation.of(794, 'Buzzwole')
  public static readonly Pheromosa = this.$implementation.of(795, 'Pheromosa')
  public static readonly Xurkitree = this.$implementation.of(796, 'Xurkitree')
  public static readonly Celesteela = this.$implementation.of(797, 'Celesteela')
  public static readonly Kartana = this.$implementation.of(798, 'Kartana')
  public static readonly Guzzlord = this.$implementation.of(799, 'Guzzlord')
  public static readonly Necrozma = this.$implementation.of(800, 'Necrozma')
  public static readonly Magearna = this.$implementation.of(801, 'Magearna')
  public static readonly Marshadow = this.$implementation.of(802, 'Marshadow')
  public static readonly Poipole = this.$implementation.of(803, 'Poipole')
  public static readonly Naganadel = this.$implementation.of(804, 'Naganadel')
  public static readonly Stakataka = this.$implementation.of(805, 'Stakataka')
  public static readonly Blacephalon = this.$implementation.of(
    806,
    'Blacephalon'
  )
  public static readonly Zeraora = this.$implementation.of(807, 'Zeraora')
  public static readonly Meltan = this.$implementation.of(808, 'Meltan')
  public static readonly Melmetal = this.$implementation.of(809, 'Melmetal')
  public static readonly Grookey = this.$implementation.of(810, 'Grookey')
  public static readonly Thwackey = this.$implementation.of(811, 'Thwackey')
  public static readonly Rillaboom = this.$implementation.of(812, 'Rillaboom')
  public static readonly Scorbunny = this.$implementation.of(813, 'Scorbunny')
  public static readonly Raboot = this.$implementation.of(814, 'Raboot')
  public static readonly Cinderace = this.$implementation.of(815, 'Cinderace')
  public static readonly Sobble = this.$implementation.of(816, 'Sobble')
  public static readonly Drizzile = this.$implementation.of(817, 'Drizzile')
  public static readonly Inteleon = this.$implementation.of(818, 'Inteleon')
  public static readonly Skwovet = this.$implementation.of(819, 'Skwovet')
  public static readonly Greedent = this.$implementation.of(820, 'Greedent')
  public static readonly Rookidee = this.$implementation.of(821, 'Rookidee')
  public static readonly Corvisquire = this.$implementation.of(
    822,
    'Corvisquire'
  )
  public static readonly Corviknight = this.$implementation.of(
    823,
    'Corviknight'
  )
  public static readonly Blipbug = this.$implementation.of(824, 'Blipbug')
  public static readonly Dottler = this.$implementation.of(825, 'Dottler')
  public static readonly Orbeetle = this.$implementation.of(826, 'Orbeetle')
  public static readonly Nickit = this.$implementation.of(827, 'Nickit')
  public static readonly Thievul = this.$implementation.of(828, 'Thievul')
  public static readonly Gossifleur = this.$implementation.of(829, 'Gossifleur')
  public static readonly Eldegoss = this.$implementation.of(830, 'Eldegoss')
  public static readonly Wooloo = this.$implementation.of(831, 'Wooloo')
  public static readonly Dubwool = this.$implementation.of(832, 'Dubwool')
  public static readonly Chewtle = this.$implementation.of(833, 'Chewtle')
  public static readonly Drednaw = this.$implementation.of(834, 'Drednaw')
  public static readonly Yamper = this.$implementation.of(835, 'Yamper')
  public static readonly Boltund = this.$implementation.of(836, 'Boltund')
  public static readonly Rolycoly = this.$implementation.of(837, 'Rolycoly')
  public static readonly Carkol = this.$implementation.of(838, 'Carkol')
  public static readonly Coalossal = this.$implementation.of(839, 'Coalossal')
  public static readonly Applin = this.$implementation.of(840, 'Applin')
  public static readonly Flapple = this.$implementation.of(841, 'Flapple')
  public static readonly Appletun = this.$implementation.of(842, 'Appletun')
  public static readonly Silicobra = this.$implementation.of(843, 'Silicobra')
  public static readonly Sandaconda = this.$implementation.of(844, 'Sandaconda')
  public static readonly Cramorant = this.$implementation.of(845, 'Cramorant')
  public static readonly Arrokuda = this.$implementation.of(846, 'Arrokuda')
  public static readonly Barraskewda = this.$implementation.of(
    847,
    'Barraskewda'
  )
  public static readonly Toxel = this.$implementation.of(848, 'Toxel')
  public static readonly Toxtricity = this.$implementation.of(849, 'Toxtricity')
  public static readonly Sizzlipede = this.$implementation.of(850, 'Sizzlipede')
  public static readonly Centiskorch = this.$implementation.of(
    851,
    'Centiskorch'
  )
  public static readonly Clobbopus = this.$implementation.of(852, 'Clobbopus')
  public static readonly Grapploct = this.$implementation.of(853, 'Grapploct')
  public static readonly Sinistea = this.$implementation.of(854, 'Sinistea')
  public static readonly Polteageist = this.$implementation.of(
    855,
    'Polteageist'
  )
  public static readonly Hatenna = this.$implementation.of(856, 'Hatenna')
  public static readonly Hattrem = this.$implementation.of(857, 'Hattrem')
  public static readonly Hatterene = this.$implementation.of(858, 'Hatterene')
  public static readonly Impidimp = this.$implementation.of(859, 'Impidimp')
  public static readonly Morgrem = this.$implementation.of(860, 'Morgrem')
  public static readonly Grimmsnarl = this.$implementation.of(861, 'Grimmsnarl')
  public static readonly Obstagoon = this.$implementation.of(862, 'Obstagoon')
  public static readonly Perrserker = this.$implementation.of(863, 'Perrserker')
  public static readonly Cursola = this.$implementation.of(864, 'Cursola')
  public static readonly Sirfetchd = this.$implementation.of(865, 'Sirfetchd')
  public static readonly MrRime = this.$implementation.of(866, 'MrRime')
  public static readonly Runerigus = this.$implementation.of(867, 'Runerigus')
  public static readonly Milcery = this.$implementation.of(868, 'Milcery')
  public static readonly Alcremie = this.$implementation.of(869, 'Alcremie')
  public static readonly Falinks = this.$implementation.of(870, 'Falinks')
  public static readonly Pincurchin = this.$implementation.of(871, 'Pincurchin')
  public static readonly Snom = this.$implementation.of(872, 'Snom')
  public static readonly Frosmoth = this.$implementation.of(873, 'Frosmoth')
  public static readonly Stonjourner = this.$implementation.of(
    874,
    'Stonjourner'
  )
  public static readonly Eiscue = this.$implementation.of(875, 'Eiscue')
  public static readonly Indeedee = this.$implementation.of(876, 'Indeedee')
  public static readonly Morpeko = this.$implementation.of(877, 'Morpeko')
  public static readonly Cufant = this.$implementation.of(878, 'Cufant')
  public static readonly Copperajah = this.$implementation.of(879, 'Copperajah')
  public static readonly Dracozolt = this.$implementation.of(880, 'Dracozolt')
  public static readonly Arctozolt = this.$implementation.of(881, 'Arctozolt')
  public static readonly Dracovish = this.$implementation.of(882, 'Dracovish')
  public static readonly Arctovish = this.$implementation.of(883, 'Arctovish')
  public static readonly Duraludon = this.$implementation.of(884, 'Duraludon')
  public static readonly Dreepy = this.$implementation.of(885, 'Dreepy')
  public static readonly Drakloak = this.$implementation.of(886, 'Drakloak')
  public static readonly Dragapult = this.$implementation.of(887, 'Dragapult')
  public static readonly Zacian = this.$implementation.of(888, 'Zacian')
  public static readonly Zamazenta = this.$implementation.of(889, 'Zamazenta')
  public static readonly Eternatus = this.$implementation.of(890, 'Eternatus')
  public static readonly Kubfu = this.$implementation.of(891, 'Kubfu')
  public static readonly Urshifu = this.$implementation.of(892, 'Urshifu')
  public static readonly Zarude = this.$implementation.of(893, 'Zarude')
  public static readonly Regieleki = this.$implementation.of(894, 'Regieleki')
  public static readonly Regidrago = this.$implementation.of(895, 'Regidrago')
  public static readonly Glastrier = this.$implementation.of(896, 'Glastrier')
  public static readonly Spectrier = this.$implementation.of(897, 'Spectrier')
  public static readonly Calyrex = this.$implementation.of(898, 'Calyrex')
  public static readonly Wyrdeer = this.$implementation.of(899, 'Wyrdeer')
  /* eslint-enable @typescript-eslint/member-ordering */

  /**
   * Gets the immutable set of species that are considered legendary.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered legendary
   */
  public static getLegendaries(): ReadonlySet<Species> {
    return new Set(Species.$implementation.legendaries)
  }

  /**
   * Gets the immutable set of species that are considered ultrabeasts.
   *
   * @returns {ReadonlySet<Species>} The immutable set of species that are considered ultrabeast
   */
  public static getUltrabeasts(): ReadonlySet<Species> {
    return new Set(Species.$implementation.ultrabeasts)
  }

  /**
   * Gets the readonly set of all the pokemon species.
   *
   * @returns {ReadonlySet<Species>} The readonly set of all the pokemon species
   */
  public static getAllPokemons(): ReadonlySet<Species> {
    return new Set(Species.$implementation.allPokemons)
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
    for (const pokemon of Species.$implementation.allPokemons) {
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
    for (const species of Species.$implementation.allPokemons) {
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
      Species.$implementation.legendaries.add,
      Species.$implementation.legendaries
    )
    ultrabests.forEach(
      Species.$implementation.ultrabeasts.add,
      Species.$implementation.ultrabeasts
    )
  }
}
