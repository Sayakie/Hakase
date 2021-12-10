import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import i18next from 'i18next'
import mergeOptions from 'merge-options'
import type { Options as WalkOptions } from 'walk-sync'
import walkSync from 'walk-sync'

import { EnumForm } from '@/enums/EnumForm.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import { ArrayUtil } from '@/utils/ArrayUtil.js'
import { FormFlag } from '@/utils/Constants.js'
import {
  getSpriteUri,
  getThumbnailUri,
  setSharedRandInt
} from '@/utils/PokemonUtil.js'

/* eslint-disable @typescript-eslint/naming-convention */
const minecraftEmojiSet = {
  apple: 871953472239599666n,
  arrow: 898175359814623282n,
  beef: 871953530645274674n,
  beetroot: 898119046816464939n,
  beetroot_seeds: 898119046912933929n,
  beetroot_soup: 898119047110074408n,
  blaze_powder: 871953758081392680n,
  blaze_rod: 871956085412626492n,
  bone: 871956169349033995n,
  book: 898119672455655465n,
  bread: 871956272176574464n,
  brown_mushroom: 898158526206185503n,
  cactus: 898122272798294076n,
  cake: 898181963561701376n,
  carrot: 871956415936331868n,
  chicken: 871956575131168828n,
  chorus_flower: 898182486977290284n,
  chorus_fruit: 898182134626410506n,
  clay: 898122379019038731n,
  clay_ball: 871956574996955186n,
  clock: 898119672468213781n,
  coal: 871956575114375198n,
  cobblestone: 898122475840372786n,
  cod: 898120662210727987n,
  cooked_beef: 871953520973209690n,
  cooked_chicken: 871956575001128990n,
  cooked_cod: 898135676070014981n,
  cooked_fish: 898135676070014981n,
  cooked_mutton: 898135781804236820n,
  cooked_porkchop: 898136009013870616n,
  cooked_rabbit: 898136103385722930n,
  cooked_salmon: 898136147656605717n,
  cookie: 898119672468213800n,
  diamond: 898119672661172284n,
  diamond_axe: 898119672661172284n,
  diamond_boots: 898119672661172284n,
  diamond_chestplate: 898119672661172284n,
  diamond_helmet: 898119672661172284n,
  diamond_hoe: 898119672661172284n,
  diamond_horse_armor: 898119672661172284n,
  diamond_leggings: 898119672661172284n,
  diamond_pickaxe: 898119672661172284n,
  diamond_shovel: 898119672661172284n,
  diamond_sword: 898119672661172284n,
  dirt: 898136873623506976n,
  'dirt~1': 898182754657763349n,
  double_plant: 898212567208583208n,
  'double_plant~1': 898212596656783370n,
  'double_plant~2': 898168145305559090n,
  'double_plant~3': 898212567225335868n,
  'double_plant~4': 898212596463837234n,
  'double_plant~5': 898212596488994867n,
  dragon_breath: 898119672501780491n,
  dye: 898119672468242462n,
  'dye~1': 898119672526934067n,
  'dye~2': 898119672656953355n,
  'dye~3': 898119672266903563n,
  'dye~4': 898119672489193512n,
  'dye~5': 898119672468242432n,
  'dye~6': 898119672174612562n,
  'dye~7': 898119672086556694n,
  'dye~8': 898119672484999168n,
  'dye~9': 898119672971534346n,
  'dye~10': 898119672493379625n,
  'dye~11': 898119672552124446n,
  'dye~12': 898119672367570955n,
  'dye~13': 898119672464019456n,
  'dye~14': 898119672745046076n,
  'dye~15': 898119672480817163n,
  egg: 898138230136905768n,
  elytra: 898119672128479233n,
  emerald: 898119672635994123n,
  enchanted_golden_apple: 871953488224092180n,
  end_crystal: 898119672707297310n,
  end_stone: 898138902764867594n,
  ender_eye: 898119672631803914n,
  ender_pearl: 898119672749232168n,
  experience_bottle: 898120432132161567n,
  feather: 898120519604400150n,
  fermented_spider_eye: 898120548427628604n,
  fish: 898219969018462289n,
  'fish~1': 898120704090849321n,
  'fish~2': 898121048887820298n,
  'fish~3': 898121012376391691n,
  flint: 898121082144456724n,
  flint_and_steel: 898121094710575106n,
  flower_pot: 898121113190694922n,
  ghast_tear: 898121135076569119n,
  glass_bottle: 898121209932292146n,
  glistering_melon_slice: 898121315649740800n,
  glowstone: 898121668566843462n,
  glowstone_dust: 898121357051719730n,
  gold_block: 898183015577055233n,
  gold_ingot: 898121734614568982n,
  gold_nugget: 898121753446985778n,
  golden_apple: 871953488224092180n,
  golden_axe: 898121734614568982n,
  golden_boots: 898121734614568982n,
  golden_carrot: 871956416313835551n,
  golden_chestplate: 898121734614568982n,
  golden_helmet: 898121734614568982n,
  golden_hoe: 898121734614568982n,
  golden_horse_armor: 898121734614568982n,
  golden_leggings: 898121734614568982n,
  golden_pickaxe: 898121734614568982n,
  golden_shovel: 898121734614568982n,
  golden_sword: 898121734614568982n,
  grass: 898140185596932216n,
  gravel: 898140311325392957n,
  gunpowder: 898140524328919051n,
  hardened_clay: 898140715211710464n,
  ice: 898140843796471829n,
  iron_axe: 898183187459604480n,
  iron_bars: 898188656848830555n,
  iron_block: 898183016042594314n,
  iron_boots: 898183187459604480n,
  iron_chestplate: 898183187459604480n,
  iron_helmet: 898183187459604480n,
  iron_hoe: 898183187459604480n,
  iron_horse_armor: 898183187459604480n,
  iron_ingot: 898183187459604480n,
  iron_leggings: 898183187459604480n,
  iron_nugget: 898183204790501396n,
  iron_pickaxe: 898183187459604480n,
  iron_shovel: 898183187459604480n,
  iron_sword: 898183187459604480n,
  jukebox: 898140994380365836n,
  knowledge_book: 898141104581541908n,
  lava_bucket: 898187517461942312n,
  leather: 898141197825114112n,
  leaves: 898141399592075274n,
  lit_pumpkin: 898141597173186590n,
  log: 898183788625014824n,
  'log~1': 898183788662767656n,
  'log~2': 898183788717297664n,
  'log~3': 898183788226568203n,
  'log~4': 898183788335603754n,
  'log~5': 898183788541136936n,
  magma_cream: 898141738722537503n,
  melon: 898141820159135744n,
  melon_block: 898184704791052318n,
  melon_seeds: 898141926283444244n,
  melon_slice: 898141820159135744n,
  mushroom_stew: 898159684282875964n,
  mutton: 898142052766863410n,
  nether_brick: 898185112284438582n,
  nether_star: 898142147176435762n,
  nether_wart: 898142160401088512n,
  noteblock: 898185234317709343n,
  packed_ice: 898140843796471829n,
  paper: 898142313761636363n,
  planks: 898185679425650708n,
  'planks~1': 898185679278841886n,
  'planks~2': 898185679375335444n,
  'planks~3': 898185679190761533n,
  'planks~4': 898185678964277290n,
  'planks~5': 898185679291441162n,
  poisonous_potato: 898142423190994944n,
  popped_chorus_fruit: 898185917188177951n,
  porkchop: 898142522495352853n,
  potato: 898142623028613131n,
  prismarine: 898175221201268738n,
  prismarine_crystals: 898142716846805022n,
  prismarine_shard: 898142729261948958n,
  'prismarine~2': 898174484173975554n,
  'prismarine~3': 898174484756979742n,
  pufferfish: 898121012376391691n,
  pumpkin: 898186049820434482n,
  pumpkin_pie: 898142997613539358n,
  pumpkin_seeds: 898142976415518750n,
  quartz: 898143586749653022n,
  rabbit: 898143135388016660n,
  rabbit_foot: 898143169647116288n,
  rabbit_hide: 898143289960701982n,
  red_flower: 898147748325515284n,
  'red_flower~1': 898147889145081866n,
  'red_flower~2': 898148010872152085n,
  'red_flower~3': 898148163297374248n,
  'red_flower~4': 898148282902138921n,
  'red_flower~5': 898148363042717756n,
  'red_flower~6': 898148465333370912n,
  'red_flower~7': 898148571285692456n,
  'red_flower~8': 898148686893301761n,
  red_mushroom: 898158586813898752n,
  red_mushroom_block: 898173789249085450n,
  red_sandstone: 898148860948529162n,
  'red_sandstone~1': 898149183947681842n,
  'red_sandstone~2': 898149527326957598n,
  redstone: 898151721044439090n,
  reeds: 898151782306431017n,
  rotten_flesh: 898151848870051872n,
  saddle: 898151906252296243n,
  salmon: 898120704090849321n,
  sand: 898152145256329216n,
  'sand~1': 898152380720353280n,
  sandstone: 898152427952427048n,
  'sandstone~1': 898152597129682974n,
  'sandstone~2': 898152697042186250n,
  sapling: 898172876807614494n,
  'sapling~1': 898173319164067860n,
  'sapling~2': 898173319172489226n,
  'sapling~3': 898173319159889920n,
  'sapling~4': 898173319155703818n,
  'sapling~5': 898173319130517514n,
  sea_lantern: 898172876807614494n,
  shield: 898172318159888385n,
  shulker_shell: 898172006921564170n,
  skull: 898172165642395688n,
  slime_ball: 898152819671064577n,
  snow: 898171874616422420n,
  snowball: 898158879588900894n,
  soul_sand: 898171420058726400n,
  spider_eye: 898158940381130763n,
  sponge: 898171724904951868n,
  stained_hardened_clay: 898186851230310401n,
  'stained_hardened_clay~1': 898186851087679538n,
  'stained_hardened_clay~2': 898186851138035722n,
  'stained_hardened_clay~3': 898186851020603432n,
  'stained_hardened_clay~4': 898186851255459840n,
  'stained_hardened_clay~5': 898186850873782285n,
  'stained_hardened_clay~6': 898186850882187264n,
  'stained_hardened_clay~7': 898186850785714246n,
  'stained_hardened_clay~8': 898186850827640843n,
  'stained_hardened_clay~9': 898186850949292032n,
  'stained_hardened_clay~10': 898186850940882944n,
  'stained_hardened_clay~11': 898186850886356992n,
  'stained_hardened_clay~12': 898186850374680607n,
  'stained_hardened_clay~13': 898186850454351902n,
  'stained_hardened_clay~14': 898186850164936726n,
  'stained_hardened_clay~15': 898186850391453706n,
  stick: 898159013324292116n,
  stone: 898166229116813312n,
  'stone~1': 898168276302065695n,
  'stone~2': 898169494499913729n,
  'stone~3': 898168385433636894n,
  'stone~4': 898169514284421180n,
  'stone~5': 898168783234007051n,
  'stone~6': 898169040097390603n,
  string: 898159068127039508n,
  sugar: 898159138486513745n,
  suspicious_stew: 898159684282875964n,
  tallgrass: 898168145305559090n,
  torch: 898167705608290334n,
  vine: 898160118049423381n,
  waterlily: 898166363774943293n,
  web: 898167431862845480n,
  wheat: 898167037870866476n,
  wheat_seeds: 898167057617657859n,
  wool: 898170696788758529n,
  'wool~1': 898170697128497182n,
  'wool~2': 898170697149472768n,
  'wool~3': 898170696851652619n,
  'wool~4': 898170697090756628n,
  'wool~5': 898170696860045323n,
  'wool~6': 898170697141075968n,
  'wool~7': 898170696658739221n,
  'wool~8': 898170697212383282n,
  'wool~9': 898170696981684235n,
  'wool~10': 898170697061396520n,
  'wool~11': 898170696964927499n,
  'wool~12': 898170696801333319n,
  'wool~13': 898170696751017995n,
  'wool~14': 898170696797159455n,
  'wool~15': 898170696969109504n,
  writable_book: 898166881905704960n,
  written_book: 898166881905704960n,
  yellow_flower: 898167241156227082n
} as const
/* eslint-enable */
/* eslint-disable
    @typescript-eslint/naming-convention,
    sort-keys-fix/sort-keys-fix
*/
const pixelmonEmojiSet = {
  bug_gem: 898193240342282261n,
  dark_gem: 898193268263780402n,
  dragon_gem: 898193290439049237n,
  electric_gem: 898193311473479771n,
  fighting_gem: 898193334873514064n,
  fairy_gem: 898193374874599425n,
  fire_gem: 898193405895671920n,
  flying_gem: 898193428603613184n,
  ghost_gem: 898211339439308800n,
  grass_gem: 898211547376136284n,
  ground_gem: 898211571216576543n,
  ice_gem: 898211596302688287n,
  normal_gem: 898211621309124688n,
  poison_gem: 898211642800758796n,
  psychic_gem: 898211667765248020n,
  rock_gem: 898211700661170196n,
  steel_gem: 898211722337337375n,
  water_gem: 898211750002983024n,
  black_belt: 898232624437399552n,
  black_glasses: 898232653344571452n,
  charcoal: 898232678590066838n,
  dragon_fang: 898232801462222931n,
  hard_stone: 898232869372170322n,
  magnet: 898232898057011241n,
  metal_coat: 898232912632242186n,
  prism_scale: 898232974397538375n,
  miracle_seed: 898232996744794223n,
  mystic_water: 898233021939994655n,
  never_melt_ice: 898233044564082738n,
  poison_barb: 898233083537530930n,
  sharp_beak: 898233117968572416n,
  silk_scarf: 898233143222497380n,
  silver_powder: 898233166320509009n,
  soft_sand: 898233185954050058n,
  spell_tag: 898233206720041000n,
  twisted_spoon: 898233228995993640n,
  destiny_knot: 898233246108770315n,
  x_attack: 898233491257446461n,
  x_defence: 898233491131613206n,
  x_special_attack: 898233491295178782n,
  x_special_defence: 898233490989023263n,
  x_speed: 898233491261624380n,
  x_accuracy: 898233490976407585n,
  dire_hit: 898233573927165953n,
  guard_spec: 898233594437320775n,
  max_mushroom: 898233614892937266n,
  adrenaline_orb: 898240860200779817n,
  sun_stone: 898237595035770911n,
  fire_stone: 898234196986855476n,
  water_stone: 898237594834468874n,
  moon_stone: 898237595199369237n,
  thunder_stone: 898237595287441438n,
  leaf_stone: 898237595153235988n,
  dawn_stone: 898234197280452709n,
  dusk_stone: 898234197276262461n,
  shiny_stone: 898237595186786344n,
  ice_stone: 898234197276254269n,
  thunder_stone_shard: 898237595211935764n,
  leaf_stone_shard: 898237594964459631n,
  water_stone_shard: 898237595304230942n,
  fire_stone_shard: 898234197284651008n,
  sun_stone_shard: 898237595220340766n,
  moon_stone_shard: 898237595128066079n,
  dusk_stone_shard: 898234197091704953n,
  dawn_stone_shard: 898234196902936609n,
  shiny_stone_shard: 898237594888962099n,
  ice_stone_shard: 898237595153232022n,
  ever_stone: 898238296029790228n,
  lucky_egg: 898238325859692584n,
  exp_share: 898238346717986837n,
  exp_all: 898238540750655538n,
  choice_band: 898238582014242836n,
  choice_scarf: 898238606886457344n,
  choice_specs: 898238630328410175n,
  muscle_band: 898238649018220574n,
  macho_brace: 898238670883156019n,
  power_weight: 898238695763771402n,
  power_bracer: 898238718895349780n,
  power_belt: 898238746883948616n,
  power_lens: 898238768337805393n,
  power_band: 898238805583212624n,
  power_anklet: 898238828588970004n,
  soothe_bell: 898238868778811432n,
  smoke_ball: 898238905030168606n,
  wide_lens: 898238933677244476n,
  leftovers: 898238953767981146n,
  shell_bell: 898238974303273032n,
  cell_battery: 898239013415178290n,
  metronome: 898239043026944031n,
  dubious_disc: 898239075167911957n,
  electirizer: 898239104762929253n,
  magmarizer: 898239134945144863n,
  kings_rock: 898239149943967845n,
  protector: 898239180604309534n,
  reaper_cloth: 898239209637281793n,
  deep_sea_scale: 898239238708002837n,
  deep_sea_tooth: 898239265119563826n,
  oval_stone: 898239289303924806n,
  soul_dew: 898239308614488094n,
  'up-grade': 898239328289972256n,
  razor_fang: 898239361668243478n,
  dragon_scale: 898239395084247041n,
  razor_claw: 898239423337103371n,
  sachet: 898239449580855296n,
  whipped_dream: 898240703753236511n,
  absorb_bulb: 898240640297607179n,
  life_orb: 898240663773118515n,
  focus_sash: 898240743888535623n,
  focus_band: 898240779116478504n,
  toxic_orb: 898240801719615488n,
  flame_orb: 898240902617780284n,
  black_sludge: 898240926009425960n,
  scope_lens: 898240956522979349n,
  air_balloon: 898240977372860446n,
  rocky_helmet: 898241009505423421n,
  shed_shell: 898241033962405999n,
  damp_rock: 898241053440770109n,
  heat_rock: 898241078640140298n,
  icy_rock: 898241105043259423n,
  smooth_rock: 898241127667335179n,
  eviolite: 898241154821271552n,
  light_ball: 898241173649490011n,
  lucky_punch: 898241199721316382n,
  metal_powder: 898241221695275030n,
  quick_powder: 898241250287833178n,
  leek: 898241268281393272n,
  thick_club: 898241286027497582n,
  power_herb: 898241315131768942n,
  red_card: 898241339370659890n,
  expert_belt: 898241361390764142n,
  light_clay: 898241387504484362n,
  mental_herb: 898241433209819207n,
  sticky_barb: 898241789033599087n,
  quick_claw: 898241819203231805n,
  white_herb: 898241867303505941n,
  big_root: 898241999143051294n,
  zoom_lens: 898242017325359104n,
  bright_powder: 898242037235712000n,
  lagging_tail: 898242057188024330n,
  wise_glasses: 898242079623376896n,
  eject_button: 898242099370164244n,
  binding_band: 898242120081604619n,
  iron_ball: 898242142760206387n,
  grip_claw: 898242164251836417n,
  float_stone: 898242182891327551n,
  ring_target: 898242207226687488n,
  amulet_coin: 898242232283451402n,
  ability_capsule: 898242273928691762n,
  assault_vest: 898242320821018715n,
  electric_seed: 898242349593923604n,
  grassy_seed: 898242368367632404n,
  misty_seed: 898242388806488084n,
  psychic_seed: 898242408712634440n,
  cleanse_tag: 898246122336813086n,
  ability_patch: 898246155538931794n,
  heart_scale: 898246539267424326n,
  terrain_extender: 898246646805176341n,
  fluffy_tail: 898234009652436993n,
  meadow_plate: 898246978239070249n,
  flame_plate: 898246999881687111n,
  splash_plate: 898247019792060448n,
  sky_plate: 898247036950966342n,
  insect_plate: 898247053866598421n,
  toxic_plate: 898247076805222401n,
  zap_plate: 898247103325814814n,
  mind_plate: 898247126230908939n,
  stone_plate: 898247144278982736n,
  earth_plate: 898247162201272361n,
  dread_plate: 898247177955082261n,
  spooky_plate: 898247197479534602n,
  iron_plate: 898247216450392125n,
  fist_plate: 898247234297139200n,
  icicle_plate: 898247258615726122n,
  draco_plate: 898247305470296154n,
  pixie_plate: 898247334301933568n,
  luminous_moss: 898247358792482856n,
  safety_goggles: 898247383434014750n,
  snowball: 898247404518785105n,
  weakness_policy: 898247445631365120n,
  blunder_policy: 898247464170192946n,
  adamant_orb: 898247495157702697n,
  lustrous_orb: 898283884834328606n,
  griseous_orb: 898247513511985245n,
  full_incense: 898247526963118101n,
  lax_incense: 898247561478021142n,
  luck_incense: 898247583426814043n,
  odd_incense: 898247608655577159n,
  pure_incense: 898247669707845632n,
  rock_incense: 898247688510931025n,
  rose_incense: 898283902110687332n,
  sea_incense: 898247704646414357n,
  wave_incense: 898247722514128976n,
  rare_candy: 898247918534918274n,
  xs_exp_candy: 898247949073649785n,
  s_exp_candy: 898247963145547777n,
  m_exp_candy: 898247977112576051n,
  l_exp_candy: 898247991364816936n,
  xl_exp_candy: 898248009173839882n,
  dynamax_candy: 898248103981879336n,
  max_soup: 898248122592014418n,
  potion: 898248168150544464n,
  super_potion: 898248182205653033n,
  hyper_potion: 898248204422873100n,
  full_restore: 898248223750246480n,
  fresh_water: 898248293845450783n,
  soda_pop: 898277991430361219n,
  lemonade: 898278009587523603n,
  moomoo_milk: 898278025836244992n,
  revive: 898278046774210630n,
  max_revive: 898278061882114149n,
  max_potion: 898278082207711324n,
  ether: 898278100356452443n,
  max_ether: 898278116676489236n,
  elixir: 898278135483732038n,
  max_elixir: 898278149815681056n,
  antidote: 898278169780580392n,
  paralyze_heal: 898278182019551323n,
  awakening: 898278212344381490n,
  burn_heal: 898278229536817172n,
  ice_heal: 898278250957115413n,
  full_heal: 898278268480938015n,
  blue_flute: 898278393727057970n,
  yellow_flute: 898278414308499567n,
  red_flute: 898278430007767060n,
  heal_powder: 898278451692306515n,
  energy_powder: 898278474425454592n,
  energy_root: 898278500228808784n,
  revival_herb: 898278520504061962n,
  black_apricorn: 898278565240528947n,
  white_apricorn: 898278587675840542n,
  pink_apricorn: 898278610757111819n,
  green_apricorn: 898278635759366147n,
  blue_apricorn: 898278656806387773n,
  yellow_apricorn: 898278682970451998n,
  red_apricorn: 898278708345987073n,
  buginium_z: 898278776499224596n,
  darkinium_z: 898278799618216056n,
  dragonium_z: 898283669079355444n,
  electrium_z: 898278812117237841n,
  fairium_z: 898278833747271760n,
  fightinium_z: 898278850516090910n,
  firium_z: 898278871294689370n,
  flyinium_z: 898278884062154762n,
  ghostium_z: 898278898054344745n,
  grassium_z: 898278911920717904n,
  groundium_z: 898278924780466267n,
  icium_z: 898278936780365875n,
  normalium_z: 898278963032514571n,
  poisonium_z: 898278985841143829n,
  psychium_z: 898279007580225577n,
  rockium_z: 898279021828243536n,
  steelium_z: 898279033618456626n,
  waterium_z: 898279045513498645n,
  aloraichium_z: 898279067940442163n,
  decidium_z: 898279080334618665n,
  eevium_z: 898279092959465492n,
  incinium_z: 898279316159361124n,
  kommonium_z: 898279333720915988n,
  lunalium_z: 898279350590386197n,
  lycanium_z: 898279361076138055n,
  marshadium_z: 898279373264805890n,
  mewnium_z: 898279384107061308n,
  mimikium_z: 898279394202763315n,
  pikanium_z: 898279411164545065n,
  pikashunium_z: 898279425332871168n,
  primarium_z: 898279438620454942n,
  snorlium_z: 898279452109336687n,
  solganium_z: 898283317181435915n,
  tapunium_z: 898279465736630292n,
  ultranecrozium_z: 898279482446729286n,
  pomeg_berry: 898279544736325673n,
  kelpsy_berry: 898279568035688448n,
  qualot_berry: 898279586549338162n,
  hondew_berry: 898279613137027114n,
  grepa_berry: 898279635727581214n,
  tamato_berry: 898279656678101033n,
  oran_berry: 898279674906566687n,
  rawst_berry: 898279803633942599n,
  leppa_berry: 898279803633942599n,
  cheri_berry: 898279843328819240n,
  chesto_berry: 898279843328819240n,
  pecha_berry: 898279843328819240n,
  aspear_berry: 898279843328819240n,
  persim_berry: 898279998224478209n,
  lum_berry: 898280022710841376n,
  sitrus_berry: 898280042608599131n,
  berry_juice: 898280108870209576n,
  pumkin_berry: 898280172028043305n,
  drash_berry: 898280207146954832n,
  eggant_berry: 898280241171148870n,
  yago_berry: 898280269423976498n,
  touga_berry: 898280291964186646n,
  apicot_berry: 898280311396368444n,
  liechi_berry: 898280331906514984n,
  ganlon_berry: 898280351347130479n,
  salac_berry: 898280369407787048n,
  petaya_berry: 898280387648847903n,
  lansat_berry: 898280404845482004n,
  starf_berry: 898280427163353108n,
  custap_berry: 898280453721710602n,
  aguav_berry: 898280482641420399n,
  figy_berry: 898280533958746145n,
  iapapa_berry: 898280614913011732n,
  mago_berry: 898280637025374228n,
  wiki_berry: 898280674195296359n,
  occa_berry: 898280698543210536n,
  passho_berry: 898280732684845056n,
  wacan_berry: 898280874200686654n,
  rindo_berry: 898280905804750869n,
  yache_berry: 898280931851403265n,
  chople_berry: 898280953380745216n,
  kebia_berry: 898280972397723668n,
  shuca_berry: 898280990349344820n,
  coba_berry: 898281008795881503n,
  payapa_berry: 898281026411954178n,
  tanga_berry: 898281053939200101n,
  charti_berry: 898281090014408746n,
  kasib_berry: 898281116606275584n,
  haban_berry: 898281137091272796n,
  colbur_berry: 898281153386123264n,
  babiri_berry: 898281173074190357n,
  chilan_berry: 898281195790536774n,
  ginema_berry: 898281225079357563n,
  jaboca_berry: 898281247745396787n,
  rowap_berry: 898281272932175872n,
  enigma_berry: 898281292314062908n,
  kee_berry: 898281315437260841n,
  maranga_berry: 898281346504491070n,
  roseli_berry: 898281364850372629n,
  micle_berry: 898281384253198346n,
  cornn_berry: 898281473998716968n,
  magost_berry: 898281494982819880n,
  rabuta_berry: 898281514234699847n,
  nomel_berry: 898281536804233217n,
  spelon_berry: 898281556601360424n,
  pamtre_berry: 898281576524288012n,
  watmel_berry: 898281599181930616n,
  durin_berry: 898281618219880490n,
  belue_berry: 898281634061774849n,
  amethyst: 898281667838509107n,
  ruby: 898281683927855124n,
  crystal: 898281698175877172n,
  sapphire: 898281711639625738n,
  silicon: 898281728433590293n,
  resist_feather: 898404568738709554n,
  clever_feather: 898404723563065344n,
  bauxite_ore: 898405686499741767n,
  slowpoke_tail: 898405782729687060n,
  aluminium_ingot: 898406038708039701n,
  aluminium_plate: 898406080764317696n,
  muscle_feather: 898406142181523476n,
  swift_feather: 898406160812621885n,
  iron_base: 898406299849588736n,
  genius_feather: 898406374545952800n,
  health_feather: 898406467420422164n,
  pc: 898409252677382164n,
  orb: 898412323302178856n,
  comet_shard: 898412902787199006n,
  stardust: 898412832419356762n,
  gracidea: 898412750844354580n,
  pokemail_air: 898412530723082291n,
  pokemail_bloom: 898412530723082291n,
  pokemail_brick: 898412530723082291n,
  pokemail_bridged: 898412530723082291n,
  pokemail_bridgem: 898412530723082291n,
  pokemail_bridges: 898412530723082291n,
  pokemail_bridget: 898412530723082291n,
  pokemail_bridgev: 898412530723082291n,
  pokemail_bubble: 898412530723082291n,
  pokemail_dream: 898412530723082291n,
  pokemail_fab: 898412530723082291n,
  pokemail_favored: 898412530723082291n,
  pokemail_flame: 898412530723082291n,
  pokemail_glitter: 898412530723082291n,
  pokemail_grass: 898412530723082291n,
  pokemail_greet: 898412530723082291n,
  pokemail_harbor: 898412530723082291n,
  pokemail_heart: 898412530723082291n,
  pokemail_inquiry: 898412530723082291n,
  pokemail_like: 898412530723082291n,
  pokemail_mech: 898412530723082291n,
  pokemail_mosaic: 898412530723082291n,
  pokemail_orange: 898412530723082291n,
  pokemail_reply: 898412530723082291n,
  pokemail_retro: 898412530723082291n,
  pokemail_rsvp: 898412530723082291n,
  pokemail_shadown: 898412530723082291n,
  pokemail_snow: 898412530723082291n,
  pokemail_space: 898412530723082291n,
  pokemail_steel: 898412530723082291n,
  pokemail_thanks: 898412530723082291n,
  pokemail_tropic: 898412530723082291n,
  pokemail_tunnel: 898412530723082291n,
  pokemail_wave: 898412530723082291n,
  pokemail_wood: 898412530723082291n,
  poke_ball: 898413068265087017n,
  dream_ball: 898413068265087017n,
  great_ball: 898412990708191322n,
  ultra_ball: 898413068265087017n,
  master_ball: 898413068265087017n,
  level_ball: 898413068265087017n,
  moon_ball: 898413068265087017n,
  friend_ball: 898413068265087017n,
  love_ball: 898413017534967848n,
  safari_ball: 898413068265087017n,
  heavy_ball: 898413068265087017n,
  fast_ball: 898413068265087017n,
  repeat_ball: 898413068265087017n,
  timer_ball: 898413068265087017n,
  nest_ball: 898413068265087017n,
  net_ball: 898413068265087017n,
  dive_ball: 898413068265087017n,
  luxury_ball: 898413068265087017n,
  heal_ball: 898413068265087017n,
  dusk_ball: 898413068265087017n,
  park_ball: 898413068265087017n,
  quick_ball: 898413068265087017n,
  lure_ball: 898413068265087017n,
  sport_ball: 898413068265087017n,
  cherish_ball: 898413068265087017n,
  premier_ball: 898413068265087017n,
  gs_ball: 898413068265087017n,
  beast_ball: 898412955295682631n,
  poke_ball_lid: 898413095528046602n,
  dream_ball_lid: 898413095528046602n,
  great_ball_lid: 898413095528046602n,
  ultra_ball_lid: 898413095528046602n,
  master_ball_lid: 898413095528046602n,
  level_ball_lid: 898413095528046602n,
  moon_ball_lid: 898413095528046602n,
  friend_ball_lid: 898413095528046602n,
  love_ball_lid: 898413095528046602n,
  safari_ball_lid: 898413095528046602n,
  heavy_ball_lid: 898413095528046602n,
  fast_ball_lid: 898413095528046602n,
  repeat_ball_lid: 898413095528046602n,
  timer_ball_lid: 898413095528046602n,
  nest_ball_lid: 898413095528046602n,
  net_ball_lid: 898413095528046602n,
  dive_ball_lid: 898413095528046602n,
  luxury_ball_lid: 898413095528046602n,
  heal_ball_lid: 898413095528046602n,
  dusk_ball_lid: 898413095528046602n,
  park_ball_lid: 898413095528046602n,
  quick_ball_lid: 898413095528046602n,
  lure_ball_lid: 898413095528046602n,
  sport_ball_lid: 898413095528046602n,
  cherish_ball_lid: 898413095528046602n,
  premier_ball_lid: 898413095528046602n,
  gs_ball_lid: 898413095528046602n,
  beast_ball_lid: 898413095528046602n,
  poke_ball_disc: 898413137974411275n,
  dream_ball_disc: 898413137974411275n,
  great_ball_disc: 898413137974411275n,
  ultra_ball_disc: 898413137974411275n,
  master_ball_disc: 898413137974411275n,
  level_ball_disc: 898413137974411275n,
  moon_ball_disc: 898413137974411275n,
  friend_ball_disc: 898413137974411275n,
  love_ball_disc: 898413137974411275n,
  safari_ball_disc: 898413137974411275n,
  heavy_ball_disc: 898413137974411275n,
  fast_ball_disc: 898413137974411275n,
  repeat_ball_disc: 898413137974411275n,
  timer_ball_disc: 898413137974411275n,
  nest_ball_disc: 898413137974411275n,
  net_ball_disc: 898413137974411275n,
  dive_ball_disc: 898413137974411275n,
  luxury_ball_disc: 898413137974411275n,
  heal_ball_disc: 898413137974411275n,
  dusk_ball_disc: 898413137974411275n,
  park_ball_disc: 898413137974411275n,
  quick_ball_disc: 898413137974411275n,
  lure_ball_disc: 898413137974411275n,
  sport_ball_disc: 898413137974411275n,
  cherish_ball_disc: 898413137974411275n,
  premier_ball_disc: 898413137974411275n,
  gs_ball_disc: 898413137974411275n,
  beast_ball_disc: 898413137974411275n
} as const

export const replaceKey = {
  // Minecraft
  'dirt~1': 'coarse_dirt',
  double_plant: 'sunflower',
  'double_plant~1': 'lilac',
  'double_plant~2': 'tallgrass',
  'double_plant~3': 'large_fern',
  'double_plant~4': 'rose_bush',
  'double_plant~5': 'peony',
  dye: 'ink_sac',
  'dye~1': 'red_dye',
  'dye~2': 'green_dye',
  'dye~3': 'brown_dye',
  'dye~4': 'blue_dye',
  'dye~5': 'purple_dye',
  'dye~6': 'cyan_dye',
  'dye~7': 'light_gray_dye',
  'dye~8': 'gray_dye',
  'dye~9': 'pink_dye',
  'dye~10': 'lime_dye',
  'dye~11': 'yellow_dye',
  'dye~12': 'light_blue_dye',
  'dye~13': 'magenta_dye',
  'dye~14': 'orange_dye',
  'dye~15': 'bone_meal',
  fish: 'cod',
  'fish~1': 'salmon',
  'fish~2': 'tropical_fish',
  'fish~3': 'pufferfish',
  log: 'oak_log',
  'log~1': 'spruce_log',
  'log~2': 'birch_log',
  'log~3': 'jungle_log',
  'log~4': 'acacia_log',
  'log~5': 'dark_oak_log',
  planks: 'oak_planks',
  'planks~1': 'spruce_planks',
  'planks~2': 'birch_planks',
  'planks~3': 'jungle_planks',
  'planks~4': 'acacia_planks',
  'planks~5': 'dark_oak_planks',
  prismarine: 'prismarine_block',
  'prismarine~2': 'prismarine_bricks',
  'prismarine~3': 'dark_prismarine',
  red_flower: 'poppy',
  'red_flower~1': 'blue_orchid',
  'red_flower~2': 'paeonia',
  'red_flower~3': 'houstonia',
  'red_flower~4': 'tulip_red',
  'red_flower~5': 'tulip_orange',
  'red_flower~6': 'tulip_white',
  'red_flower~7': 'tulip_pink',
  'red_flower~8': 'oxeye_daisy',
  'red_sandstone~1': 'chiseled_red_sandstone',
  'red_sandstone~2': 'smooth_red_sandstone',
  'sand~1': 'red_sand',
  'sandstone~1': 'chiseled_sandstone',
  'sandstone~2': 'smooth_sandstone',
  sapling: 'oak_sapling',
  'sapling~1': 'spruce_sapling',
  'sapling~2': 'birch_sapling',
  'sapling~3': 'jungle_sapling',
  'sapling~4': 'acacia_sapling',
  'sapling~5': 'dark_oak_sapling',
  stained_hardened_clay: 'white_terracotta',
  'stained_hardened_clay~1': 'orange_terracotta',
  'stained_hardened_clay~2': 'magenta_terracotta',
  'stained_hardened_clay~3': 'light_blue_terracotta',
  'stained_hardened_clay~4': 'yellow_terracotta',
  'stained_hardened_clay~5': 'lime_terracotta',
  'stained_hardened_clay~6': 'pink_terracotta',
  'stained_hardened_clay~7': 'gray_terracotta',
  'stained_hardened_clay~8': 'light_gray_terracotta',
  'stained_hardened_clay~9': 'cyan_terracotta',
  'stained_hardened_clay~10': 'purple_terracotta',
  'stained_hardened_clay~11': 'blue_terracotta',
  'stained_hardened_clay~12': 'brown_terracotta',
  'stained_hardened_clay~13': 'green_terracotta',
  'stained_hardened_clay~14': 'red_terracotta',
  'stained_hardened_clay~15': 'black_terracotta',
  'stone~1': 'granite',
  'stone~2': 'polished_granite',
  'stone~3': 'diorite',
  'stone~4': 'polished_diorite',
  'stone~5': 'andesite',
  'stone~6': 'polished_andesite',
  wool: 'white_wool',
  'wool~1': 'orange_wool',
  'wool~2': 'magenta_wool',
  'wool~3': 'light_blue_wool',
  'wool~4': 'yellow_wool',
  'wool~5': 'lime_wool',
  'wool~6': 'pink_wool',
  'wool~7': 'gray_wool',
  'wool~8': 'light_gray_wool',
  'wool~9': 'cyan_wool',
  'wool~10': 'purple_wool',
  'wool~11': 'blue_wool',
  'wool~12': 'brown_wool',
  'wool~13': 'green_wool',
  'wool~14': 'red_wool',
  'wool~15': 'black_wool',
  // Pixelmon
  'up-grade': 'up_grade'
} as Record<string, string>
/* eslint-enable */

const numericFormatter = new Intl.NumberFormat('en-IN')

interface TemplateParameters {
  bs: BaseStats
  spawnInfos: SpawnInfo[]
  spawnerConfig: SpawnerConfig
  variant: number
}

export function generateWebhookTemplate(p: TemplateParameters): {
  avatarUrl: string
  components: MessageActionRow[]
  embed: MessageEmbed
  username: string
} {
  const { components, embed: embedBase } = generateBaseTemplate(p)
  const username = embedBase.author?.name ?? `Unknown Pokemon`
  const avatarUrl =
    embedBase.author?.iconURL ??
    getSpriteUri(EnumSpecies.getFromName(p.bs.pixelmonName)!)
  const embed = embedBase.setAuthor('', '')

  return { avatarUrl, components, embed, username }
}

export function generateBaseTemplate({
  bs,
  spawnInfos,
  spawnerConfig,
  variant = 0
}: TemplateParameters): {
  embed: MessageEmbed
  components: MessageActionRow[]
} {
  const embed = new MessageEmbed()
  const components: MessageActionRow[] = []
  const species = EnumSpecies.getFromName(bs.pixelmonName)!

  const pokemonName = i18next.t(
    `Pixelmon:${species.getName().toLowerCase()}.name`
  )
  let [namePrefix, nameSuffix] = Array.from({ length: 2 }).map(() => '')

  if (EnumForm.formList.has(species)) {
    const forms = EnumForm.formList.get(species)!
    const currentForm = ArrayUtil.getRandomElement(
      forms.filter(({ form }) => form === variant)
    )
    const currentFormFlags = currentForm.getFlags()
    const otherFormList = forms.filter(({ form }) => form !== variant)

    setSharedRandInt(forms.indexOf(currentForm))

    if (variant > 0 || currentFormFlags.includes(FormFlag.ExposeMeta)) {
      const currentFormName =
        currentForm.$memo ?? currentForm.spriteSuffix.replace(/^-/, '')
      const formName = i18next.t(
        `Pixelmon:${species.getName().toLowerCase()}.form.${currentFormName}`
      )

      if (currentFormFlags.includes(FormFlag.PinToPrefix)) {
        namePrefix = `${formName} `
      } else {
        nameSuffix = ` - ${formName}`
      }
    }

    // Add some button for other forms
    if (otherFormList.length > 0) {
      // Due to Discord only allows up to 5 buttons, we need to split the list
      const rows = Math.ceil(otherFormList.length / 5)

      if (rows > 1) {
        /** TODO */
      } else {
        Array.from({ length: rows }).forEach((_, i) => {
          const row = new MessageActionRow()

          row.addComponents(
            otherFormList
              .slice(i * 5, i * 5 + 5)
              .map(({ form: variant, spriteSuffix, $memo }) => {
                const formName = $memo ?? spriteSuffix.replace(/^-/, '')
                const label = i18next.t(
                  `Pixelmon:${species.getName().toLowerCase()}.form.${formName}`
                )

                const button = new MessageButton()
                  .setStyle('SUCCESS')
                  .setCustomId(
                    `Pixelmon.${species
                      .getName()
                      .toLowerCase()}.form.${variant}`
                  )
                  .setLabel(label)

                return button
              })
          )

          components.push(row)
        })
      }
    }
  }

  // Add a button for the drops
  // TODO

  let spawnInfo: SpawnInfo
  const spawnInfoSpecs = spawnInfos.filter(
    ({ spec: { form } }) => (form ?? variant) === variant
  )
  if (spawnInfoSpecs.length > 1) {
    spawnInfo = spawnInfoSpecs.reduce(
      (acc, curr) => mergeOptions.call({ concatArray: true }, acc, curr),
      {} as SpawnInfo
    )
  } else {
    spawnInfo =
      spawnInfos.find(({ spec: { form } }) => (form ?? variant) === variant) ??
      spawnInfos.at(0)!
  }

  // #########################################
  const eggGroups = bs.eggGroups
    .map(eggGroup => i18next.t(`egg.${eggGroup.toLowerCase()}`))
    .join(', ')
  const eggCycles = Number(String((bs.eggCycles + 1) * 255))
  const catchRate = String(bs.catchRate)

  const spawnTimes =
    spawnInfo.condition.times
      ?.map(time => i18next.t(`time.${time.toLowerCase()}`))
      .join(', ') ?? i18next.t('field.spawn.unknown')!

  const spawnBiomes =
    spawnInfo.condition.stringBiomes
      ?.map(biome => {
        // Hotfix. Should be on the top of this handler
        if (biome === 'nether') return 'hell'
        if (Object.keys(spawnerConfig.biomeCategories).includes(biome)) {
          return spawnerConfig.biomeCategories[biome]
        }

        return biome
      })
      .flatMap(biomes => {
        if (Array.isArray(biomes)) {
          return biomes.map(biome => biome.replace(/^[^:]+./, ''))
        } else {
          return biomes
        }
      })
      .map(biome => i18next.t(`Biome:${biome}`, ''))
      .filter(Boolean)
      .join(', ') ?? i18next.t('field.spawn.unknown')!

  // ##########
  // # Stats
  // ##########
  const { HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed } = bs.stats

  const stats = [HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed]
    .map(stat => stat.toString().padStart(3))
    .join(' ')
  const totalStats = Object.values(bs.stats)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
    .padStart(4)
    .padEnd(5)

  let hiddenAbility = ''
  const isInlineEmbedField = spawnBiomes.length < 25 ? true : false

  // Build the embed
  embed
    .setAuthor(
      `${namePrefix}${pokemonName}${nameSuffix}(#${species.getNationalPokedexNumber()})`,
      getSpriteUri(species, variant)
    )
    .setThumbnail(getThumbnailUri(species, variant))
    .setDescription(
      i18next.t(`Pixelmon:${species.getName().toLowerCase()}.description`) +
        '\n\u200b'
    )
    .addField(
      ':crossed_swords: ' + i18next.t('field.type'),
      bs.types.map(type => i18next.t(`type.${type.toLowerCase()}`)).join(', '),
      true
    )
    .addField(
      ':shield ' + i18next.t('field.ability'),
      bs.abilities
        .map((ability, index) => {
          if (!ability) return null

          ability = i18next.t(
            `Ability:${ability.replace(/\s/g, '').toLowerCase()}.name`
          )!

          if (index == 2) {
            hiddenAbility = ability
            return null
          }

          return ability
        })
        .filter(Boolean)
        .join(', '),
      true
    )

  if (hiddenAbility) {
    embed.addField(':alembic: ' + i18next.t('type.ha'), hiddenAbility, true)
  } else {
    embed.addField('\u200b', '\u200b', true)
  }

  embed
    .addField(':egg: ' + i18next.t('field.eggGroup'), eggGroups, true)
    .addField(
      ':hatching_chick: ' + i18next.t('field.hatchTime'),
      numericFormatter.format(eggCycles),
      true
    )
    .addField(':crystal_ball: ' + i18next.t('field.catchRate'), catchRate, true)
    .addField(':hourglass: ' + i18next.t('field.spawnTime'), spawnTimes, true)
    .addField(
      ':mushroom: ' + i18next.t('field.spawnBiome'),
      spawnBiomes,
      isInlineEmbedField
    )

  if (isInlineEmbedField) {
    embed.addField('\u200b', '\u200b', true)
  }

  embed.addField(
    ':hibiscus: ' + i18next.t('field.stats'),
    '```ml\n' +
      `+-------------------------+-------+\n` +
      `|  HP Atk Def SpA SpD Spe | Total |\n` +
      `+-------------------------+-------+\n` +
      `| ${stats} | ${totalStats} |\n` +
      `+-------------------------+-------+\n` +
      '\n```'
  )

  // Cleanup
  setSharedRandInt(-1)

  return { components, embed }
}

/**
 * Util provides useful helper methods.
 */
export class Util extends null {
  public static readonly walkDefaultOptions: WalkOptions = {
    directories: false,
    globs: ['**/*.+(ts|js)'],
    ignore: ['test/**/*', '*.(test|module).+(ts|js)'],
    includeBasePath: true
  }

  public static readonly emojis = {
    ...Util.generateEmojiTemplate(minecraftEmojiSet),
    ...Util.generateEmojiTemplate(pixelmonEmojiSet)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static walk(
    directory: string,
    walkOptions?: WalkOptions
  ): ReadonlyArray<string> {
    walkOptions = Object.assign({}, Util.walkDefaultOptions, walkOptions)

    return walkSync(directory, walkOptions)
  }

  /**
   * Constructs an enumeration with keys equal to their value.
   *
   * @template {string} T
   * @param {T[] | ReadonlyArray<T>} keys An array of strings to construct an enumeration.
   * @returns {{ [P in T]: P }} An enumeration with keys equal to their value.
   * @example
   * import assert from 'assert'
   *
   * const Interactions = Util.keyMirror([
   *  'Trade$Consume',
   *  'Trade$Provide'
   * ])
   *
   * assert(Interactions.Trade$Consume === 'Trade$Consume') // No errors
   */
  public static keyMirror<T extends string>(
    keys: T[] | ReadonlyArray<T>
  ): { readonly [P in T]: P } {
    // @ts-expect-error TODO. fixme
    return keys.reduce((mirror, key) => {
      // @ts-expect-error TODO. fixme
      mirror[key] = key

      return mirror
    }, Object.create(null))
  }

  public static createUnique<T extends string>(
    keys: T[] | ReadonlyArray<T>
  ): { readonly [P in T]: symbol } {
    // @ts-expect-error TODO. fixme
    return keys.reduce((mirror, key) => {
      // @ts-expect-error TODO. fixme
      mirror[key] = Symbol(key)

      return mirror
    }, Object.create(null))
  }

  /**
   * Constructs an enumeration with keys match to their index.
   *
   * @template {ReadonlyArray<string>} T
   * @param {[...T] | Readonly<T>} keys An array of strings to construct an enumeration.
   * @returns An enumeration with keys match to their index.
   */
  public static createEnum<T extends ReadonlyArray<string>>(
    keys: [...T] | Readonly<T>
  ): {
    [V in T[number]]: {
      [K in Exclude<keyof T, keyof unknown[]>]: V extends T[K] ? K : never
    }[Exclude<keyof T, keyof unknown[]>]
  } & {
    [K in Exclude<keyof T, keyof unknown[]>]: T[K]
  } {
    // @ts-expect-error huh
    return keys.reduce((mirror, key, index) => {
      mirror[key] = index
      mirror[index] = key

      return mirror
    }, Object.create(null))
  }

  public static replaceEmojiKeyIfPossible(key: string): string {
    if (replaceKey[key]) {
      return replaceKey[key]!
    }

    return key
  }

  private static generateEmojiTemplate<
    T = typeof minecraftEmojiSet | typeof pixelmonEmojiSet
  >(
    emojis: T
    // @ts-expect-error huh
  ): { [P in keyof T & string]: `<:${P}:${T[P]}>` } {
    const emojiStrings = {} as Record<string, string>

    for (const rawEmoji in emojis) {
      const emoji = Util.replaceEmojiKeyIfPossible(rawEmoji)
      const emojiSnowflake = emojis[rawEmoji]

      emojiStrings[emoji] = `<:${emoji}:${emojiSnowflake}>`
    }

    return emojiStrings as {
      // @ts-expect-error huh
      [P in keyof T & string]: `<:${P}:${T[P]}>`
    }
  }
}
