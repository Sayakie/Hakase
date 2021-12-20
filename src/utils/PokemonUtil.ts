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
import { EnumMimikyu } from '@/enums/forms/EnumMimikyu.js'
import { EnumMinior } from '@/enums/forms/EnumMinior.js'
import { EnumMorpeko } from '@/enums/forms/EnumMorpeko.js'
import { EnumNecrozma } from '@/enums/forms/EnumNecrozma.js'
import { EnumOricorio } from '@/enums/forms/EnumOricorio.js'
import { EnumPrimal } from '@/enums/forms/EnumPrimal.js'
import { EnumRotom } from '@/enums/forms/EnumRotom.js'
import { EnumShaymin } from '@/enums/forms/EnumShaymin.js'
import { EnumSlowpoke } from '@/enums/forms/EnumSlowpoke.js'
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
import {
  baseStats as baseStatsLink,
  DataDirectory,
  emojis,
  FormFlag,
  pokeDrops
} from '@/utils/Constants.js'
import { getPostPosition, walk } from '@/utils/Util.js'

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
    const species = EnumSpecies.getFromName(bs.pixelmonName)!

    /* eslint-disable @typescript-eslint/no-unused-vars */
    Object.keys(bs.forms).forEach(form => {
      const { forms, ...bsExcludeForms } = bs
      let bsDefault = bsExcludeForms
      if (
        EnumForm.alolanForms.includes(species) ||
        EnumForm.galarianForms.includes(species)
      ) {
        const {
          trMoves,
          hmMoves,
          tmMoves1,
          tmMoves2,
          tmMoves3,
          tmMoves4,
          tmMoves5,
          tmMoves6,
          tmMoves7,
          tmMoves8,
          transferMoves,
          ...bsExcludeMoves
        } = bsExcludeForms

        bsDefault = bsExcludeMoves
      }

      bs.forms![form] = mergeOptions(bsDefault, bs.forms![form])
    })
    /* eslint-enable */
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
      formList.set(EnumSpecies.Mimikyu, EnumMimikyu.values())
      formList.set(EnumSpecies.Minior, EnumMinior.values())
      formList.set(EnumSpecies.Morpeko, EnumMorpeko.values())
      formList.set(EnumSpecies.Necrozma, EnumNecrozma.values())
      formList.set(EnumSpecies.Oricorio, EnumOricorio.values())
      formList.set(EnumSpecies.Rotom, EnumRotom.values())
      formList.set(EnumSpecies.Sawsbuck, SeasonForm.values())
      formList.set(EnumSpecies.Shaymin, EnumShaymin.values())
      formList.set(EnumSpecies.Slowpoke, EnumSlowpoke.values())
      formList.set(EnumSpecies.Slowking, EnumSlowpoke.values())
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

      // Fallback
      // EnumForm.galarianForms.p

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
    .map(filePath => walk(filePath, { globs: ['**/*.json'] }))
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
  species: EnumSpecies,
  variant: number = 0
): BaseStats | null {
  let bs = baseStatsLink.get(species)

  if (variant > 0) {
    if (species === EnumSpecies.Slowpoke && variant == 2) {
      bs = bs!.forms![1]
    } else {
      bs = bs?.forms?.[variant]
    }
  }

  if (!bs) return null
  return bs!
}

export function getPokemonName(bs: BaseStats, variant: number = 0): string {
  let [prefix, suffix] = [``, ``]
  const species = EnumSpecies.getFromName(bs.pixelmonName)!

  if (EnumForm.formList.has(species)) {
    const forms = EnumForm.formList.get(species)!
    const currentForm = ArrayUtil.getRandomElement(
      forms.filter(({ form }) => form === variant)
    )
    const currentFormFlags = currentForm.getFlags()
    if (variant > 0 || currentFormFlags.includes(FormFlag.ExposeMeta)) {
      const currentFormName =
        currentForm.$memo ?? currentForm.spriteSuffix.replace(/^-/, '')
      const formName = i18next.t(
        `Pixelmon:${currentForm.species.toLowerCase()}.form.${currentFormName}`
      )

      if (currentFormFlags.includes(FormFlag.PinToPrefix)) {
        prefix = `${formName} `
      } else {
        suffix = ` - ${formName}`
      }
    }
  }

  return `${prefix}${species.getLocalizedName()}${suffix}`
}

export function getPokeDropFromSpecies(
  species: EnumSpecies,
  variant: number = 0
): PokeDrop | null {
  const dropInfo = pokeDrops.find(
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
    const emojiId = data.replace(/^[^:]+./, '')
    const emoji = emojis[emojiId] ?? ':grey_question:'

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
  } else if (species === EnumSpecies.Lunatone) {
    resourceSuffix = '-gibbous'
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

  if (species === EnumSpecies.Jirachi) {
    return `https://cdn.discordapp.com/attachments/873927999261642822/921560707617681458/32a924544eb0501ca7d9369bf049932ac9d5acb689a35eed3f1665cdbfe40c2669d5a4a51b2e4101db06ffa65e0b4251afc4fac40beb92a237f310b41157cd8c737520372e87278041ea56d325dfb93b.gif`
  } else if (species === EnumSpecies.MrMime) {
    resource = 'mr-mime'
  } else if (species === EnumSpecies.MimeJr) {
    resource = 'mime-jr'
  } else if (species === EnumSpecies.MrRime) {
    resource = 'mr-rime'
  } else if (
    species === EnumSpecies.Frillish ||
    species === EnumSpecies.Hippopotas ||
    species === EnumSpecies.Hippowdon ||
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

export type ParsedSpec = Array<[string, string | number | boolean]>
export function parseEvolutionSpec(
  specRaw: string
): [EnumSpecies, ParsedSpec] | null {
  const [pokemonName, ...spec] = specRaw.split(/\s/)
  if (!pokemonName) return null

  const species = EnumSpecies.getFromName(pokemonName)
  const specKeySet: ParsedSpec = [['_id', -1]]
  if (!species) return null
  if (spec.length > 0) {
    spec.forEach(s => {
      if (s.startsWith('!')) {
        s = s.substring(1)
        specKeySet.push([s, false])
      } else {
        const [key, value] = s.split(':')

        switch (key) {
          case 'f':
          case 'form': {
            specKeySet.push(['form', Number(value)])
          }
        }
      }
    })
  }

  return [species, specKeySet]
}

export function getEvolutionEntities(
  species: EnumSpecies,
  variant: number = 0
): string[][] {
  const availableEvolutions: string[][] = []

  /**
   * Mega forms does not have any evolution data.
   */
  if (
    variant > 0 &&
    (EnumForm.megaForms.includes(species) ||
      EnumForm.megaXYForms.includes(species)) &&
    !(
      EnumForm.alolanForms.includes(species) ||
      EnumForm.galarianForms.includes(species)
    )
  ) {
    return availableEvolutions
  }

  const evolution = new Set<string>()
  const bs = getBaseStats(species, variant)
  if (bs === null) return availableEvolutions
  if (bs.preEvolutions.length > 0) {
    // Copy the pre-evolutions.
    // This is because the pre-evolutions are may affect polluting the evolution data.
    const preEvolutions = [...bs.preEvolutions].reverse()

    // Legacy pre-evolutions was inversed the order.
    // if (
    //   species.getNationalPokedexInteger() >= 722 &&
    //   species.getNationalPokedexInteger() < 810
    // ) {
    //   preEvolutions.reverse()
    // }

    preEvolutions
      .map(parseEvolutionSpec)
      .filter(
        (it): it is Exclude<ReturnType<typeof parseEvolutionSpec>, null> =>
          it !== null
      )
      .map(([species, spec]) => {
        const [, preVariant] = spec.find(([key]) => key === 'form') ?? [null, 0]

        let prefix = ''
        if (
          preVariant > 0 &&
          (EnumForm.alolanForms.includes(species) ||
            EnumForm.galarianForms.includes(species))
        ) {
          const formName = RegionalForm.values()
            .filter(({ form }) => form === preVariant)
            .at(0)!
            .spriteSuffix.replace(/^-/, '')
          prefix = i18next.t(`Pixelmon:generic.form.${formName}`) + ' '
        }

        evolution.add(`${prefix}${species.getLocalizedName()}`)
      })
  }

  if (bs.preEvolutions.length > 0 && bs.evolutions.length === 0) {
    evolution.add(getPokemonName(bs, variant))
    // let prefix = ''
    // if (
    //   variant > 0 &&
    //   (EnumForm.alolanForms.includes(species) ||
    //     EnumForm.galarianForms.includes(species))
    // ) {
    //   const formName = RegionalForm.values()
    //     .filter(({ form }) => form === variant)
    //     .at(0)!
    //     .spriteSuffix.replace(/^-/, '')
    //   prefix = i18next.t(`Pixelmon:generic.form.${formName}`) + ' '
    // }
    // evolution.add(`${prefix}${species.getLocalizedName()}`)
  }

  if (bs.evolutions.length > 0) {
    bs.evolutions
      .map<[EnumSpecies, number]>(postEvolution => [
        EnumSpecies.getFromName(postEvolution.to.name)!,
        postEvolution.to.form ?? 0
      ])
      .forEach(([postSpecies, postVariant]) => {
        const postEvolutions = getEvolutionEntities(postSpecies, postVariant)

        availableEvolutions.push(postEvolutions.at(0)!)
        /* postEvolutions.forEach(postEvolution => {
            availableEvolutions.push(postEvolution)
          }) */
      })
  }

  if (evolution.size > 0) {
    availableEvolutions.push([...evolution])
  }

  return availableEvolutions.filter(Boolean)
}

export function getEvolutionSpec(
  species: EnumSpecies,
  variant: number = 0
): string[] | null {
  if (
    variant > 0 &&
    (EnumForm.megaForms.includes(species) ||
      EnumForm.megaXYForms.includes(species) ||
      EnumForm.genderForms.includes(species)) &&
    !(
      EnumForm.alolanForms.includes(species) ||
      EnumForm.galarianForms.includes(species)
    )
  ) {
    return null
  }

  const bs = getBaseStats(species, variant)
  if (!bs || bs.preEvolutions.length === 0) {
    return null
  }

  const order = 0
  // Legacy pre-evolutions was inversed the order.
  // if (
  //   species.getNationalPokedexInteger() >= 722 &&
  //   species.getNationalPokedexInteger() < 810
  // ) {
  //   order = 0
  // }
  const [preSpecies, parsedSpec] = parseEvolutionSpec(
    bs.preEvolutions.at(order)!
  ) ?? [EnumSpecies.MissingNo, [['form', 0]]]
  const [, preVariant] = parsedSpec.find(([key]) => key === 'form') ?? [null, 0]

  const preBaseStats = getBaseStats(preSpecies, Number(preVariant))
  if (!preBaseStats) return null

  const evolutionSpecs: string[] = []
  preBaseStats.evolutions
    .filter(
      ({ to }) => to.name === species.getName() && (to.form ?? 0) === variant
    )
    .forEach(evolution => {
      const evolutionSpec: string[] = []
      evolutionSpec.push(
        getPokemonName(preBaseStats, variant) + i18next.t('Evolution:when')
      )

      if (i18next.language !== 'ko') {
        if (evolution.evoType === 'leveling') {
          let text
          if (evolution.level) {
            text = i18next.t('Evolution:type.levelingTo', {
              '0': evolution.level
            })
          } else {
            text = i18next.t('Evolution:type.leveling')
          }

          evolutionSpec.push(text)
        } else if (evolution.evoType === 'interact') {
          let text
          if (evolution.item) {
            text = i18next.t('Evolution:type.interactWith', {
              '0': i18next.t(`Item:${evolution.item.itemID}`)
            })
          } else {
            text = i18next.t('Evolution:type.interact')
          }

          evolutionSpec.push(text)
        } else if (evolution.evoType === 'trade') {
          const text = i18next.t('Evolution:type.trade')
          evolutionSpec.push(text)
        } else if (evolution.evoType === 'ticking') {
          const text = i18next.t('Evolution:type.ticking')
          evolutionSpec.push(text)
        }
      }

      if (evolution.conditions.length > 0) {
        evolution.conditions.forEach((condition, i, arr) => {
          const count = arr.length - 1 === i ? 0 : 1

          let isAnti = false,
            text = ''
          if (condition.evoConditionType === 'biome') {
            if (condition.biomes.length > 1) {
              text = i18next.t('Evolution:condition.biomes', {
                '0': condition.biomes
                  .map(b => !b.includes(':') || b.replace(/^[^:]+.:/, ''))
                  .map(b => i18next.t(`Biome:${b}`))
                  .join(i18next.t('Evolution:orAlt')),
                count
              })
            } else {
              text = i18next.t('Evolution:condition.biome', {
                '0': i18next.t(
                  `Biome:${condition.biomes.at(0)!.replace(/^[^:]+.:/, '')}`
                ),
                count
              })
            }
          } else if (condition.evoConditionType === 'chance') {
            const chance = (condition.chance * 100).toFixed(2)

            text = i18next.t('Evolution:condition.chance', {
              '0': chance,
              count
            })
          } else if (condition.evoConditionType === 'evolutionRock') {
            const { evolutionRock, maxRangeSquared: range } = condition

            text = i18next.t('Evolution:condition.evolutionRock', {
              '0': i18next.t(`Evolution:${evolutionRock}`),
              '1': range,
              count
            })
          } else if (condition.evoConditionType === 'evolutionScroll') {
            // TODO
          } else if (condition.evoConditionType === 'friendship') {
            text = i18next.t('Evolution:condition.friendship', {
              '0': condition.friendship,
              count
            })
          } else if (condition.evoConditionType === 'gender') {
            const gender = condition.genders
              .map(gender =>
                i18next.t(`Pixelmon:generic.form.${gender.toLowerCase()}`)
              )
              .join(i18next.t('Evolution.or'))

            text = i18next.t('Evolution:condition.gender', {
              '0': gender,
              count
            })
          } else if (condition.evoConditionType === 'healthAbsence') {
            text = i18next.t(`Evolution:condition.healthAbsense`, {
              '0': condition.health,
              count
            })
          } else if (condition.evoConditionType === 'heldItem') {
            text = i18next.t('Evolution:condition.heldItem', {
              '0': i18next.t(`Item:${condition.item.itemID}`),
              count
            })
          } else if (condition.evoConditionType === 'highAltitude') {
            // TODO. I have no idea about this property
          } else if (condition.evoConditionType === 'invert') {
            // TODO Invert condition
            isAnti = true
          } else if (condition.evoConditionType === 'move') {
            // TODO Get move from attackIndex
            // condition.attackIndex
          } else if (condition.evoConditionType === 'moveType') {
            text = i18next.t('Evolution:condition.moveType', {
              '0': i18next.t(`type.${condition.type.toLowerCase()}`),
              count
            })
          } else if (condition.evoConditionType === 'nature') {
            if (condition.natures.length > 1) {
              evolutionSpec.push(
                `to evolve with ${condition.natures.join(' or ')} nature`
              )
            } else {
              evolutionSpec.push(
                `to evolve with ${condition.natures.at(0)!} nature`
              )
            }
          } else if (condition.evoConditionType === 'ores') {
            // TODO
          } else if (condition.evoConditionType === 'party') {
            // TODO Should have alolan or galarian pokemons in party storage
          } else if (condition.evoConditionType === 'statRatio') {
            // TODO
          } else if (condition.evoConditionType === 'status') {
            // TODO
          } else if (condition.evoConditionType === 'time') {
            text = i18next.t('Evolution:condition.time', {
              '0': i18next
                .t(`time.${condition.time.toLowerCase()}`)
                .toLowerCase(),
              count
            })
          } else if (condition.evoConditionType === 'weather') {
            // TODO
          } else if (condition.evoConditionType === 'withinStructure') {
            text = i18next.t('Evolution:condition.withinStructure', {
              '0': i18next.t(`Structure:${condition.structure}`),
              count
            })
          }

          evolutionSpec.push(text)
        })
      }

      if (i18next.language === 'ko') {
        // Add evolution types
        if (evolution.evoType === 'leveling') {
          let text
          if (evolution.level) {
            text = i18next.t('Evolution:type.levelingTo', {
              '0': evolution.level
            })
          } else {
            text = i18next.t('Evolution:type.leveling')
          }

          evolutionSpec.push(text)
        } else if (evolution.evoType === 'interact') {
          let text
          if (evolution.item) {
            text = i18next.t('Evolution:type.interactWith', {
              '0': i18next.t(`Item:${evolution.item.itemID}`)
            })
          } else {
            text = i18next.t('Evolution:type.interact')
          }

          evolutionSpec.push(text)
        } else if (evolution.evoType === 'trade') {
          const text = i18next.t('Evolution:type.trade')
          evolutionSpec.push(text)
        } else if (evolution.evoType === 'ticking') {
          const text = i18next.t('Evolution:type.ticking')
          evolutionSpec.push(text)
        }
      }

      evolutionSpecs.push(evolutionSpec.join(' '))
    })

  return evolutionSpecs.map(getPostPosition)
}

function $getMove(
  moves: string[] | Record<string, string[]> | undefined
): string | null {
  if (!moves) return null

  const toMask = (s: string): string =>
    i18next.t(`Move:${s.replace(/\s/g, '_').toLowerCase()}.name`)
  if (Array.isArray(moves)) {
    return moves.map(toMask).join(', ')
  } else {
    return Object.values(moves)
      .map($moves => $moves.map(toMask).join(', '))
      .join(', ')
  }
}

// export type MoveType = 'physical' | 'special' | 'status'
export type MoveType = 'tr' | 'tm' | 'levelUp' | 'transfer' | 'tutor'
export function getMove(
  species: EnumSpecies,
  variant: number = 0
): { [M in MoveType]: string | null } | null {
  const bs = getBaseStats(species, variant)
  if (!bs) return null

  const {
    trMoves,
    tmMoves1,
    tmMoves2,
    tmMoves3,
    tmMoves4,
    tmMoves5,
    tmMoves6,
    tmMoves7,
    tmMoves8,
    tutorMoves,
    transferMoves,
    levelUpMoves
  } = bs

  const tr = $getMove(trMoves)
  const tm = [
    $getMove(tmMoves1),
    $getMove(tmMoves2),
    $getMove(tmMoves3),
    $getMove(tmMoves4),
    $getMove(tmMoves5),
    $getMove(tmMoves6),
    $getMove(tmMoves7),
    $getMove(tmMoves8)
  ]
    .filter(Boolean)
    .join(', ')
  const tutor = $getMove(tutorMoves)
  const transfer = $getMove(transferMoves)
  const levelUp = $getMove(levelUpMoves)

  return {
    levelUp,
    tm,
    tr,
    transfer,
    tutor
  }
}
