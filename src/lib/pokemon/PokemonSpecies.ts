import type { Stat } from "@internal/pixelmon";
import { container } from "@sapphire/pieces";
import { Option } from "@sapphire/result";
import { type Nullish, isNullish, isNullishOrEmpty } from "@sapphire/utilities";

import { BasePokemonSpecies } from "#lib/pokemon/BasePokemonSpecies.js";
import { Species } from "#lib/pokemon/Species.js";

const REGISTERED_POKEMON = new Set<PokemonSpecies>();

type WellKnownTag = "legendary" | "mythical" | "ultrabeast";

export class PokemonSpecies<
  Tag extends WellKnownTag = WellKnownTag,
> extends BasePokemonSpecies {
  public static readonly [Species.MissingNo]: PokemonSpecies;

  // Generation I Pokémon species. (1-151)
  public static readonly [Species.Bulbasaur]: PokemonSpecies;

  public static readonly [Species.Ivysaur]: PokemonSpecies;

  public static readonly [Species.Venusaur]: PokemonSpecies;

  // public static readonly [PokemonEnum.Venusaurmega]: PokemonSpecies
  // public static readonly [PokemonEnum.Venusaurgmax]: PokemonSpecies
  public static readonly [Species.Venusaur]: PokemonSpecies;

  public static readonly [Species.Charmander]: PokemonSpecies;

  public static readonly [Species.Charmeleon]: PokemonSpecies;

  public static readonly [Species.Charizard]: PokemonSpecies;

  public static readonly [Species.Squirtle]: PokemonSpecies;

  public static readonly [Species.Wartortle]: PokemonSpecies;

  public static readonly [Species.Blastoise]: PokemonSpecies;

  public static readonly [Species.Caterpie]: PokemonSpecies;

  public static readonly [Species.Metapod]: PokemonSpecies;

  public static readonly [Species.Butterfree]: PokemonSpecies;

  public static readonly [Species.Weedle]: PokemonSpecies;

  public static readonly [Species.Kakuna]: PokemonSpecies;

  public static readonly [Species.Beedrill]: PokemonSpecies;

  public static readonly [Species.Pidgey]: PokemonSpecies;

  public static readonly [Species.Pidgeotto]: PokemonSpecies;

  public static readonly [Species.Pidgeot]: PokemonSpecies;

  public static readonly [Species.Rattata]: PokemonSpecies;

  public static readonly [Species.Raticate]: PokemonSpecies;

  public static readonly [Species.Spearow]: PokemonSpecies;

  public static readonly [Species.Fearow]: PokemonSpecies;

  public static readonly [Species.Ekans]: PokemonSpecies;

  public static readonly [Species.Arbok]: PokemonSpecies;

  public static readonly [Species.Pikachu]: PokemonSpecies;

  public static readonly [Species.Raichu]: PokemonSpecies;

  public static readonly [Species.Sandshrew]: PokemonSpecies;

  public static readonly [Species.Sandslash]: PokemonSpecies;

  public static readonly [Species.Nidoranfemale]: PokemonSpecies;

  public static readonly [Species.Nidorina]: PokemonSpecies;

  public static readonly [Species.Nidoqueen]: PokemonSpecies;

  public static readonly [Species.Nidoranmale]: PokemonSpecies;

  public static readonly [Species.Nidorino]: PokemonSpecies;

  public static readonly [Species.Nidoking]: PokemonSpecies;

  public static readonly [Species.Clefairy]: PokemonSpecies;

  public static readonly [Species.Clefable]: PokemonSpecies;

  public static readonly [Species.Vulpix]: PokemonSpecies;

  public static readonly [Species.Ninetales]: PokemonSpecies;

  public static readonly [Species.Jigglypuff]: PokemonSpecies;

  public static readonly [Species.Wigglytuff]: PokemonSpecies;

  public static readonly [Species.Zubat]: PokemonSpecies;

  public static readonly [Species.Golbat]: PokemonSpecies;

  public static readonly [Species.Oddish]: PokemonSpecies;

  public static readonly [Species.Gloom]: PokemonSpecies;

  public static readonly [Species.Vileplume]: PokemonSpecies;

  public static readonly [Species.Paras]: PokemonSpecies;

  public static readonly [Species.Parasect]: PokemonSpecies;

  public static readonly [Species.Venonat]: PokemonSpecies;

  public static readonly [Species.Venomoth]: PokemonSpecies;

  public static readonly [Species.Diglett]: PokemonSpecies;

  public static readonly [Species.Dugtrio]: PokemonSpecies;

  public static readonly [Species.Meowth]: PokemonSpecies;

  public static readonly [Species.Persian]: PokemonSpecies;

  public static readonly [Species.Psyduck]: PokemonSpecies;

  public static readonly [Species.Golduck]: PokemonSpecies;

  public static readonly [Species.Mankey]: PokemonSpecies;

  public static readonly [Species.Primeape]: PokemonSpecies;

  public static readonly [Species.Growlithe]: PokemonSpecies;

  public static readonly [Species.Arcanine]: PokemonSpecies;

  public static readonly [Species.Poliwag]: PokemonSpecies;

  public static readonly [Species.Poliwhirl]: PokemonSpecies;

  public static readonly [Species.Poliwrath]: PokemonSpecies;

  public static readonly [Species.Abra]: PokemonSpecies;

  public static readonly [Species.Kadabra]: PokemonSpecies;

  public static readonly [Species.Alakazam]: PokemonSpecies;

  public static readonly [Species.Machop]: PokemonSpecies;

  public static readonly [Species.Machoke]: PokemonSpecies;

  public static readonly [Species.Machamp]: PokemonSpecies;

  public static readonly [Species.Bellsprout]: PokemonSpecies;

  public static readonly [Species.Weepinbell]: PokemonSpecies;

  public static readonly [Species.Victreebel]: PokemonSpecies;

  public static readonly [Species.Tentacool]: PokemonSpecies;

  public static readonly [Species.Tentacruel]: PokemonSpecies;

  public static readonly [Species.Geodude]: PokemonSpecies;

  public static readonly [Species.Graveler]: PokemonSpecies;

  public static readonly [Species.Golem]: PokemonSpecies;

  public static readonly [Species.Ponyta]: PokemonSpecies;

  public static readonly [Species.Rapidash]: PokemonSpecies;

  public static readonly [Species.Slowpoke]: PokemonSpecies;

  public static readonly [Species.Slowbro]: PokemonSpecies;

  public static readonly [Species.Magnemite]: PokemonSpecies;

  public static readonly [Species.Magneton]: PokemonSpecies;

  public static readonly [Species.Farfetchd]: PokemonSpecies;

  public static readonly [Species.Doduo]: PokemonSpecies;

  public static readonly [Species.Dodrio]: PokemonSpecies;

  public static readonly [Species.Seel]: PokemonSpecies;

  public static readonly [Species.Dewgong]: PokemonSpecies;

  public static readonly [Species.Grimer]: PokemonSpecies;

  public static readonly [Species.Muk]: PokemonSpecies;

  public static readonly [Species.Shellder]: PokemonSpecies;

  public static readonly [Species.Cloyster]: PokemonSpecies;

  public static readonly [Species.Gastly]: PokemonSpecies;

  public static readonly [Species.Haunter]: PokemonSpecies;

  public static readonly [Species.Gengar]: PokemonSpecies;

  public static readonly [Species.Onix]: PokemonSpecies;

  public static readonly [Species.Drowzee]: PokemonSpecies;

  public static readonly [Species.Hypno]: PokemonSpecies;

  public static readonly [Species.Krabby]: PokemonSpecies;

  public static readonly [Species.Kingler]: PokemonSpecies;

  public static readonly [Species.Voltorb]: PokemonSpecies;

  public static readonly [Species.Electrode]: PokemonSpecies;

  public static readonly [Species.Exeggcute]: PokemonSpecies;

  public static readonly [Species.Exeggutor]: PokemonSpecies;

  public static readonly [Species.Cubone]: PokemonSpecies;

  public static readonly [Species.Marowak]: PokemonSpecies;

  public static readonly [Species.Hitmonlee]: PokemonSpecies;

  public static readonly [Species.Hitmonchan]: PokemonSpecies;

  public static readonly [Species.Lickitung]: PokemonSpecies;

  public static readonly [Species.Koffing]: PokemonSpecies;

  public static readonly [Species.Weezing]: PokemonSpecies;

  public static readonly [Species.Rhyhorn]: PokemonSpecies;

  public static readonly [Species.Rhydon]: PokemonSpecies;

  public static readonly [Species.Chansey]: PokemonSpecies;

  public static readonly [Species.Tangela]: PokemonSpecies;

  public static readonly [Species.Kangaskhan]: PokemonSpecies;

  public static readonly [Species.Horsea]: PokemonSpecies;

  public static readonly [Species.Seadra]: PokemonSpecies;

  public static readonly [Species.Goldeen]: PokemonSpecies;

  public static readonly [Species.Seaking]: PokemonSpecies;

  public static readonly [Species.Staryu]: PokemonSpecies;

  public static readonly [Species.Starmie]: PokemonSpecies;

  public static readonly [Species.MrMime]: PokemonSpecies;

  public static readonly [Species.Scyther]: PokemonSpecies;

  public static readonly [Species.Jynx]: PokemonSpecies;

  public static readonly [Species.Electabuzz]: PokemonSpecies;

  public static readonly [Species.Magmar]: PokemonSpecies;

  public static readonly [Species.Pinsir]: PokemonSpecies;

  public static readonly [Species.Tauros]: PokemonSpecies;

  public static readonly [Species.Magikarp]: PokemonSpecies;

  public static readonly [Species.Gyarados]: PokemonSpecies;

  public static readonly [Species.Lapras]: PokemonSpecies;

  public static readonly [Species.Ditto]: PokemonSpecies;

  public static readonly [Species.Eevee]: PokemonSpecies;

  public static readonly [Species.Vaporeon]: PokemonSpecies;

  public static readonly [Species.Jolteon]: PokemonSpecies;

  public static readonly [Species.Flareon]: PokemonSpecies;

  public static readonly [Species.Porygon]: PokemonSpecies;

  public static readonly [Species.Omanyte]: PokemonSpecies;

  public static readonly [Species.Omastar]: PokemonSpecies;

  public static readonly [Species.Kabuto]: PokemonSpecies;

  public static readonly [Species.Kabutops]: PokemonSpecies;

  public static readonly [Species.Aerodactyl]: PokemonSpecies;

  public static readonly [Species.Snorlax]: PokemonSpecies;

  public static readonly [Species.Articuno]: PokemonSpecies;

  public static readonly [Species.Zapdos]: PokemonSpecies;

  public static readonly [Species.Moltres]: PokemonSpecies;

  public static readonly [Species.Dratini]: PokemonSpecies;

  public static readonly [Species.Dragonair]: PokemonSpecies;

  public static readonly [Species.Dragonite]: PokemonSpecies;

  public static readonly [Species.Mewtwo]: PokemonSpecies;

  public static readonly [Species.Mew]: PokemonSpecies;

  // Generation II Pokémon species. (152-251)
  public static readonly [Species.Chikorita]: PokemonSpecies;

  public static readonly [Species.Bayleef]: PokemonSpecies;

  public static readonly [Species.Meganium]: PokemonSpecies;

  public static readonly [Species.Cyndaquil]: PokemonSpecies;

  public static readonly [Species.Quilava]: PokemonSpecies;

  public static readonly [Species.Typhlosion]: PokemonSpecies;

  public static readonly [Species.Totodile]: PokemonSpecies;

  public static readonly [Species.Croconaw]: PokemonSpecies;

  public static readonly [Species.Feraligatr]: PokemonSpecies;

  public static readonly [Species.Sentret]: PokemonSpecies;

  public static readonly [Species.Furret]: PokemonSpecies;

  public static readonly [Species.Hoothoot]: PokemonSpecies;

  public static readonly [Species.Noctowl]: PokemonSpecies;

  public static readonly [Species.Ledyba]: PokemonSpecies;

  public static readonly [Species.Ledian]: PokemonSpecies;

  public static readonly [Species.Spinarak]: PokemonSpecies;

  public static readonly [Species.Ariados]: PokemonSpecies;

  public static readonly [Species.Crobat]: PokemonSpecies;

  public static readonly [Species.Chinchou]: PokemonSpecies;

  public static readonly [Species.Lanturn]: PokemonSpecies;

  public static readonly [Species.Pichu]: PokemonSpecies;

  public static readonly [Species.Cleffa]: PokemonSpecies;

  public static readonly [Species.Igglybuff]: PokemonSpecies;

  public static readonly [Species.Togepi]: PokemonSpecies;

  public static readonly [Species.Togetic]: PokemonSpecies;

  public static readonly [Species.Natu]: PokemonSpecies;

  public static readonly [Species.Xatu]: PokemonSpecies;

  public static readonly [Species.Mareep]: PokemonSpecies;

  public static readonly [Species.Flaaffy]: PokemonSpecies;

  public static readonly [Species.Ampharos]: PokemonSpecies;

  public static readonly [Species.Bellossom]: PokemonSpecies;

  public static readonly [Species.Marill]: PokemonSpecies;

  public static readonly [Species.Azumarill]: PokemonSpecies;

  public static readonly [Species.Sudowoodo]: PokemonSpecies;

  public static readonly [Species.Politoed]: PokemonSpecies;

  public static readonly [Species.Hoppip]: PokemonSpecies;

  public static readonly [Species.Skiploom]: PokemonSpecies;

  public static readonly [Species.Jumpluff]: PokemonSpecies;

  public static readonly [Species.Aipom]: PokemonSpecies;

  public static readonly [Species.Sunkern]: PokemonSpecies;

  public static readonly [Species.Sunflora]: PokemonSpecies;

  public static readonly [Species.Yanma]: PokemonSpecies;

  public static readonly [Species.Wooper]: PokemonSpecies;

  public static readonly [Species.Quagsire]: PokemonSpecies;

  public static readonly [Species.Espeon]: PokemonSpecies;

  public static readonly [Species.Umbreon]: PokemonSpecies;

  public static readonly [Species.Murkrow]: PokemonSpecies;

  public static readonly [Species.Slowking]: PokemonSpecies;

  public static readonly [Species.Misdreavus]: PokemonSpecies;

  public static readonly [Species.Unown]: PokemonSpecies;

  public static readonly [Species.Wobbuffet]: PokemonSpecies;

  public static readonly [Species.Girafarig]: PokemonSpecies;

  public static readonly [Species.Pineco]: PokemonSpecies;

  public static readonly [Species.Forretress]: PokemonSpecies;

  public static readonly [Species.Dunsparce]: PokemonSpecies;

  public static readonly [Species.Gligar]: PokemonSpecies;

  public static readonly [Species.Steelix]: PokemonSpecies;

  public static readonly [Species.Snubbull]: PokemonSpecies;

  public static readonly [Species.Granbull]: PokemonSpecies;

  public static readonly [Species.Qwilfish]: PokemonSpecies;

  public static readonly [Species.Scizor]: PokemonSpecies;

  public static readonly [Species.Shuckle]: PokemonSpecies;

  public static readonly [Species.Heracross]: PokemonSpecies;

  public static readonly [Species.Sneasel]: PokemonSpecies;

  public static readonly [Species.Teddiursa]: PokemonSpecies;

  public static readonly [Species.Ursaring]: PokemonSpecies;

  public static readonly [Species.Slugma]: PokemonSpecies;

  public static readonly [Species.Magcargo]: PokemonSpecies;

  public static readonly [Species.Swinub]: PokemonSpecies;

  public static readonly [Species.Piloswine]: PokemonSpecies;

  public static readonly [Species.Corsola]: PokemonSpecies;

  public static readonly [Species.Remoraid]: PokemonSpecies;

  public static readonly [Species.Octillery]: PokemonSpecies;

  public static readonly [Species.Delibird]: PokemonSpecies;

  public static readonly [Species.Mantine]: PokemonSpecies;

  public static readonly [Species.Skarmory]: PokemonSpecies;

  public static readonly [Species.Houndour]: PokemonSpecies;

  public static readonly [Species.Houndoom]: PokemonSpecies;

  public static readonly [Species.Kingdra]: PokemonSpecies;

  public static readonly [Species.Phanpy]: PokemonSpecies;

  public static readonly [Species.Donphan]: PokemonSpecies;

  public static readonly [Species.Porygon2]: PokemonSpecies;

  public static readonly [Species.Stantler]: PokemonSpecies;

  public static readonly [Species.Smeargle]: PokemonSpecies;

  public static readonly [Species.Tyrogue]: PokemonSpecies;

  public static readonly [Species.Hitmontop]: PokemonSpecies;

  public static readonly [Species.Smoochum]: PokemonSpecies;

  public static readonly [Species.Elekid]: PokemonSpecies;

  public static readonly [Species.Magby]: PokemonSpecies;

  public static readonly [Species.Miltank]: PokemonSpecies;

  public static readonly [Species.Blissey]: PokemonSpecies;

  public static readonly [Species.Raikou]: PokemonSpecies;

  public static readonly [Species.Entei]: PokemonSpecies;

  public static readonly [Species.Suicune]: PokemonSpecies;

  public static readonly [Species.Larvitar]: PokemonSpecies;

  public static readonly [Species.Pupitar]: PokemonSpecies;

  public static readonly [Species.Tyranitar]: PokemonSpecies;

  public static readonly [Species.Lugia]: PokemonSpecies;

  public static readonly [Species.Hooh]: PokemonSpecies;

  public static readonly [Species.Celebi]: PokemonSpecies;

  //* Generation III Pokémon species. (252-386)
  public static readonly [Species.Treecko]: PokemonSpecies;

  public static readonly [Species.Grovyle]: PokemonSpecies;

  public static readonly [Species.Sceptile]: PokemonSpecies;

  public static readonly [Species.Torchic]: PokemonSpecies;

  public static readonly [Species.Combusken]: PokemonSpecies;

  public static readonly [Species.Blaziken]: PokemonSpecies;

  public static readonly [Species.Mudkip]: PokemonSpecies;

  public static readonly [Species.Marshtomp]: PokemonSpecies;

  public static readonly [Species.Swampert]: PokemonSpecies;

  public static readonly [Species.Poochyena]: PokemonSpecies;

  public static readonly [Species.Mightyena]: PokemonSpecies;

  public static readonly [Species.Zigzagoon]: PokemonSpecies;

  public static readonly [Species.Linoone]: PokemonSpecies;

  public static readonly [Species.Wurmple]: PokemonSpecies;

  public static readonly [Species.Silcoon]: PokemonSpecies;

  public static readonly [Species.Beautifly]: PokemonSpecies;

  public static readonly [Species.Cascoon]: PokemonSpecies;

  public static readonly [Species.Dustox]: PokemonSpecies;

  public static readonly [Species.Lotad]: PokemonSpecies;

  public static readonly [Species.Lombre]: PokemonSpecies;

  public static readonly [Species.Ludicolo]: PokemonSpecies;

  public static readonly [Species.Seedot]: PokemonSpecies;

  public static readonly [Species.Nuzleaf]: PokemonSpecies;

  public static readonly [Species.Shiftry]: PokemonSpecies;

  public static readonly [Species.Taillow]: PokemonSpecies;

  public static readonly [Species.Swellow]: PokemonSpecies;

  public static readonly [Species.Wingull]: PokemonSpecies;

  public static readonly [Species.Pelipper]: PokemonSpecies;

  public static readonly [Species.Ralts]: PokemonSpecies;

  public static readonly [Species.Kirlia]: PokemonSpecies;

  public static readonly [Species.Gardevoir]: PokemonSpecies;

  public static readonly [Species.Surskit]: PokemonSpecies;

  public static readonly [Species.Masquerain]: PokemonSpecies;

  public static readonly [Species.Shroomish]: PokemonSpecies;

  public static readonly [Species.Breloom]: PokemonSpecies;

  public static readonly [Species.Slakoth]: PokemonSpecies;

  public static readonly [Species.Vigoroth]: PokemonSpecies;

  public static readonly [Species.Slaking]: PokemonSpecies;

  public static readonly [Species.Nincada]: PokemonSpecies;

  public static readonly [Species.Ninjask]: PokemonSpecies;

  public static readonly [Species.Shedinja]: PokemonSpecies;

  public static readonly [Species.Whismur]: PokemonSpecies;

  public static readonly [Species.Loudred]: PokemonSpecies;

  public static readonly [Species.Exploud]: PokemonSpecies;

  public static readonly [Species.Makuhita]: PokemonSpecies;

  public static readonly [Species.Hariyama]: PokemonSpecies;

  public static readonly [Species.Azurill]: PokemonSpecies;

  public static readonly [Species.Nosepass]: PokemonSpecies;

  public static readonly [Species.Skitty]: PokemonSpecies;

  public static readonly [Species.Delcatty]: PokemonSpecies;

  public static readonly [Species.Sableye]: PokemonSpecies;

  public static readonly [Species.Mawile]: PokemonSpecies;

  public static readonly [Species.Aron]: PokemonSpecies;

  public static readonly [Species.Lairon]: PokemonSpecies;

  public static readonly [Species.Aggron]: PokemonSpecies;

  public static readonly [Species.Meditite]: PokemonSpecies;

  public static readonly [Species.Medicham]: PokemonSpecies;

  public static readonly [Species.Electrike]: PokemonSpecies;

  public static readonly [Species.Manectric]: PokemonSpecies;

  public static readonly [Species.Plusle]: PokemonSpecies;

  public static readonly [Species.Minun]: PokemonSpecies;

  public static readonly [Species.Volbeat]: PokemonSpecies;

  public static readonly [Species.Illumise]: PokemonSpecies;

  public static readonly [Species.Roselia]: PokemonSpecies;

  public static readonly [Species.Gulpin]: PokemonSpecies;

  public static readonly [Species.Swalot]: PokemonSpecies;

  public static readonly [Species.Carvanha]: PokemonSpecies;

  public static readonly [Species.Sharpedo]: PokemonSpecies;

  public static readonly [Species.Wailmer]: PokemonSpecies;

  public static readonly [Species.Wailord]: PokemonSpecies;

  public static readonly [Species.Numel]: PokemonSpecies;

  public static readonly [Species.Camerupt]: PokemonSpecies;

  public static readonly [Species.Torkoal]: PokemonSpecies;

  public static readonly [Species.Spoink]: PokemonSpecies;

  public static readonly [Species.Grumpig]: PokemonSpecies;

  public static readonly [Species.Spinda]: PokemonSpecies;

  public static readonly [Species.Trapinch]: PokemonSpecies;

  public static readonly [Species.Vibrava]: PokemonSpecies;

  public static readonly [Species.Flygon]: PokemonSpecies;

  public static readonly [Species.Cacnea]: PokemonSpecies;

  public static readonly [Species.Cacturne]: PokemonSpecies;

  public static readonly [Species.Swablu]: PokemonSpecies;

  public static readonly [Species.Altaria]: PokemonSpecies;

  public static readonly [Species.Zangoose]: PokemonSpecies;

  public static readonly [Species.Seviper]: PokemonSpecies;

  public static readonly [Species.Lunatone]: PokemonSpecies;

  public static readonly [Species.Solrock]: PokemonSpecies;

  public static readonly [Species.Barboach]: PokemonSpecies;

  public static readonly [Species.Whiscash]: PokemonSpecies;

  public static readonly [Species.Corphish]: PokemonSpecies;

  public static readonly [Species.Crawdaunt]: PokemonSpecies;

  public static readonly [Species.Baltoy]: PokemonSpecies;

  public static readonly [Species.Claydol]: PokemonSpecies;

  public static readonly [Species.Lileep]: PokemonSpecies;

  public static readonly [Species.Cradily]: PokemonSpecies;

  public static readonly [Species.Anorith]: PokemonSpecies;

  public static readonly [Species.Armaldo]: PokemonSpecies;

  public static readonly [Species.Feebas]: PokemonSpecies;

  public static readonly [Species.Milotic]: PokemonSpecies;

  public static readonly [Species.Castform]: PokemonSpecies;

  public static readonly [Species.Kecleon]: PokemonSpecies;

  public static readonly [Species.Shuppet]: PokemonSpecies;

  public static readonly [Species.Banette]: PokemonSpecies;

  public static readonly [Species.Duskull]: PokemonSpecies;

  public static readonly [Species.Dusclops]: PokemonSpecies;

  public static readonly [Species.Tropius]: PokemonSpecies;

  public static readonly [Species.Chimecho]: PokemonSpecies;

  public static readonly [Species.Absol]: PokemonSpecies;

  public static readonly [Species.Wynaut]: PokemonSpecies;

  public static readonly [Species.Snorunt]: PokemonSpecies;

  public static readonly [Species.Glalie]: PokemonSpecies;

  public static readonly [Species.Spheal]: PokemonSpecies;

  public static readonly [Species.Sealeo]: PokemonSpecies;

  public static readonly [Species.Walrein]: PokemonSpecies;

  public static readonly [Species.Clamperl]: PokemonSpecies;

  public static readonly [Species.Huntail]: PokemonSpecies;

  public static readonly [Species.Gorebyss]: PokemonSpecies;

  public static readonly [Species.Relicanth]: PokemonSpecies;

  public static readonly [Species.Luvdisc]: PokemonSpecies;

  public static readonly [Species.Bagon]: PokemonSpecies;

  public static readonly [Species.Shelgon]: PokemonSpecies;

  public static readonly [Species.Salamence]: PokemonSpecies;

  public static readonly [Species.Beldum]: PokemonSpecies;

  public static readonly [Species.Metang]: PokemonSpecies;

  public static readonly [Species.Metagross]: PokemonSpecies;

  public static readonly [Species.Regirock]: PokemonSpecies;

  public static readonly [Species.Regice]: PokemonSpecies;

  public static readonly [Species.Registeel]: PokemonSpecies;

  public static readonly [Species.Latias]: PokemonSpecies;

  public static readonly [Species.Latios]: PokemonSpecies;

  public static readonly [Species.Kyogre]: PokemonSpecies;

  public static readonly [Species.Groudon]: PokemonSpecies;

  public static readonly [Species.Rayquaza]: PokemonSpecies;

  public static readonly [Species.Jirachi]: PokemonSpecies;

  public static readonly [Species.Deoxys]: PokemonSpecies;

  // Generation IV Pokémon species. (387-493)
  public static readonly [Species.Turtwig]: PokemonSpecies;

  public static readonly [Species.Grotle]: PokemonSpecies;

  public static readonly [Species.Torterra]: PokemonSpecies;

  public static readonly [Species.Chimchar]: PokemonSpecies;

  public static readonly [Species.Monferno]: PokemonSpecies;

  public static readonly [Species.Infernape]: PokemonSpecies;

  public static readonly [Species.Piplup]: PokemonSpecies;

  public static readonly [Species.Prinplup]: PokemonSpecies;

  public static readonly [Species.Empoleon]: PokemonSpecies;

  public static readonly [Species.Starly]: PokemonSpecies;

  public static readonly [Species.Staravia]: PokemonSpecies;

  public static readonly [Species.Staraptor]: PokemonSpecies;

  public static readonly [Species.Bidoof]: PokemonSpecies;

  public static readonly [Species.Bibarel]: PokemonSpecies;

  public static readonly [Species.Kricketot]: PokemonSpecies;

  public static readonly [Species.Kricketune]: PokemonSpecies;

  public static readonly [Species.Shinx]: PokemonSpecies;

  public static readonly [Species.Luxio]: PokemonSpecies;

  public static readonly [Species.Luxray]: PokemonSpecies;

  public static readonly [Species.Budew]: PokemonSpecies;

  public static readonly [Species.Roserade]: PokemonSpecies;

  public static readonly [Species.Cranidos]: PokemonSpecies;

  public static readonly [Species.Rampardos]: PokemonSpecies;

  public static readonly [Species.Shieldon]: PokemonSpecies;

  public static readonly [Species.Bastiodon]: PokemonSpecies;

  public static readonly [Species.Burmy]: PokemonSpecies;

  public static readonly [Species.Wormadam]: PokemonSpecies;

  public static readonly [Species.Mothim]: PokemonSpecies;

  public static readonly [Species.Combee]: PokemonSpecies;

  public static readonly [Species.Vespiquen]: PokemonSpecies;

  public static readonly [Species.Pachirisu]: PokemonSpecies;

  public static readonly [Species.Buizel]: PokemonSpecies;

  public static readonly [Species.Floatzel]: PokemonSpecies;

  public static readonly [Species.Cherubi]: PokemonSpecies;

  public static readonly [Species.Cherrim]: PokemonSpecies;

  public static readonly [Species.Shellos]: PokemonSpecies;

  public static readonly [Species.Gastrodon]: PokemonSpecies;

  public static readonly [Species.Ambipom]: PokemonSpecies;

  public static readonly [Species.Drifloon]: PokemonSpecies;

  public static readonly [Species.Drifblim]: PokemonSpecies;

  public static readonly [Species.Buneary]: PokemonSpecies;

  public static readonly [Species.Lopunny]: PokemonSpecies;

  public static readonly [Species.Mismagius]: PokemonSpecies;

  public static readonly [Species.Honchkrow]: PokemonSpecies;

  public static readonly [Species.Glameow]: PokemonSpecies;

  public static readonly [Species.Purugly]: PokemonSpecies;

  public static readonly [Species.Chingling]: PokemonSpecies;

  public static readonly [Species.Stunky]: PokemonSpecies;

  public static readonly [Species.Skuntank]: PokemonSpecies;

  public static readonly [Species.Bronzor]: PokemonSpecies;

  public static readonly [Species.Bronzong]: PokemonSpecies;

  public static readonly [Species.Bonsly]: PokemonSpecies;

  public static readonly [Species.MimeJr]: PokemonSpecies;

  public static readonly [Species.Happiny]: PokemonSpecies;

  public static readonly [Species.Chatot]: PokemonSpecies;

  public static readonly [Species.Spiritomb]: PokemonSpecies;

  public static readonly [Species.Gible]: PokemonSpecies;

  public static readonly [Species.Gabite]: PokemonSpecies;

  public static readonly [Species.Garchomp]: PokemonSpecies;

  public static readonly [Species.Munchlax]: PokemonSpecies;

  public static readonly [Species.Riolu]: PokemonSpecies;

  public static readonly [Species.Lucario]: PokemonSpecies;

  public static readonly [Species.Hippopotas]: PokemonSpecies;

  public static readonly [Species.Hippowdon]: PokemonSpecies;

  public static readonly [Species.Skorupi]: PokemonSpecies;

  public static readonly [Species.Drapion]: PokemonSpecies;

  public static readonly [Species.Croagunk]: PokemonSpecies;

  public static readonly [Species.Toxicroak]: PokemonSpecies;

  public static readonly [Species.Carnivine]: PokemonSpecies;

  public static readonly [Species.Finneon]: PokemonSpecies;

  public static readonly [Species.Lumineon]: PokemonSpecies;

  public static readonly [Species.Mantyke]: PokemonSpecies;

  public static readonly [Species.Snover]: PokemonSpecies;

  public static readonly [Species.Abomasnow]: PokemonSpecies;

  public static readonly [Species.Weavile]: PokemonSpecies;

  public static readonly [Species.Magnezone]: PokemonSpecies;

  public static readonly [Species.Lickilicky]: PokemonSpecies;

  public static readonly [Species.Rhyperior]: PokemonSpecies;

  public static readonly [Species.Tangrowth]: PokemonSpecies;

  public static readonly [Species.Electivire]: PokemonSpecies;

  public static readonly [Species.Magmortar]: PokemonSpecies;

  public static readonly [Species.Togekiss]: PokemonSpecies;

  public static readonly [Species.Yanmega]: PokemonSpecies;

  public static readonly [Species.Leafeon]: PokemonSpecies;

  public static readonly [Species.Glaceon]: PokemonSpecies;

  public static readonly [Species.Gliscor]: PokemonSpecies;

  public static readonly [Species.Mamoswine]: PokemonSpecies;

  public static readonly [Species.PorygonZ]: PokemonSpecies;

  public static readonly [Species.Gallade]: PokemonSpecies;

  public static readonly [Species.Probopass]: PokemonSpecies;

  public static readonly [Species.Dusknoir]: PokemonSpecies;

  public static readonly [Species.Froslass]: PokemonSpecies;

  public static readonly [Species.Rotom]: PokemonSpecies;

  public static readonly [Species.Uxie]: PokemonSpecies;

  public static readonly [Species.Mesprit]: PokemonSpecies;

  public static readonly [Species.Azelf]: PokemonSpecies;

  public static readonly [Species.Dialga]: PokemonSpecies;

  public static readonly [Species.Palkia]: PokemonSpecies;

  public static readonly [Species.Heatran]: PokemonSpecies;

  public static readonly [Species.Regigigas]: PokemonSpecies;

  public static readonly [Species.Giratina]: PokemonSpecies;

  public static readonly [Species.Cresselia]: PokemonSpecies;

  public static readonly [Species.Phione]: PokemonSpecies;

  public static readonly [Species.Manaphy]: PokemonSpecies;

  public static readonly [Species.Darkrai]: PokemonSpecies;

  public static readonly [Species.Shaymin]: PokemonSpecies;

  public static readonly [Species.Arceus]: PokemonSpecies;

  // Generation V Pokémon species. (494-649)
  public static readonly [Species.Victini]: PokemonSpecies;

  public static readonly [Species.Snivy]: PokemonSpecies;

  public static readonly [Species.Servine]: PokemonSpecies;

  public static readonly [Species.Serperior]: PokemonSpecies;

  public static readonly [Species.Tepig]: PokemonSpecies;

  public static readonly [Species.Pignite]: PokemonSpecies;

  public static readonly [Species.Emboar]: PokemonSpecies;

  public static readonly [Species.Oshawott]: PokemonSpecies;

  public static readonly [Species.Dewott]: PokemonSpecies;

  public static readonly [Species.Samurott]: PokemonSpecies;

  public static readonly [Species.Patrat]: PokemonSpecies;

  public static readonly [Species.Watchog]: PokemonSpecies;

  public static readonly [Species.Lillipup]: PokemonSpecies;

  public static readonly [Species.Herdier]: PokemonSpecies;

  public static readonly [Species.Stoutland]: PokemonSpecies;

  public static readonly [Species.Purrloin]: PokemonSpecies;

  public static readonly [Species.Liepard]: PokemonSpecies;

  public static readonly [Species.Pansage]: PokemonSpecies;

  public static readonly [Species.Simisage]: PokemonSpecies;

  public static readonly [Species.Pansear]: PokemonSpecies;

  public static readonly [Species.Simisear]: PokemonSpecies;

  public static readonly [Species.Panpour]: PokemonSpecies;

  public static readonly [Species.Simipour]: PokemonSpecies;

  public static readonly [Species.Munna]: PokemonSpecies;

  public static readonly [Species.Musharna]: PokemonSpecies;

  public static readonly [Species.Pidove]: PokemonSpecies;

  public static readonly [Species.Tranquill]: PokemonSpecies;

  public static readonly [Species.Unfezant]: PokemonSpecies;

  public static readonly [Species.Blitzle]: PokemonSpecies;

  public static readonly [Species.Zebstrika]: PokemonSpecies;

  public static readonly [Species.Roggenrola]: PokemonSpecies;

  public static readonly [Species.Boldore]: PokemonSpecies;

  public static readonly [Species.Gigalith]: PokemonSpecies;

  public static readonly [Species.Woobat]: PokemonSpecies;

  public static readonly [Species.Swoobat]: PokemonSpecies;

  public static readonly [Species.Drilbur]: PokemonSpecies;

  public static readonly [Species.Excadrill]: PokemonSpecies;

  public static readonly [Species.Audino]: PokemonSpecies;

  public static readonly [Species.Timburr]: PokemonSpecies;

  public static readonly [Species.Gurdurr]: PokemonSpecies;

  public static readonly [Species.Conkeldurr]: PokemonSpecies;

  public static readonly [Species.Tympole]: PokemonSpecies;

  public static readonly [Species.Palpitoad]: PokemonSpecies;

  public static readonly [Species.Seismitoad]: PokemonSpecies;

  public static readonly [Species.Throh]: PokemonSpecies;

  public static readonly [Species.Sawk]: PokemonSpecies;

  public static readonly [Species.Sewaddle]: PokemonSpecies;

  public static readonly [Species.Swadloon]: PokemonSpecies;

  public static readonly [Species.Leavanny]: PokemonSpecies;

  public static readonly [Species.Venipede]: PokemonSpecies;

  public static readonly [Species.Whirlipede]: PokemonSpecies;

  public static readonly [Species.Scolipede]: PokemonSpecies;

  public static readonly [Species.Cottonee]: PokemonSpecies;

  public static readonly [Species.Whimsicott]: PokemonSpecies;

  public static readonly [Species.Petilil]: PokemonSpecies;

  public static readonly [Species.Lilligant]: PokemonSpecies;

  public static readonly [Species.Basculin]: PokemonSpecies;

  public static readonly [Species.Sandile]: PokemonSpecies;

  public static readonly [Species.Krokorok]: PokemonSpecies;

  public static readonly [Species.Krookodile]: PokemonSpecies;

  public static readonly [Species.Darumaka]: PokemonSpecies;

  public static readonly [Species.Darmanitan]: PokemonSpecies;

  public static readonly [Species.Maractus]: PokemonSpecies;

  public static readonly [Species.Dwebble]: PokemonSpecies;

  public static readonly [Species.Crustle]: PokemonSpecies;

  public static readonly [Species.Scraggy]: PokemonSpecies;

  public static readonly [Species.Scrafty]: PokemonSpecies;

  public static readonly [Species.Sigilyph]: PokemonSpecies;

  public static readonly [Species.Yamask]: PokemonSpecies;

  public static readonly [Species.Cofagrigus]: PokemonSpecies;

  public static readonly [Species.Tirtouga]: PokemonSpecies;

  public static readonly [Species.Carracosta]: PokemonSpecies;

  public static readonly [Species.Archen]: PokemonSpecies;

  public static readonly [Species.Archeops]: PokemonSpecies;

  public static readonly [Species.Trubbish]: PokemonSpecies;

  public static readonly [Species.Garbodor]: PokemonSpecies;

  public static readonly [Species.Zorua]: PokemonSpecies;

  public static readonly [Species.Zoroark]: PokemonSpecies;

  public static readonly [Species.Minccino]: PokemonSpecies;

  public static readonly [Species.Cinccino]: PokemonSpecies;

  public static readonly [Species.Gothita]: PokemonSpecies;

  public static readonly [Species.Gothorita]: PokemonSpecies;

  public static readonly [Species.Gothitelle]: PokemonSpecies;

  public static readonly [Species.Solosis]: PokemonSpecies;

  public static readonly [Species.Duosion]: PokemonSpecies;

  public static readonly [Species.Reuniclus]: PokemonSpecies;

  public static readonly [Species.Ducklett]: PokemonSpecies;

  public static readonly [Species.Swanna]: PokemonSpecies;

  public static readonly [Species.Vanillite]: PokemonSpecies;

  public static readonly [Species.Vanillish]: PokemonSpecies;

  public static readonly [Species.Vanilluxe]: PokemonSpecies;

  public static readonly [Species.Deerling]: PokemonSpecies;

  public static readonly [Species.Sawsbuck]: PokemonSpecies;

  public static readonly [Species.Emolga]: PokemonSpecies;

  public static readonly [Species.Karrablast]: PokemonSpecies;

  public static readonly [Species.Escavalier]: PokemonSpecies;

  public static readonly [Species.Foongus]: PokemonSpecies;

  public static readonly [Species.Amoonguss]: PokemonSpecies;

  public static readonly [Species.Frillish]: PokemonSpecies;

  public static readonly [Species.Jellicent]: PokemonSpecies;

  public static readonly [Species.Alomomola]: PokemonSpecies;

  public static readonly [Species.Joltik]: PokemonSpecies;

  public static readonly [Species.Galvantula]: PokemonSpecies;

  public static readonly [Species.Ferroseed]: PokemonSpecies;

  public static readonly [Species.Ferrothorn]: PokemonSpecies;

  public static readonly [Species.Klink]: PokemonSpecies;

  public static readonly [Species.Klang]: PokemonSpecies;

  public static readonly [Species.Klinklang]: PokemonSpecies;

  public static readonly [Species.Tynamo]: PokemonSpecies;

  public static readonly [Species.Eelektrik]: PokemonSpecies;

  public static readonly [Species.Eelektross]: PokemonSpecies;

  public static readonly [Species.Elgyem]: PokemonSpecies;

  public static readonly [Species.Beheeyem]: PokemonSpecies;

  public static readonly [Species.Litwick]: PokemonSpecies;

  public static readonly [Species.Lampent]: PokemonSpecies;

  public static readonly [Species.Chandelure]: PokemonSpecies;

  public static readonly [Species.Axew]: PokemonSpecies;

  public static readonly [Species.Fraxure]: PokemonSpecies;

  public static readonly [Species.Haxorus]: PokemonSpecies;

  public static readonly [Species.Cubchoo]: PokemonSpecies;

  public static readonly [Species.Beartic]: PokemonSpecies;

  public static readonly [Species.Cryogonal]: PokemonSpecies;

  public static readonly [Species.Shelmet]: PokemonSpecies;

  public static readonly [Species.Accelgor]: PokemonSpecies;

  public static readonly [Species.Stunfisk]: PokemonSpecies;

  public static readonly [Species.Mienfoo]: PokemonSpecies;

  public static readonly [Species.Mienshao]: PokemonSpecies;

  public static readonly [Species.Druddigon]: PokemonSpecies;

  public static readonly [Species.Golett]: PokemonSpecies;

  public static readonly [Species.Golurk]: PokemonSpecies;

  public static readonly [Species.Pawniard]: PokemonSpecies;

  public static readonly [Species.Bisharp]: PokemonSpecies;

  public static readonly [Species.Bouffalant]: PokemonSpecies;

  public static readonly [Species.Rufflet]: PokemonSpecies;

  public static readonly [Species.Braviary]: PokemonSpecies;

  public static readonly [Species.Vullaby]: PokemonSpecies;

  public static readonly [Species.Mandibuzz]: PokemonSpecies;

  public static readonly [Species.Heatmor]: PokemonSpecies;

  public static readonly [Species.Durant]: PokemonSpecies;

  public static readonly [Species.Deino]: PokemonSpecies;

  public static readonly [Species.Zweilous]: PokemonSpecies;

  public static readonly [Species.Hydreigon]: PokemonSpecies;

  public static readonly [Species.Larvesta]: PokemonSpecies;

  public static readonly [Species.Volcarona]: PokemonSpecies;

  public static readonly [Species.Cobalion]: PokemonSpecies;

  public static readonly [Species.Terrakion]: PokemonSpecies;

  public static readonly [Species.Virizion]: PokemonSpecies;

  public static readonly [Species.Tornadus]: PokemonSpecies;

  public static readonly [Species.Thundurus]: PokemonSpecies;

  public static readonly [Species.Reshiram]: PokemonSpecies;

  public static readonly [Species.Zekrom]: PokemonSpecies;

  public static readonly [Species.Landorus]: PokemonSpecies;

  public static readonly [Species.Kyurem]: PokemonSpecies;

  public static readonly [Species.Keldeo]: PokemonSpecies;

  public static readonly [Species.Meloetta]: PokemonSpecies;

  public static readonly [Species.Genesect]: PokemonSpecies;

  // Generation VI Pokémon species. (650-721)
  public static readonly [Species.Chespin]: PokemonSpecies;

  public static readonly [Species.Quilladin]: PokemonSpecies;

  public static readonly [Species.Chesnaught]: PokemonSpecies;

  public static readonly [Species.Fennekin]: PokemonSpecies;

  public static readonly [Species.Braixen]: PokemonSpecies;

  public static readonly [Species.Delphox]: PokemonSpecies;

  public static readonly [Species.Froakie]: PokemonSpecies;

  public static readonly [Species.Frogadier]: PokemonSpecies;

  public static readonly [Species.Greninja]: PokemonSpecies;

  public static readonly [Species.Bunnelby]: PokemonSpecies;

  public static readonly [Species.Diggersby]: PokemonSpecies;

  public static readonly [Species.Fletchling]: PokemonSpecies;

  public static readonly [Species.Fletchinder]: PokemonSpecies;

  public static readonly [Species.Talonflame]: PokemonSpecies;

  public static readonly [Species.Scatterbug]: PokemonSpecies;

  public static readonly [Species.Spewpa]: PokemonSpecies;

  public static readonly [Species.Vivillon]: PokemonSpecies;

  public static readonly [Species.Litleo]: PokemonSpecies;

  public static readonly [Species.Pyroar]: PokemonSpecies;

  public static readonly [Species.Flabebe]: PokemonSpecies;

  public static readonly [Species.Floette]: PokemonSpecies;

  public static readonly [Species.Florges]: PokemonSpecies;

  public static readonly [Species.Skiddo]: PokemonSpecies;

  public static readonly [Species.Gogoat]: PokemonSpecies;

  public static readonly [Species.Pancham]: PokemonSpecies;

  public static readonly [Species.Pangoro]: PokemonSpecies;

  public static readonly [Species.Furfrou]: PokemonSpecies;

  public static readonly [Species.Espurr]: PokemonSpecies;

  public static readonly [Species.Meowstic]: PokemonSpecies;

  public static readonly [Species.Honedge]: PokemonSpecies;

  public static readonly [Species.Doublade]: PokemonSpecies;

  public static readonly [Species.Aegislash]: PokemonSpecies;

  public static readonly [Species.Spritzee]: PokemonSpecies;

  public static readonly [Species.Aromatisse]: PokemonSpecies;

  public static readonly [Species.Swirlix]: PokemonSpecies;

  public static readonly [Species.Slurpuff]: PokemonSpecies;

  public static readonly [Species.Inkay]: PokemonSpecies;

  public static readonly [Species.Malamar]: PokemonSpecies;

  public static readonly [Species.Binacle]: PokemonSpecies;

  public static readonly [Species.Barbaracle]: PokemonSpecies;

  public static readonly [Species.Skrelp]: PokemonSpecies;

  public static readonly [Species.Dragalge]: PokemonSpecies;

  public static readonly [Species.Clauncher]: PokemonSpecies;

  public static readonly [Species.Clawitzer]: PokemonSpecies;

  public static readonly [Species.Helioptile]: PokemonSpecies;

  public static readonly [Species.Heliolisk]: PokemonSpecies;

  public static readonly [Species.Tyrunt]: PokemonSpecies;

  public static readonly [Species.Tyrantrum]: PokemonSpecies;

  public static readonly [Species.Amaura]: PokemonSpecies;

  public static readonly [Species.Aurorus]: PokemonSpecies;

  public static readonly [Species.Sylveon]: PokemonSpecies;

  public static readonly [Species.Hawlucha]: PokemonSpecies;

  public static readonly [Species.Dedenne]: PokemonSpecies;

  public static readonly [Species.Carbink]: PokemonSpecies;

  public static readonly [Species.Goomy]: PokemonSpecies;

  public static readonly [Species.Sliggoo]: PokemonSpecies;

  public static readonly [Species.Goodra]: PokemonSpecies;

  public static readonly [Species.Klefki]: PokemonSpecies;

  public static readonly [Species.Phantump]: PokemonSpecies;

  public static readonly [Species.Trevenant]: PokemonSpecies;

  public static readonly [Species.Pumpkaboo]: PokemonSpecies;

  public static readonly [Species.Gourgeist]: PokemonSpecies;

  public static readonly [Species.Bergmite]: PokemonSpecies;

  public static readonly [Species.Avalugg]: PokemonSpecies;

  public static readonly [Species.Noibat]: PokemonSpecies;

  public static readonly [Species.Noivern]: PokemonSpecies;

  public static readonly [Species.Xerneas]: PokemonSpecies;

  public static readonly [Species.Yveltal]: PokemonSpecies;

  public static readonly [Species.Zygarde]: PokemonSpecies;

  public static readonly [Species.Diancie]: PokemonSpecies;

  public static readonly [Species.Hoopa]: PokemonSpecies;

  public static readonly [Species.Volcanion]: PokemonSpecies;

  // Generation VII Pokémon species. (722-907)
  public static readonly [Species.Rowlet]: PokemonSpecies;

  public static readonly [Species.Dartrix]: PokemonSpecies;

  public static readonly [Species.Decidueye]: PokemonSpecies;

  public static readonly [Species.Litten]: PokemonSpecies;

  public static readonly [Species.Torracat]: PokemonSpecies;

  public static readonly [Species.Incineroar]: PokemonSpecies;

  public static readonly [Species.Popplio]: PokemonSpecies;

  public static readonly [Species.Brionne]: PokemonSpecies;

  public static readonly [Species.Primarina]: PokemonSpecies;

  public static readonly [Species.Pikipek]: PokemonSpecies;

  public static readonly [Species.Trumbeak]: PokemonSpecies;

  public static readonly [Species.Toucannon]: PokemonSpecies;

  public static readonly [Species.Yungoos]: PokemonSpecies;

  public static readonly [Species.Gumshoos]: PokemonSpecies;

  public static readonly [Species.Grubbin]: PokemonSpecies;

  public static readonly [Species.Charjabug]: PokemonSpecies;

  public static readonly [Species.Vikavolt]: PokemonSpecies;

  public static readonly [Species.Crabrawler]: PokemonSpecies;

  public static readonly [Species.Crabominable]: PokemonSpecies;

  public static readonly [Species.Oricorio]: PokemonSpecies;

  public static readonly [Species.Cutiefly]: PokemonSpecies;

  public static readonly [Species.Ribombee]: PokemonSpecies;

  public static readonly [Species.Rockruff]: PokemonSpecies;

  public static readonly [Species.Lycanroc]: PokemonSpecies;

  public static readonly [Species.Wishiwashi]: PokemonSpecies;

  public static readonly [Species.Mareanie]: PokemonSpecies;

  public static readonly [Species.Toxapex]: PokemonSpecies;

  public static readonly [Species.Mudbray]: PokemonSpecies;

  public static readonly [Species.Mudsdale]: PokemonSpecies;

  public static readonly [Species.Dewpider]: PokemonSpecies;

  public static readonly [Species.Araquanid]: PokemonSpecies;

  public static readonly [Species.Fomantis]: PokemonSpecies;

  public static readonly [Species.Lurantis]: PokemonSpecies;

  public static readonly [Species.Morelull]: PokemonSpecies;

  public static readonly [Species.Shiinotic]: PokemonSpecies;

  public static readonly [Species.Salandit]: PokemonSpecies;

  public static readonly [Species.Salazzle]: PokemonSpecies;

  public static readonly [Species.Stufful]: PokemonSpecies;

  public static readonly [Species.Bewear]: PokemonSpecies;

  public static readonly [Species.Bounsweet]: PokemonSpecies;

  public static readonly [Species.Steenee]: PokemonSpecies;

  public static readonly [Species.Tsareena]: PokemonSpecies;

  public static readonly [Species.Comfey]: PokemonSpecies;

  public static readonly [Species.Oranguru]: PokemonSpecies;

  public static readonly [Species.Passimian]: PokemonSpecies;

  public static readonly [Species.Wimpod]: PokemonSpecies;

  public static readonly [Species.Golisopod]: PokemonSpecies;

  public static readonly [Species.Sandygast]: PokemonSpecies;

  public static readonly [Species.Palossand]: PokemonSpecies;

  public static readonly [Species.Pyukumuku]: PokemonSpecies;

  public static readonly [Species.TypeNull]: PokemonSpecies;

  public static readonly [Species.Silvally]: PokemonSpecies;

  public static readonly [Species.Minior]: PokemonSpecies;

  public static readonly [Species.Komala]: PokemonSpecies;

  public static readonly [Species.Turtonator]: PokemonSpecies;

  public static readonly [Species.Togedemaru]: PokemonSpecies;

  public static readonly [Species.Mimikyu]: PokemonSpecies;

  public static readonly [Species.Bruxish]: PokemonSpecies;

  public static readonly [Species.Drampa]: PokemonSpecies;

  public static readonly [Species.Dhelmise]: PokemonSpecies;

  public static readonly [Species.Jangmoo]: PokemonSpecies;

  public static readonly [Species.Hakamoo]: PokemonSpecies;

  public static readonly [Species.Kommoo]: PokemonSpecies;

  public static readonly [Species.TapuKoko]: PokemonSpecies;

  public static readonly [Species.TapuLele]: PokemonSpecies;

  public static readonly [Species.TapuBulu]: PokemonSpecies;

  public static readonly [Species.TapuFini]: PokemonSpecies;

  public static readonly [Species.Cosmog]: PokemonSpecies;

  public static readonly [Species.Cosmoem]: PokemonSpecies;

  public static readonly [Species.Solgaleo]: PokemonSpecies;

  public static readonly [Species.Lunala]: PokemonSpecies;

  public static readonly [Species.Nihilego]: PokemonSpecies;

  public static readonly [Species.Buzzwole]: PokemonSpecies;

  public static readonly [Species.Pheromosa]: PokemonSpecies;

  public static readonly [Species.Xurkitree]: PokemonSpecies;

  public static readonly [Species.Celesteela]: PokemonSpecies;

  public static readonly [Species.Kartana]: PokemonSpecies;

  public static readonly [Species.Guzzlord]: PokemonSpecies;

  public static readonly [Species.Necrozma]: PokemonSpecies;

  public static readonly [Species.Magearna]: PokemonSpecies;

  public static readonly [Species.Marshadow]: PokemonSpecies;

  public static readonly [Species.Poipole]: PokemonSpecies;

  public static readonly [Species.Naganadel]: PokemonSpecies;

  public static readonly [Species.Stakataka]: PokemonSpecies;

  public static readonly [Species.Blacephalon]: PokemonSpecies;

  public static readonly [Species.Zeraora]: PokemonSpecies;

  public static readonly [Species.Meltan]: PokemonSpecies;

  public static readonly [Species.Melmetal]: PokemonSpecies;

  // Generation VIII Pokémon species. (810-905)
  public static readonly [Species.Grookey]: PokemonSpecies;

  public static readonly [Species.Thwackey]: PokemonSpecies;

  public static readonly [Species.Rillaboom]: PokemonSpecies;

  public static readonly [Species.Scorbunny]: PokemonSpecies;

  public static readonly [Species.Raboot]: PokemonSpecies;

  public static readonly [Species.Cinderace]: PokemonSpecies;

  public static readonly [Species.Sobble]: PokemonSpecies;

  public static readonly [Species.Drizzile]: PokemonSpecies;

  public static readonly [Species.Inteleon]: PokemonSpecies;

  public static readonly [Species.Skwovet]: PokemonSpecies;

  public static readonly [Species.Greedent]: PokemonSpecies;

  public static readonly [Species.Rookidee]: PokemonSpecies;

  public static readonly [Species.Corvisquire]: PokemonSpecies;

  public static readonly [Species.Corviknight]: PokemonSpecies;

  public static readonly [Species.Blipbug]: PokemonSpecies;

  public static readonly [Species.Dottler]: PokemonSpecies;

  public static readonly [Species.Orbeetle]: PokemonSpecies;

  public static readonly [Species.Nickit]: PokemonSpecies;

  public static readonly [Species.Thievul]: PokemonSpecies;

  public static readonly [Species.Gossifleur]: PokemonSpecies;

  public static readonly [Species.Eldegoss]: PokemonSpecies;

  public static readonly [Species.Wooloo]: PokemonSpecies;

  public static readonly [Species.Dubwool]: PokemonSpecies;

  public static readonly [Species.Chewtle]: PokemonSpecies;

  public static readonly [Species.Drednaw]: PokemonSpecies;

  public static readonly [Species.Yamper]: PokemonSpecies;

  public static readonly [Species.Boltund]: PokemonSpecies;

  public static readonly [Species.Rolycoly]: PokemonSpecies;

  public static readonly [Species.Carkol]: PokemonSpecies;

  public static readonly [Species.Coalossal]: PokemonSpecies;

  public static readonly [Species.Applin]: PokemonSpecies;

  public static readonly [Species.Flapple]: PokemonSpecies;

  public static readonly [Species.Appletun]: PokemonSpecies;

  public static readonly [Species.Silicobra]: PokemonSpecies;

  public static readonly [Species.Sandaconda]: PokemonSpecies;

  public static readonly [Species.Cramorant]: PokemonSpecies;

  public static readonly [Species.Arrokuda]: PokemonSpecies;

  public static readonly [Species.Barraskewda]: PokemonSpecies;

  public static readonly [Species.Toxel]: PokemonSpecies;

  public static readonly [Species.Toxtricity]: PokemonSpecies;

  public static readonly [Species.Sizzlipede]: PokemonSpecies;

  public static readonly [Species.Centiskorch]: PokemonSpecies;

  public static readonly [Species.Clobbopus]: PokemonSpecies;

  public static readonly [Species.Grapploct]: PokemonSpecies;

  public static readonly [Species.Sinistea]: PokemonSpecies;

  public static readonly [Species.Polteageist]: PokemonSpecies;

  public static readonly [Species.Hatenna]: PokemonSpecies;

  public static readonly [Species.Hattrem]: PokemonSpecies;

  public static readonly [Species.Hatterene]: PokemonSpecies;

  public static readonly [Species.Impidimp]: PokemonSpecies;

  public static readonly [Species.Morgrem]: PokemonSpecies;

  public static readonly [Species.Grimmsnarl]: PokemonSpecies;

  public static readonly [Species.Obstagoon]: PokemonSpecies;

  public static readonly [Species.Perrserker]: PokemonSpecies;

  public static readonly [Species.Cursola]: PokemonSpecies;

  public static readonly [Species.Sirfetchd]: PokemonSpecies;

  public static readonly [Species.MrRime]: PokemonSpecies;

  public static readonly [Species.Runerigus]: PokemonSpecies;

  public static readonly [Species.Milcery]: PokemonSpecies;

  public static readonly [Species.Alcremie]: PokemonSpecies;

  public static readonly [Species.Falinks]: PokemonSpecies;

  public static readonly [Species.Pincurchin]: PokemonSpecies;

  public static readonly [Species.Snom]: PokemonSpecies;

  public static readonly [Species.Frosmoth]: PokemonSpecies;

  public static readonly [Species.Stonjourner]: PokemonSpecies;

  public static readonly [Species.Eiscue]: PokemonSpecies;

  public static readonly [Species.Indeedee]: PokemonSpecies;

  public static readonly [Species.Morpeko]: PokemonSpecies;

  public static readonly [Species.Cufant]: PokemonSpecies;

  public static readonly [Species.Copperajah]: PokemonSpecies;

  public static readonly [Species.Dracozolt]: PokemonSpecies;

  public static readonly [Species.Arctozolt]: PokemonSpecies;

  public static readonly [Species.Dracovish]: PokemonSpecies;

  public static readonly [Species.Arctovish]: PokemonSpecies;

  public static readonly [Species.Duraludon]: PokemonSpecies;

  public static readonly [Species.Dreepy]: PokemonSpecies;

  public static readonly [Species.Drakloak]: PokemonSpecies;

  public static readonly [Species.Dragapult]: PokemonSpecies;

  public static readonly [Species.Zacian]: PokemonSpecies;

  public static readonly [Species.Zamazenta]: PokemonSpecies;

  public static readonly [Species.Eternatus]: PokemonSpecies;

  public static readonly [Species.Kubfu]: PokemonSpecies;

  public static readonly [Species.Urshifu]: PokemonSpecies;

  public static readonly [Species.Zarude]: PokemonSpecies;

  public static readonly [Species.Regieleki]: PokemonSpecies;

  public static readonly [Species.Regidrago]: PokemonSpecies;

  public static readonly [Species.Glastrier]: PokemonSpecies;

  public static readonly [Species.Spectrier]: PokemonSpecies;

  public static readonly [Species.Calyrex]: PokemonSpecies;

  public static readonly [Species.Wyrdeer]: PokemonSpecies;

  public static readonly [Species.Kleavor]: PokemonSpecies;

  public static readonly [Species.Ursaluna]: PokemonSpecies;

  public static readonly [Species.Basculegion]: PokemonSpecies;

  public static readonly [Species.Sneasler]: PokemonSpecies;

  public static readonly [Species.Overqwil]: PokemonSpecies;

  public static readonly [Species.Enamorus]: PokemonSpecies;

  // Generation IX Pokémon species. (906-???)
  public static readonly [Species.Sprigatito]: PokemonSpecies;

  public static readonly [Species.Fuecoco]: PokemonSpecies;

  public static readonly [Species.Quaxly]: PokemonSpecies;

  public constructor(jsonData: Stat) {
    super(jsonData);

    REGISTERED_POKEMON.add(this);
  }

  /**
   * Gets the PokemonSpecies instance holder by associated their name.
   *
   * @param {string} name The name to get
   * @returns {Option<PokemonSpecies>} The instance holder
   * @example
   * ```typescript
   * const JirachiHolder = PokemonSpecies.fromName('Jirachi')
   * assert.equal(JirachiHolder.isSome(), true)
   * assert.equal(JirachiHolder.unwrap(), PokemonSpecies.Jirachi)
   * ```
   * @example
   * ```typescript
   * const UnknownHolder = PokemonSpecies.fromName('unknown')
   * assert.equal(UnknownHolder.isSome(), false)
   * assert.throws(() => UnknownHolder.unwrap(), {
   *   name: 'OptionError',
   *   message: 'Unwrap failed'
   * })
   * ```
   */
  public static fromName(name: string | Nullish): Option<PokemonSpecies>;

  public static fromName(name: string): Option<PokemonSpecies>;

  public static fromName(name: Nullish): Option.None;

  public static fromName(name: string | Nullish): Option<PokemonSpecies> {
    const unsafe = PokemonSpecies.fromNameUnsafe(name);

    return isNullish(unsafe) ? Option.none : Option.some(unsafe);
  }

  /**
   * Gets the PokemonSpecies instance holder by associated their origin name or localized names.
   *
   * @param {string} name The name to get
   * @returns {Option<PokemonSpecies>} The instance holder
   * @example
   * ```typescript
   * const JirachiHolder = PokemonSpecies.fromLocalizedName('Jirachi')
   * assert.equal(JirachiHolder.isSome(), true)
   * assert.equal(JirachiHolder.unwrap(), PokemonSpecies.Jirachi)
   * ```
   * @example
   * ```typescript
   * const JirachiHolder = PokemonSpecies.fromLocalizedName('지라치')
   * assert.equal(JirachiHolder.isSome(), true)
   * assert.equal(JirachiHolder.unwrap(), PokemonSpecies.Jirachi)
   * ```
   * @example
   * ```typescript
   * const UnknownHolder = PokemonSpecies.fromLocalizedName('unknown')
   * assert.equal(UnknownHolder.isSome(), false)
   * assert.throws(() => UnknownHolder.unwrap(), {
   *   name: 'OptionError',
   *   message: 'Unwrap failed'
   * })
   * ```
   * @example
   * ```typescript
   * const UnknownHolder = PokemonSpecies.fromLocalizedName('몰?루')
   * assert.equal(UnknownHolder.isSome(), false)
   * assert.throws(() => UnknownHolder.unwrap(), {
   *   name: 'OptionError',
   *   message: 'Unwrap failed'
   * })
   * ```
   */
  public static fromLocalizedName(
    name: string | Nullish,
  ): Option<PokemonSpecies>;

  public static fromLocalizedName(name: string): Option<PokemonSpecies>;

  public static fromLocalizedName(name: Nullish): Option.None;

  public static fromLocalizedName(
    name: string | Nullish,
  ): Option<PokemonSpecies> {
    const unsafe = PokemonSpecies.fromLocalizedNameUnsafe(name);

    return isNullish(unsafe) ? Option.none : Option.some(unsafe);
  }

  /**
   * Gets the PokemonSpecies instance by associated their name.
   *
   * @param {string} name The name to get
   * @returns {PokemonSpecies} The instance
   */
  public static fromNameUnsafe(name: string | Nullish): PokemonSpecies | null;

  public static fromNameUnsafe(name: string): PokemonSpecies | null;

  public static fromNameUnsafe(name: Nullish): null;

  public static fromNameUnsafe(name: string | Nullish): PokemonSpecies | null {
    if (isNullishOrEmpty(name)) {
      return null;
    }

    for (const species of REGISTERED_POKEMON) {
      if (species.name === name) {
        return species;
      }
    }

    return null;
  }

  /**
   * Gets the PokemonSpecies instance by associated their origin name or localized names.
   *
   * @param {string} name The name to get
   * @returns {PokemonSpecies} The instance
   */
  public static fromLocalizedNameUnsafe(
    name: string | Nullish,
  ): PokemonSpecies | null;

  public static fromLocalizedNameUnsafe(name: string): PokemonSpecies | null;

  public static fromLocalizedNameUnsafe(name: Nullish): null;

  public static fromLocalizedNameUnsafe(
    name: string | Nullish,
  ): PokemonSpecies | null {
    if (isNullishOrEmpty(name)) {
      return null;
    }

    const languages = [...container.i18n.languages.values()];

    for (const species of REGISTERED_POKEMON) {
      if (
        species.name === name ||
        languages.find(
          (t) => t(species.translation().key()).toLowerCase() === name,
        )
      ) {
        return species;
      }
    }

    return null;
  }

  public static fromDex(dex: string | number): Option<PokemonSpecies>;

  public static fromDex(dex: number): Option<PokemonSpecies>;

  public static fromDex(dex: string): Option<PokemonSpecies>;

  public static fromDex(dex: string | number): Option<PokemonSpecies> {
    const unsafe = PokemonSpecies.fromDexUnsafe(dex);

    return isNullish(unsafe) ? Option.none : Option.some(unsafe);
  }

  public static fromDexUnsafe(dex: string | number): PokemonSpecies | null;

  public static fromDexUnsafe(dex: number): PokemonSpecies | null;

  public static fromDexUnsafe(dex: string): PokemonSpecies | null;

  public static fromDexUnsafe(dex: string | number): PokemonSpecies | null {
    for (const species of REGISTERED_POKEMON) {
      if (
        (typeof dex === "number" &&
          species.nationalPokedex.asNumber() === dex) ||
        (typeof dex === "string" && species.nationalPokedex.asString() === dex)
      ) {
        return species;
      }
    }

    return null;
  }

  public static values(): Set<PokemonSpecies> {
    return new Set(REGISTERED_POKEMON);
  }

  public static *iter(): Generator<PokemonSpecies> {
    for (const species of REGISTERED_POKEMON) {
      yield species;
    }
  }

  public static *[Symbol.iterator](): Generator<PokemonSpecies> {
    for (const species of REGISTERED_POKEMON) {
      yield species;
    }
  }

  public static getGenerationFromDex(dex: number): number {
    if (dex <= 151) {
      return 1;
    }
    if (dex <= 251) {
      return 2;
    }
    if (dex <= 386) {
      return 3;
    }
    if (dex <= 493) {
      return 4;
    }
    if (dex <= 649) {
      return 5;
    }
    if (dex <= 721) {
      return 6;
    }
    if (dex <= 807) {
      return 7;
    }
    if (dex <= 905) {
      return 8;
    }

    return 0;
  }
}
