import i18next from 'i18next'
import mergeOptions from 'merge-options'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { EnumForm } from '@/enums/EnumForm.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import { EnumAegislash } from '@/enums/forms/EnumAegislash.js'
import { EnumAlcremie } from '@/enums/forms/EnumAlcremie.js'
import { EnumArceus } from '@/enums/forms/EnumArceus.js'
import { EnumBasculin } from '@/enums/forms/EnumBasculin.js'
import { EnumBurmy } from '@/enums/forms/EnumBurmy.js'
import { EnumCalyrex } from '@/enums/forms/EnumCalyrex.js'
import { EnumCastform } from '@/enums/forms/EnumCastform.js'
import { EnumCherrim } from '@/enums/forms/EnumCherrim.js'
import { EnumDarmanitan } from '@/enums/forms/EnumDarmanitan.js'
import { EnumDeoxys } from '@/enums/forms/EnumDeoxys.js'
import { EnumEiscue } from '@/enums/forms/EnumEiscue.js'
import { EnumEternatus } from '@/enums/forms/EnumEternatus.js'
import { EnumFlabebe } from '@/enums/forms/EnumFlabebe.js'
import { EnumGastrodon } from '@/enums/forms/EnumGastrodon.js'
import { EnumGender } from '@/enums/forms/EnumGender.js'
import { EnumGiratina } from '@/enums/forms/EnumGiratina.js'
import { EnumGreninja } from '@/enums/forms/EnumGreninja.js'
import { EnumGroudon } from '@/enums/forms/EnumGroudon.js'
import { EnumHeroDuo } from '@/enums/forms/EnumHeroDuo.js'
import { EnumHoopa } from '@/enums/forms/EnumHoopa.js'
import { EnumKeldeo } from '@/enums/forms/EnumKeldeo.js'
import { EnumKyurem } from '@/enums/forms/EnumKyurem.js'
import { EnumLycanroc } from '@/enums/forms/EnumLycanroc.js'
import { EnumMagearna } from '@/enums/forms/EnumMagearna.js'
import { EnumMega } from '@/enums/forms/EnumMega.js'
import { EnumMeloetta } from '@/enums/forms/EnumMeloetta.js'
import { EnumMeowth } from '@/enums/forms/EnumMeowth.js'
import { EnumMimikyu } from '@/enums/forms/EnumMimikyu.js'
import { EnumMinior } from '@/enums/forms/EnumMinior.js'
import { EnumMorpeko } from '@/enums/forms/EnumMorpeko.js'
import { EnumNecrozma } from '@/enums/forms/EnumNecrozma.js'
import { EnumOricorio } from '@/enums/forms/EnumOricorio.js'
import { EnumPrimal } from '@/enums/forms/EnumPrimal.js'
import { EnumRotom } from '@/enums/forms/EnumRotom.js'
import { EnumShaymin } from '@/enums/forms/EnumShaymin.js'
import { EnumTherian } from '@/enums/forms/EnumTherian.js'
import { EnumToxtricity } from '@/enums/forms/EnumToxtricity.js'
import { EnumUnown } from '@/enums/forms/EnumUnown.js'
import { EnumUrshifu } from '@/enums/forms/EnumUrshifu.js'
import { EnumVivillon } from '@/enums/forms/EnumVivillon.js'
import { EnumWishiwashi } from '@/enums/forms/EnumWishiwashi.js'
import { EnumXerneas } from '@/enums/forms/EnumXerneas.js'
import { EnumZygarde } from '@/enums/forms/EnumZygarde.js'
import { RegionalForm } from '@/enums/forms/RegionalForm.js'
import { SeasonForm } from '@/enums/forms/SeasonForm.js'
import { ArrayUtil } from '@/utils/ArrayUtil.js'
import { DataDirectory } from '@/utils/Constants.js'
import { Util } from '@/utils/Util.js'

const spriteUri = `https://raw.githubusercontent.com/Sayakie/Riots/resources/sprites/pokemon`
const thumbnailUri = `https://img.pokemondb.net/sprites/home/normal`
/** @inner */
let sharedRandInt = -1
export function setSharedRandInt(i: number): void {
  sharedRandInt = i
}

/**
 * Prepares the given `baseStats` to expand forms if needed.
 *
 * @param {BaseStats} bs The base stats to prepare.
 * @returns {BaseStats} The prepared base stats.
 */
function prepareBaseStats(bs: BaseStats): BaseStats {
  if (bs.forms != null && Object.keys(bs.forms).length > 0) {
    Object.keys(bs.forms).forEach(form => {
      const { forms, ...bsDefault } = bs // eslint-disable-line @typescript-eslint/no-unused-vars
      bs.forms![form] = mergeOptions(bsDefault, bs.forms![form])
    })
  }

  return bs
}

export type BaseStatsLink = WeakMap<EnumSpecies, BaseStats>
export async function loadAllBaseStats(): Promise<BaseStatsLink> {
  const baseStatsMap = new WeakMap<EnumSpecies, BaseStats>()

  for await (const species of EnumSpecies.PokemonSet) {
    const baseStatsPath = join(
      DataDirectory,
      'pixelmon',
      'stats',
      `${species.getNationalPokedexNumber()}.json`
    )
    const baseStatsBuf = await readFile(baseStatsPath)
    const baseStatsJson = JSON.parse(baseStatsBuf.toString())
    const baseStats = prepareBaseStats(baseStatsJson)

    baseStatsMap.set(species, baseStats)
  }

  return baseStatsMap
}

export type FormLink = ReadonlyMap<EnumSpecies, EnumForm[]>
export async function loadAllForms(): Promise<FormLink> {
  const formList = EnumForm.formList as Map<EnumSpecies, EnumForm[]>

  return new Promise<Map<EnumSpecies, EnumForm[]>>((resolve, reject) => {
    try {
      formList.set(EnumSpecies.Aegislash, EnumAegislash.values())
      formList.set(EnumSpecies.Alcremie, EnumAlcremie.values())
      formList.set(EnumSpecies.Arceus, EnumArceus.values())
      formList.set(EnumSpecies.Basculin, EnumBasculin.values())
      formList.set(EnumSpecies.Burmy, EnumBurmy.values())
      formList.set(EnumSpecies.Calyrex, EnumCalyrex.values())
      formList.set(EnumSpecies.Castform, EnumCastform.values())
      formList.set(EnumSpecies.Cherrim, EnumCherrim.values())
      formList.set(EnumSpecies.Darmanitan, EnumDarmanitan.values())
      formList.set(EnumSpecies.Deoxys, EnumDeoxys.values())
      formList.set(EnumSpecies.Eiscue, EnumEiscue.values())
      formList.set(EnumSpecies.Eternatus, EnumEternatus.values())
      formList.set(
        EnumSpecies.Flabebe,
        EnumFlabebe.values().filter(({ form }) => form === 0)
      )
      formList.set(EnumSpecies.Floette, EnumFlabebe.values())
      formList.set(
        EnumSpecies.Florges,
        EnumFlabebe.values().filter(({ form }) => form === 0)
      )
      formList.set(EnumSpecies.Gastrodon, EnumGastrodon.values())
      formList.set(EnumSpecies.Giratina, EnumGiratina.values())
      formList.set(EnumSpecies.Greninja, EnumGreninja.values())
      formList.set(EnumSpecies.Groudon, EnumPrimal.values())
      formList.set(EnumSpecies.Groudon, EnumGroudon.values())
      formList.set(EnumSpecies.Hoopa, EnumHoopa.values())
      formList.set(EnumSpecies.Keldeo, EnumKeldeo.values())
      formList.set(EnumSpecies.Kyogre, EnumPrimal.values())
      formList.set(EnumSpecies.Kyurem, EnumKyurem.values())
      formList.set(EnumSpecies.Landorus, EnumTherian.values())
      formList.set(EnumSpecies.Lycanroc, EnumLycanroc.values())
      formList.set(EnumSpecies.Magearna, EnumMagearna.values())
      formList.set(EnumSpecies.Meloetta, EnumMeloetta.values())
      formList.set(EnumSpecies.Meowth, EnumMeowth.values())
      formList.set(EnumSpecies.Mimikyu, EnumMimikyu.values())
      formList.set(EnumSpecies.Minior, EnumMinior.values())
      formList.set(EnumSpecies.Morpeko, EnumMorpeko.values())
      formList.set(EnumSpecies.Necrozma, EnumNecrozma.values())
      formList.set(EnumSpecies.Oricorio, EnumOricorio.values())
      formList.set(EnumSpecies.Rotom, EnumRotom.values())
      formList.set(EnumSpecies.Sawsbuck, SeasonForm.values())
      formList.set(EnumSpecies.Shaymin, EnumShaymin.values())
      formList.set(EnumSpecies.Shellos, EnumGastrodon.values())
      formList.set(EnumSpecies.Silvally, EnumArceus.values())
      formList.set(EnumSpecies.Thundurus, EnumTherian.values())
      formList.set(EnumSpecies.Tornadus, EnumTherian.values())
      formList.set(EnumSpecies.Toxtricity, EnumToxtricity.values())
      formList.set(EnumSpecies.Unown, EnumUnown.values())
      formList.set(EnumSpecies.Urshifu, EnumUrshifu.values())
      formList.set(EnumSpecies.Vivillon, EnumVivillon.values())
      formList.set(EnumSpecies.Wishiwashi, EnumWishiwashi.values())
      formList.set(
        EnumSpecies.Wormadam,
        EnumBurmy.values().map(formEnum => formEnum.removeFlags('FakeForm'))
      )
      formList.set(EnumSpecies.Xerneas, EnumXerneas.values())
      formList.set(EnumSpecies.Zygarde, EnumZygarde.values())
      formList.set(EnumSpecies.Zacian, EnumHeroDuo.values())
      formList.set(EnumSpecies.Zamazenta, EnumHeroDuo.values())

      EnumForm.megaForms.forEach(species => {
        formList.set(species, [EnumMega.Normal, EnumMega.Mega])
      })

      EnumForm.megaXYForms.forEach(species => {
        formList.set(species, [EnumMega.Normal, EnumMega.MegaX, EnumMega.MegaY])
      })

      EnumForm.genderForms.forEach(species => {
        formList.set(species, [EnumGender.Male, EnumGender.Female])
      })

      EnumForm.alolanForms.forEach(species => {
        formList.set(species, [RegionalForm.Normal, RegionalForm.Alolan])
      })

      EnumForm.galarianForms.forEach(species => {
        formList.set(species, [RegionalForm.Normal, RegionalForm.Galarian])
      })

      resolve(formList)
    } catch {
      reject(new Error('Failed to load all forms'))
    }
  })
}

export async function loadSpawnerConfig(
  configFile = 'BetterSpawnerConfig.json'
): Promise<SpawnerConfig> {
  const filePathDefault = join(DataDirectory, 'pixelmon', 'spawning')
  const filePath = join(filePathDefault, configFile)
  const spawnerConfigBuf = await readFile(filePath)
  const spawnerConfig: SpawnerConfig = JSON.parse(spawnerConfigBuf.toString())

  return spawnerConfig
}

export type SpawnSets = ReadonlyMap<string, SpawnInfo[]>
export async function loadAllSpawnSets(): Promise<SpawnSets> {
  const filePath = join(DataDirectory, 'pixelmon', 'spawning')
  const filePathList = [
    join(filePath, 'standard'),
    join(filePath, 'legendaries')
  ]

  const spawnSets = new Map<string, SpawnInfo[]>()
  const spawnSetFileList = filePathList
    .map(filePath => Util.walk(filePath, { globs: ['**/*.json'] }))
    .flat()

  for await (const spawnSetFile of spawnSetFileList) {
    const spawnSetBuf = await readFile(spawnSetFile)
    const spawnSet: SpawnSet = JSON.parse(spawnSetBuf.toString())

    spawnSets.set(spawnSet.id, spawnSet.spawnInfos)
  }

  return spawnSets
}

export type PokeDrops = ReadonlyArray<PokeDrop>
export async function loadAllDrops(
  dropFile = 'pokedrops.json'
): Promise<PokeDrops> {
  const dropFilePath = join(DataDirectory, 'pixelmon', 'drops')
  const dropsBuf = await readFile(join(dropFilePath, dropFile))
  const drops = JSON.parse(dropsBuf.toString())

  return drops
}

export function getBaseStats(
  baseStats: Awaited<ReturnType<typeof loadAllBaseStats>>,
  species: EnumSpecies,
  variant: number = 0
): BaseStats | null {
  let bs = baseStats.get(species)

  if (variant > 0) {
    bs = bs?.forms?.[variant] ?? undefined
  }

  if (!bs) return null

  return bs!
}

export function getPokeDropFromSpecies(
  drop: ReadonlyArray<PokeDrop>,
  species: EnumSpecies,
  variant: number = 0
): PokeDrop | null {
  const dropInfo = drop.find(
    ({ pokemon, form }) =>
      pokemon === species.getName() && (form ?? variant) === variant
  )

  if (dropInfo) return dropInfo
  return null
}

export function getDrop(drop: PokeDrop): string {
  type DropData = { [P in Extract<keyof PokeDrop, `${string}data`>]: number }
  function generateDrop(
    type: keyof DropData,
    data: string,
    min: number,
    max: number
  ): string {
    const dropItemName = i18next.t(`Item:${data}`)
    const emoji =
      (Util.emojis[
        Util.replaceEmojiKeyIfPossible(
          data.replace(/^[^:]+/, '').substring(1)
        ) as keyof typeof Util['emojis']
      ] as '' | null) ?? ':grey_question:'

    return `${emoji} | **\`${dropItemName}${``.padEnd(
      dropItemNameMaxLength - dropItemNameLengthList[dropItemLengthOrder[type]]!
    )} ${min} ~ ${max}개\`**`
  }

  const { maindropdata, optdrop1data, optdrop2data, raredropdata } = drop
  const dropItemLengthOrder: DropData = {} as DropData
  const dropItemNameLengthList = Object.entries({
    maindropdata,
    optdrop1data,
    optdrop2data,
    raredropdata
  })
    .filter(([, value]) => Boolean(value))
    .map(([key, namespace]) => {
      const localizedData = i18next.t(`Item:${namespace}`)
      const length = localizedData
        .split('')
        .reduce((a, b) => a + (b.charCodeAt(0) >> 11 ? 2 : 1), 0)

      return [key, length] as [keyof DropData, number]
    })
    .sort(([, lengthOfA], [, lengthOfB]) => lengthOfA - lengthOfB)
    .map(([key, length], order, arr) => {
      const [prevKey, prevLength] = arr.at(order - 1)!

      let index = order
      if (length === prevLength) {
        index = dropItemLengthOrder[prevKey]!
      }

      dropItemLengthOrder[key] = index

      return length
    })

  const dropItemNameMaxLength = dropItemNameLengthList.at(-1)!
  const dropData: string[] = []

  if (maindropdata) {
    dropData.push(
      generateDrop(
        'maindropdata',
        maindropdata,
        drop.maindropmin,
        drop.maindropmax
      )
    )
  }

  if (optdrop1data) {
    dropData.push(
      generateDrop(
        'optdrop1data',
        optdrop1data,
        drop.optdrop1min,
        drop.optdrop1max
      )
    )
  }

  if (optdrop2data) {
    dropData.push(
      generateDrop(
        'optdrop2data',
        optdrop2data,
        drop.optdrop2min,
        drop.optdrop2max
      )
    )
  }

  if (raredropdata) {
    dropData.push(
      generateDrop(
        'raredropdata',
        raredropdata,
        drop.raredropmin,
        drop.raredropmax
      )
    )
  }

  return dropData.join('\n')
}

export function getSpriteUri(
  species: EnumSpecies,
  variant: number = 0
): string {
  const pokedex = species.getNationalPokedexNumber()
  let resourceSuffix = ''

  if (EnumForm.normalForms.includes(species)) {
    resourceSuffix = '-normal'
  } else if (EnumForm.formList.has(species)) {
    const forms = EnumForm.formList
      .get(species)!
      .filter(form => form.form === variant)

    if (forms.length > 1) {
      resourceSuffix =
        forms[sharedRandInt]?.spriteSuffix ??
        ArrayUtil.getRandomElement(forms).spriteSuffix
    } else {
      resourceSuffix = forms.at(0)!.spriteSuffix
    }
  }

  return `${spriteUri}/${pokedex}${resourceSuffix}.png`
}

export function getThumbnailUri(
  species: EnumSpecies,
  variant: number = 0
): string {
  let thumbUri = thumbnailUri
  let resource = species.getName().toLowerCase()
  let resourceSuffix = ''

  if (EnumForm.formList.has(species)) {
    const forms = EnumForm.formList
      .get(species)!
      .filter(form => form.form === variant)
    let form: EnumForm

    if (forms.length > 1) {
      form = forms[sharedRandInt] ?? ArrayUtil.getRandomElement(forms)
    } else {
      form = forms.at(0)!
    }

    resourceSuffix = form.imageSuffix ?? form.spriteSuffix
  }

  if (species === EnumSpecies.MrMime) {
    resource = 'mr-mime'
  } else if (species === EnumSpecies.MimeJr) {
    resource = 'mime-jr'
  } else if (species === EnumSpecies.MrRime) {
    resource = 'mr-rime'
  } else if (
    species === EnumSpecies.Frillish ||
    species === EnumSpecies.Hippopotas ||
    species === EnumSpecies.Jellicent ||
    species === EnumSpecies.Pyroar ||
    species === EnumSpecies.Unfezant ||
    species === EnumSpecies.Wobbuffet
  ) {
    resourceSuffix = resourceSuffix.includes('male') ? '' : '-f'
  } else if (species.getName().startsWith('Tapu')) {
    resource = species.getName().toLowerCase().replaceAll('tapu', 'tapu-')
    resourceSuffix = ''
  } else if (species === EnumSpecies.Unown) {
    thumbUri = thumbUri.replace('home/normal', 'home/shiny')
  }

  return `${thumbUri}/${resource}${resourceSuffix}.png`
}
