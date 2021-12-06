import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import i18next, { loadLanguages } from 'i18next'
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
import { DataDirectory, FormFlag as FormFlag } from '@/utils/Constants.js'
import { Util } from '@/utils/Util.js'

/** @private @readonly @const */
const thumbImageOverrideSet = {
  floetteAz:
    'https://media.discordapp.net/attachments/891995455171485767/898838872417501194/floetteAz.gif',
  greninjaAsh:
    'https://images-ext-1.discordapp.net/external/HKQXWkz2ksSmOQDfvud_oMTn0_EV3_3zYKKDprHVAps/%3Fwidth%3D202%26height%3D300/https/media.discordapp.net/attachments/875316663329894410/896447744779124736/50c0b061f23d58a7ae1d69a228b91220014a825d7dd2325c31a99352330fbaddf1783d9583f2d54dd649e42c1712a6b46301.png',
  missingNo:
    'https://media.discordapp.net/attachments/875316663329894410/896842247486730340/8182d8cbea7f45d66d6511153e21ca32.png?width=259&height=300'
} as const

function getDigitPron(p: number): string {
  const unit = p % 10
  switch (unit) {
    case 9:
    case 8:
    case 7:
    case 5:
    case 4:
    case 2:
    case 1:
      return '로'
    case 6:
    case 3:
    case 0:
    default:
      return '으로'
  }
}

function getPostPosition(str: string, post: string): string {
  const jong1 = post.split('/').at(0)!
  const jong2 = post.split('/').at(1)!

  const has = (str.charCodeAt(str.length - 1) - 44032) % 28
  if (has > 0) return `${str}${jong1}`
  else return `${str}${jong2}`
}

export class PokemonUtil extends null {
  public static Stats: WeakMap<EnumSpecies, BaseStats> = new WeakMap()
  public static Drops: ReadonlyArray<PokeDrop> = []
  public static Spawners: ReadonlyMap<string, SpawnInfo[]> = new Map()
  public static SpawnerConfig: SpawnerConfig

  private static readonly IntegerFormatter = new Intl.NumberFormat('en-IN')
  private static readonly DropFilePathDefaultUri = join(
    DataDirectory,
    'pixelmon',
    'drops'
  )
  private static readonly SpawnSetFilePathDefaultUri = join(
    DataDirectory,
    'pixelmon',
    'spawning'
  )
  private static readonly SpawnSetFilePathList = [
    join(PokemonUtil.SpawnSetFilePathDefaultUri, 'standard'),
    join(PokemonUtil.SpawnSetFilePathDefaultUri, 'legendaries')
  ]
  private static readonly SpriteUri =
    'https://raw.githubusercontent.com/Sayakie/Riots/resources/sprites/pokemon'
  private static readonly ThumbnailUri =
    'https://img.pokemondb.net/sprites/home/normal'
  private static readonly ThumbnailUriLegacy =
    'https://data1.pokemonkorea.co.kr/newdata/pokedex/mid'
  /** Use in SpriteUri & ImageUri matching formInt. */
  private static sharedRandInt = -1

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static async loadAllStats(): Promise<void> {
    for await (const species of EnumSpecies.PokemonSet) {
      const baseStatsBuf = await readFile(
        join(
          DataDirectory,
          'pixelmon',
          'stats',
          `${species.getNationalPokedexNumber()}.json`
        )
      )
      const baseStats = JSON.parse(baseStatsBuf.toString())

      this.Stats.set(species, baseStats)
    }
  }

  public static async loadAllForms(): Promise<void> {
    new Promise<void>((resolve, reject) => {
      try {
        const formList = EnumForm.formList as Map<EnumSpecies, EnumForm[]>

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
        formList.set(EnumSpecies.Deerling, SeasonForm.values())
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
          formList.set(species, [
            EnumMega.Normal,
            EnumMega.MegaX,
            EnumMega.MegaY
          ])
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

        resolve()
      } catch {
        reject('Could not load forms')
      }
    })
  }

  public static async loadAllSpawners(): Promise<void> {
    const Spawners = PokemonUtil.Spawners as Map<string, SpawnInfo[]>
    const spawnerConfigFile = join(
      PokemonUtil.SpawnSetFilePathDefaultUri,
      'BetterSpawnerConfig.json'
    )
    const spawnSetFileList = PokemonUtil.SpawnSetFilePathList.map(
      spawnSetFilePath =>
        Util.walk(spawnSetFilePath, {
          globs: ['**/*.json']
        })
    ).flat()

    const spawnerConfigBuf = await readFile(spawnerConfigFile)
    PokemonUtil.SpawnerConfig = JSON.parse(spawnerConfigBuf.toString())

    for await (const spawnSetFile of spawnSetFileList) {
      const spawnSetBuf = await readFile(spawnSetFile)
      const spawnSet = JSON.parse(spawnSetBuf.toString()) as SpawnSet

      Spawners.set(spawnSet.id, spawnSet.spawnInfos)
    }
  }

  public static async loadAllDrops(): Promise<void> {
    const dropDefaultFile = join(
      PokemonUtil.DropFilePathDefaultUri,
      'pokedrops.json'
    )

    const dropsBuf = await readFile(dropDefaultFile)
    PokemonUtil.Drops = JSON.parse(dropsBuf.toString())
  }

  public static getFormNameFromSuffix(suffix: string): string {
    return suffix.replace(/^-/, '')
  }

  public static getBaseStats(
    species: EnumSpecies,
    form: number = 0
  ): BaseStats {
    let bs = this.Stats.get(species)!

    if (EnumForm.formList.has(species)) {
      const enumForms = EnumForm.formList.get(species)!

      const isFakeForm = enumForms
        .filter(enumForm => enumForm.form === form)
        .some(form => form.getFlags().includes(FormFlag.FakeForm))

      if (isFakeForm) return bs
    }

    if (form > 0) {
      bs = { ...bs, ...bs.forms![`${form}`] }
    }

    return bs
  }

  /** @deprecated */
  public static getCatchRate(rate: number): string {
    switch (true) {
      // TODO
      case rate > 200: {
        return `${rate} (매우 쉬움)`
      }
      default:
        return '정보 없음'
    }
  }

  public static getDrop(species: EnumSpecies, formInt: number = 0): string {
    const dropInfo = PokemonUtil.Drops.find(
      ({ pokemon, form }) =>
        pokemon === species.getName() && (form ?? formInt) === formInt
    )!
    const { maindropdata, optdrop1data, optdrop2data, raredropdata } = dropInfo
    const leftPaddingValue = 0
    const dropItemLengthOrder = {} as {
      [P in Extract<keyof PokeDrop, `${string}data`>]: number
    }
    const dropItemNameLengthList = Object.entries({
      maindropdata,
      optdrop1data,
      optdrop2data,
      raredropdata
    })
      .filter(([, value]) => Boolean(value))
      .map(([key, namespace]) => {
        const localizedData = i18next.t(`Item:${namespace}`)!
        const length = localizedData
          .split('')
          .reduce((a, b) => a + (b.charCodeAt(0) >> 11 ? 2 : 1), 0)

        return [key, length] as [keyof typeof dropItemLengthOrder, number]
      })
      .sort(([, lengthOfA], [, lengthOfB]) => lengthOfA - lengthOfB)
      .map(([key, length], order, arr) => {
        const [prevKey, prevLength] = arr.at(order - 1)!

        if (length === prevLength) {
          order = dropItemLengthOrder[prevKey]
        }

        dropItemLengthOrder[key] = order

        return length
      })
    const dropItemNameMaxLength = dropItemNameLengthList.at(-1)!
    const dropData = [] as string[]

    function genInfo(
      type: keyof typeof dropItemLengthOrder,
      data: string,
      min: number,
      max: number
    ): string {
      const dropItemName = i18next.t(`Item:${data}`)
      const emoji =
        // @ts-expect-error huh
        Util.emojis[
          Util.replaceEmojiKeyIfPossible(
            data.replace(/^[^:]+/, '').substring(1)
          )
        ] ?? ':grey_question:'

      return `${emoji} | **\`${dropItemName.padEnd(
        dropItemNameMaxLength + leftPaddingValue - dropItemLengthOrder[type]
      )} ${min} ~ ${max}개\`**`
    }

    if (dropInfo.maindropdata) {
      dropData.push(
        genInfo(
          'maindropdata',
          dropInfo.maindropdata,
          dropInfo.maindropmin,
          dropInfo.maindropmax
        )
      )
    }

    if (dropInfo.optdrop1data) {
      dropData.push(
        genInfo(
          'optdrop1data',
          dropInfo.optdrop1data,
          dropInfo.optdrop1min,
          dropInfo.optdrop1max
        )
      )
    }

    if (dropInfo.optdrop2data) {
      dropData.push(
        genInfo(
          'optdrop2data',
          dropInfo.optdrop2data,
          dropInfo.optdrop2min,
          dropInfo.optdrop2max
        )
      )
    }

    if (dropInfo.raredropdata) {
      dropData.push(
        genInfo(
          'raredropdata',
          dropInfo.raredropdata,
          dropInfo.raredropmin,
          dropInfo.raredropmax
        )
      )
    }

    return dropData.join('\n')
  }

  public static getEvolution(
    species: EnumSpecies,
    form: number = 0
  ): string[][] {
    const availableForms = [form] as
      | [number]
      | [number, number]
      | [number, number, number]
    const availableEvolutions = [] as string[][]

    // Hotfix. Should be removal
    if (species === EnumSpecies.Milcery) {
      return this.getEvolution(EnumSpecies.Alcremie, 0)
    }

    if (EnumForm.alolanForms.includes(species)) {
      availableForms.push(1)
    }

    if (EnumForm.galarianForms.includes(species)) {
      availableForms.push(2)
    }

    availableForms.forEach(formInt => {
      const bs = PokemonUtil.getBaseStats(species, formInt)
      const evolution = new Set<string>()

      if (bs.preEvolutions.length > 0) {
        const preEvolutions = [...bs.preEvolutions]
        let preForm = 0

        preEvolutions
          .reverse()
          .map(evolutionSpec => {
            const specDetails = evolutionSpec.split(/\s+/)
            const pokemonName = specDetails.shift()!

            preForm = bs.form ?? formInt

            if (specDetails.length > 0) {
              specDetails
                .filter(spec => {
                  /** "!" indicates is not */
                  if (spec.startsWith('!')) return false

                  return true
                })
                .forEach(spec => {
                  const [key, value] = spec.split(':') as [string, string]

                  switch (key) {
                    case 'f':
                    case 'form': {
                      preForm = Number(value)
                      break
                    }
                    default:
                      break
                  }
                })
            }

            return pokemonName
          })
          .map(name => EnumSpecies.getFromName(name)!)
          .forEach(species => {
            const name = species.getLocalizedName()
            const namePrefix =
              preForm > 0
                ? i18next.t(
                    `Pixelmon:generic.form.${PokemonUtil.getRegionalNamespace(
                      preForm
                    )}`
                  ) + ' '
                : ''

            evolution.add(`${namePrefix}${name}`)
          })
      }

      if (bs.preEvolutions.length > 0 && bs.evolutions.length === 0) {
        const name = species.getLocalizedName()
        let namePrefix
        if (species === EnumSpecies.Alcremie) {
          const formName = EnumAlcremie.values()
            .filter(alcremie => alcremie.form === formInt)
            .at(0)!.spriteSuffix
          namePrefix =
            i18next.t(
              `Pixelmon:alcremie.form.${formName
                .substring(1)
                .replace(/-vanilla$/, '')}`
            ) + ' '
        } else
          namePrefix =
            formInt > 0
              ? i18next.t(
                  `Pixelmon:generic.form.${PokemonUtil.getRegionalNamespace(
                    formInt
                  )}`
                ) + ' '
              : ''

        evolution.add(`${namePrefix}${name}`)
      }

      if (bs.evolutions.length > 0) {
        bs.evolutions
          .map(
            evolution =>
              [
                EnumSpecies.getFromName(evolution.to.name)!,
                evolution.to.form ?? 0
              ] as [EnumSpecies, number]
          )
          .forEach(([postSpecies, postForm]) => {
            const postEvolutions = PokemonUtil.getEvolution(
              postSpecies,
              postForm
            )

            postEvolutions.forEach(postEvolutions => {
              availableEvolutions.push(postEvolutions)
            })
          })
      }

      if (evolution.size > 0) {
        availableEvolutions.push([...evolution])
      }
    })

    return availableEvolutions
  }

  public static getEvolutionSpec(
    species: EnumSpecies,
    form: number = 0
  ): string {
    // Hotfix.
    if (species === EnumSpecies.Alcremie) {
      return ''
    } else if (species === EnumSpecies.Greninja && form === 2) {
      return ''
    }

    if (
      EnumForm.megaForms.includes(species) ||
      EnumForm.megaXYForms.includes(species)
    ) {
      form = 0
    }
    const bs = PokemonUtil.getBaseStats(species, form)
    const evolutionSpec = [] as string[]
    let preForm = form

    if (bs.preEvolutions.length === 0) return ''

    const preSpeciesSpec = bs.preEvolutions.at(0)!
    const preSpeciesSpecDetails = preSpeciesSpec.split(/\s+/)
    const prePokemonName = preSpeciesSpecDetails.shift()!

    if (preSpeciesSpecDetails.length > 0) {
      preSpeciesSpecDetails
        .filter(spec => {
          if (spec.startsWith('!')) return false

          return true
        })
        .forEach(spec => {
          const [key, value] = spec.split(':') as [string, string]

          switch (key) {
            case 'f':
            case 'form': {
              preForm = Number(value)
              break
            }
            default:
              break
          }
        })
    }

    const preSpecies = EnumSpecies.getFromName(prePokemonName)!
    const preBaseStats = PokemonUtil.getBaseStats(preSpecies, preForm)

    const name = preSpecies.getLocalizedName()
    const namePrefix =
      preForm > 0
        ? i18next.t(
            `Pixelmon:generic.form.${PokemonUtil.getRegionalNamespace(preForm)}`
          ) + ' '
        : ''

    evolutionSpec.push(getPostPosition(`${namePrefix}${name}`, '이/가'))

    preBaseStats.evolutions
      .filter(
        evolution =>
          evolution.to.name === species.getName() &&
          (evolution.to.form ?? 0) === form
      )
      .forEach(evolution => {
        evolution.conditions.forEach(condition => {
          switch (condition.evoConditionType) {
            case 'gender': {
              const conditionSpec = condition.genders
                .map(gender =>
                  i18next.t(`Pixelmon:generic.form.${gender.toLowerCase()}`)
                )
                .at(0)!

              evolutionSpec.unshift(conditionSpec)
              break
            }
            case 'weather': {
              const weather = i18next.t(
                `weather.${condition.weather.toLowerCase()}`
              )
              const conditionSpec = `${weather}에`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'healthAbsence': {
              const conditionSpec = `기절하기 않고 ${condition.health} 이상의 누적 데미지를 입은 후`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'biome': {
              const biomes = condition.biomes
                .map(biome => biome.replace(/^[^:]+/, '').substring(1))
                .map(biome => i18next.t(`Biome:${biome}`, ''))

              let conditionSpec
              if (biomes.length > 1)
                conditionSpec = `바이옴 ${biomes.join(
                  ', '
                )} 중 아무 곳이나 있을 때`
              else conditionSpec = `바이옴 ${biomes[0]}에 있을 때`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'withinStructure': {
              const conditionSpec = `${condition.structure} 구조물에 있을 때`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'moveType': {
              const moveType = i18next.t(`type.${condition.type.toLowerCase()}`)
              const conditionSpec = `${moveType} 타입 기술을 배운 상태일 때`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'friendship': {
              const conditionSpec = `친밀도 ${condition.friendship} 이상일 때`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'heldItem': {
              const heldItem = i18next.t(`Item:${condition.item.itemID}`)
              const conditionSpec = `${getPostPosition(
                heldItem,
                '을/를'
              )} 장착 후`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'time': {
              const time = i18next.t(`time.${condition.time.toLowerCase()}`)
              const conditionSpec = `${time}에`

              evolutionSpec.push(conditionSpec)
              break
            }
            case 'party': {
              let conditionSpec = ''

              if ((condition.withForms?.length ?? 0) > 0) {
                condition.withForms!.forEach(form => {
                  if (form === 'ALOLAN') {
                    conditionSpec = '파티에 알로라 폼 포켓몬이 있을 때'
                  } else {
                    conditionSpec = '파티에 가라르 폼 포켓몬이 있을 때'
                  }
                })
              }

              evolutionSpec.push(conditionSpec)
              break
            }
            default:
              break
          }
        })

        switch (evolution.evoType) {
          case 'leveling': {
            let evolutionType = ''

            if (evolution.level) {
              const levelPost = getDigitPron(evolution.level)
              evolutionType = `레벨 ${evolution.level}${levelPost}`
            }

            evolutionType += ' 레벨업'

            evolutionSpec.push(evolutionType)
            break
          }
          case 'interact': {
            const itemName = i18next.t(`Item:${evolution.item!.itemID}`)
            const itemNameWithPost = getPostPosition(itemName, '으로/로')
            const evolutionType = `${itemNameWithPost} 상호작용`

            evolutionSpec.push(evolutionType)
            break
          }
          case 'trade': {
            evolutionSpec.push('교환진화')
            break
          }
          default:
            break
        }
      })

    return evolutionSpec.map(e => e.trim()).join(' ')
  }

  public static getSpriteUri(species: EnumSpecies, form: number = 0): string {
    const imageResource = species.getNationalPokedexNumber()
    let imageResourceSuffix = ''
    if (EnumForm.normalForms.includes(species)) {
      imageResourceSuffix = '-normal'
    } else if (EnumForm.formList.has(species)) {
      const enumForms = EnumForm.formList
        .get(species)!
        .filter(enumForm => enumForm.form === form)

      if (enumForms.length > 1) {
        imageResourceSuffix =
          enumForms[PokemonUtil.sharedRandInt]?.spriteSuffix ??
          ArrayUtil.getRandomElement(enumForms).spriteSuffix
      } else {
        imageResourceSuffix = enumForms.at(0)!.spriteSuffix
      }
    }

    return `${PokemonUtil.SpriteUri}/${imageResource}${imageResourceSuffix}.png`
  }

  public static getThumbnailUri(
    species: EnumSpecies,
    form: number = 0
  ): string {
    let thumbnailUri = PokemonUtil.ThumbnailUri
    let imageResource = species.getName().toLowerCase()
    let imageResourceSuffix = ''

    if (EnumForm.formList.has(species)) {
      const enumForms = EnumForm.formList
        .get(species)!
        .filter(enumForm => enumForm.form === form)

      if (enumForms.length > 1) {
        const enumForm =
          enumForms[PokemonUtil.sharedRandInt] ??
          ArrayUtil.getRandomElement(enumForms)
        imageResourceSuffix = enumForm.imageSuffix ?? enumForm.spriteSuffix
      } else {
        const enumForm = enumForms.at(0)!
        imageResourceSuffix = enumForm.imageSuffix ?? enumForm.spriteSuffix
      }
    }

    if (species === EnumSpecies.MrMime) {
      imageResource = 'mr-mime'
    } else if (species === EnumSpecies.MimeJr) {
      imageResource = 'mime-jr'
    } else if (species === EnumSpecies.MrRime) {
      imageResource = 'mr-rime'
    } else if (
      species === EnumSpecies.Frillish ||
      species === EnumSpecies.Hippopotas ||
      species === EnumSpecies.Jellicent ||
      species === EnumSpecies.Pyroar ||
      species === EnumSpecies.Unfezant ||
      species === EnumSpecies.Wobbuffet
    ) {
      imageResourceSuffix = imageResourceSuffix.includes('male') ? '' : '-f'
    } else if (species.getName().startsWith('Tapu')) {
      imageResource = species
        .getName()
        .toLowerCase()
        .replaceAll('tapu', 'tapu-')
      imageResourceSuffix = ''
    } else if (species === EnumSpecies.Unown) {
      thumbnailUri = thumbnailUri.replace('home/normal', 'home/shiny')
    }

    return `${thumbnailUri}/${imageResource}${imageResourceSuffix}.png`
  }

  /** @deprecated */
  public static getThumbnailUriLegacy(
    species: EnumSpecies,
    form: number = 0
  ): string {
    if (species.getName() === 'Greninja' && form === 1) {
      return thumbImageOverrideSet.greninjaAsh
    }

    if (form == 2) form = 1

    const imageResource =
      '0' + species.getNationalPokedexNumber() + '0' + (form + 1)

    return `${PokemonUtil.ThumbnailUriLegacy}/${imageResource}.png`
  }

  public static generateWebhookTemplate(
    bs: BaseStats,
    form: number = 0
  ): {
    avatarUrl: string
    components: MessageActionRow[]
    embed: MessageEmbed
    username: string
  } {
    const { components, embed: $embed } = this.generateBaseTemplate(bs, form)
    const username = $embed.author!.name!
    const avatarUrl = $embed.author!.iconURL!
    const embed = $embed.setAuthor('', '')

    return { avatarUrl, components, embed, username }
  }

  public static generateBaseTemplate(
    bs: BaseStats,
    form: number = 0
  ): { embed: MessageEmbed; components: MessageActionRow[] } {
    const embed = new MessageEmbed()
    const components = [] as MessageActionRow[]
    const species = EnumSpecies.getFromName(bs.pixelmonName)!

    const pokemonName = i18next.t(
      `Pixelmon:${species.getName().toLowerCase()}.name`
    )
    let pokemonNamePrefix = ''
    let pokemonNameSuffix = ''

    if (EnumForm.formList.has(species)) {
      const formList = EnumForm.formList.get(species)!
      const currentForm = ArrayUtil.getRandomElement(
        formList.filter(enumForm => enumForm.form === form)
      )
      const currentFormFlags = currentForm.getFlags()
      const otherFormList = formList.filter(enumForm => enumForm.form !== form)

      PokemonUtil.sharedRandInt = formList.indexOf(currentForm)

      if (form > 0 || currentFormFlags.includes('ExposeMeta')) {
        const currentFormName =
          currentForm.$memo ??
          PokemonUtil.getFormNameFromSuffix(currentForm.spriteSuffix)
        const formName = i18next.t(
          `Pixelmon:${currentForm.species.toLowerCase()}.form.${currentFormName}`
        )

        if (currentFormFlags.includes('PinToPrefix')) {
          pokemonNamePrefix = `${formName} `
        } else {
          pokemonNameSuffix = ` - ${formName}`
        }
      }

      if (otherFormList.length > 0) {
        const rows = Math.ceil(otherFormList.length / 5)

        if (rows > 1) {
          // do nothing at this moment.
          // const columns = Math.ceil(otherFormList.length / 25)
          // Array.from({ length: columns }).forEach((_, i) => {
          //   const component = new MessageActionRow()
          //   const selectMenu = new MessageSelectMenu().setCustomId(
          //     `Pixelmon.${species.getName().toLowerCase()}.formselect.${i}`
          //   )
          //   const availableRangeStart = i * 25 + i
          //   const availableRangeEnd = (i + 1) * 25 + i
          //
          //   otherFormList.forEach((enumForm, i) => {
          //     if (i < availableRangeStart || i > availableRangeEnd) return
          //     if (
          //       component.components
          //         .filter(
          //           (component): component is MessageSelectMenu =>
          //             component.type === 'SELECT_MENU'
          //         )
          //         .some(component =>
          //           component.options.some(option =>
          //             option.value.includes(`form.${enumForm.form}`)
          //           )
          //         ) ||
          //       components.some(({ components }) =>
          //         components
          //           .filter(
          //             (component): component is MessageSelectMenu =>
          //               component.type === 'SELECT_MENU'
          //           )
          //           .some(component =>
          //             component.options.some(option =>
          //               option.value.includes(`form.${enumForm.form}`)
          //             )
          //           )
          //       )
          //     )
          //       return
          //
          //     otherFormList.forEach(enumForm => {
          //       const formName =
          //         enumForm.$memo ??
          //         PokemonUtil.getFormNameFromSuffix(enumForm.spriteSuffix)
          //       const label = i18next.t(
          //         `Pixelmon:${enumForm.species.toLowerCase()}.form.${formName}`
          //       )
          //
          //       selectMenu.addOptions({ label, value: label })
          //     })
          //
          //     selectMenu.setPlaceholder('폼을 선택하세요')
          //     component.addComponents(selectMenu)
          //     components.push(component)
          //   })
          // })
        } else {
          Array.from({ length: rows }).forEach((_, i) => {
            const component = new MessageActionRow()
            const availableRangeStart = i * 4 + i
            const availableRangeEnd = (i + 1) * 4 + i

            otherFormList.forEach((enumForm, i) => {
              if (i < availableRangeStart || i > availableRangeEnd) return
              if (
                component.components.some(component =>
                  component.customId?.includes(`form.${enumForm.form}`)
                ) ||
                components.some(({ components }) =>
                  components.some(component =>
                    component.customId?.includes(`form.${enumForm.form}`)
                  )
                )
              )
                return

              const formName =
                enumForm.$memo ??
                PokemonUtil.getFormNameFromSuffix(enumForm.spriteSuffix)
              const formInt = enumForm.form
              const button = new MessageButton()
                .setCustomId(
                  `Pixelmon.${species.getName().toLowerCase()}.form.${formInt}`
                )
                .setStyle('SUCCESS')
                .setLabel(
                  i18next.t(
                    `Pixelmon:${enumForm.species.toLowerCase()}.form.${formName}`
                  )
                )

              component.addComponents(button)
            })

            components.push(component)
          })
        }
      }

      components.forEach((component, i) => {
        if (component.components.length === 0) {
          components.splice(i)
        }
      })
    }

    if (
      PokemonUtil.Drops.some(({ pokemon }) => pokemon === species.getName())
    ) {
      const button = new MessageButton()
        .setCustomId(
          `Pixelmon.${species.getName().toLowerCase()}.dropItem.${form}`
        )
        .setStyle('DANGER')
        .setLabel(i18next.t('field.drops'))

      if (components.some(({ components }) => components.length < 5)) {
        components
          .find(({ components }) => components.length < 5)!
          .addComponents(button)
      } else {
        const component = new MessageActionRow()
        component.addComponents(button)

        components.push(component)
      }
    }

    const spawnInfos =
      PokemonUtil.Spawners.get(bs.pixelmonName.replaceAll('-', '')) ??
      ([{ condition: {}, spec: {} }] as SpawnInfo[])
    let spawnInfo: SpawnInfo
    const $spawnInfos = spawnInfos.filter(
      ({ spec }) => (spec.form ?? form) === form
    )
    if ($spawnInfos.length > 1)
      spawnInfo = $spawnInfos.reduce(
        (acc, curr) => mergeOptions.call({ concatArrays: true }, acc, curr),
        {} as SpawnInfo
      )
    else
      spawnInfo =
        spawnInfos.find(({ spec }) => spec.form === form) ?? spawnInfos.at(0)!

    const eggGroups = bs.eggGroups
      .map(eggGroup => i18next.t(`egg.${eggGroup.toLowerCase()}`))
      .join(', ')
    const eggCycles = Number(String((bs.eggCycles + 1) * 255))
    const catchRate = String(bs.catchRate) // PokemonUtil.getCatchRate(bs.catchRate)

    // ####################
    // #  SpawnInfos
    // ####################
    const spawnTimes =
      spawnInfo.condition.times
        ?.map(time => i18next.t(`time.${time.toLowerCase()}`))
        .join(', ') ??
      (species.isLegendary() || EnumForm.fossilPokemons.includes(species)
        ? i18next.t('field.spawn.unknown')!
        : i18next.t('field.spawnTime.any')!)
    let spawnBiomes: string
    if (EnumForm.fossilPokemons.includes(species))
      spawnBiomes = i18next.t('field.spawn.viaFossil')!
    else
      spawnBiomes =
        spawnInfo.condition.stringBiomes
          ?.map(biome => {
            if (biome === 'nether') return 'hell'
            if (
              Object.keys(PokemonUtil.SpawnerConfig.biomeCategories).includes(
                biome
              )
            ) {
              const biomes = PokemonUtil.SpawnerConfig.biomeCategories[biome]!

              return biomes
              // return (
              //   biomes
              //     // .filter(
              //     //   biome =>
              //     //     biome.startsWith('minecraft:') || biome.startsWith('ultra_')
              //     // )
              //     .map(biome =>
              //       biome.includes(':')
              //         ? biome.replace(/^[^:]+/, '').substring(1)
              //         : biome
              //     )
              // )
            }

            return biome
          })
          .flat()
          .map(biome => {
            if (biome.includes(':')) {
              return biome.replace(/^[^:]+/, '').substring(1)
            }

            return biome
          })
          .map(biome => i18next.t(`Biome:${biome}`, ''))
          .filter(Boolean)
          .join(', ') ?? i18next.t('field.spawn.unknown')!

    // ####################
    // #  SpawnInfos Meta
    // ####################
    const spawnMetadatas = [] as string[]
    const {
      minX,
      minY,
      minZ,
      maxX,
      maxY,
      maxZ,
      weathers,
      maxLightLevel,
      neededNearbyBlocks
    } = spawnInfo.condition
    if (minX) spawnMetadatas.push(`X ${minX} 이상`)
    if (minY) spawnMetadatas.push(`Y ${minY} 이상`)
    if (minZ) spawnMetadatas.push(`Z ${minZ} 이상`)
    if (maxX) spawnMetadatas.push(`X ${maxX} 이하`)
    if (maxY) spawnMetadatas.push(`Y ${maxY} 이하`)
    if (maxZ) spawnMetadatas.push(`Z ${maxZ} 이하`)
    if (weathers)
      weathers.forEach(weather => {
        spawnMetadatas.push(i18next.t(`weather.${weather.toLowerCase()}`))
      })
    if (maxLightLevel) spawnMetadatas.push(`밝기 ${maxLightLevel} 이하`)
    if (neededNearbyBlocks) {
      neededNearbyBlocks.forEach(block => {
        const blockName = i18next.t(`Item:${block}`)
        const blockNameWithPost = getPostPosition(blockName, '이/가')

        spawnMetadatas.push(`근처에 ${blockNameWithPost} 존재`)
      })
    }

    // ####################
    // #  Stats
    // ####################
    const { HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed } =
      bs.stats

    const stats = [HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed]
      .map(stat => String(stat).padStart(3))
      .join(' ')
    const totalStats = String(
      Object.values(bs.stats).reduce((prev, curr) => prev + curr, 0)
    )
      .padStart(4)
      .padEnd(5)

    const evolutionSet = new Set<string>()
    const evolutions = PokemonUtil.getEvolution(species)
    evolutions
      .map(evolution => `# ${evolution.join(' ━➔ ')}`)
      .forEach(evolutionSet.add, evolutionSet)
    const evolutionSpec = PokemonUtil.getEvolutionSpec(species, form)

    let hiddenAbility = ''
    const isInlineEmbedField = spawnBiomes.length < 25 ? true : false

    // ####################
    // #  Cleanup
    // ####################
    embed
      .setAuthor(
        `${pokemonNamePrefix}${pokemonName}${pokemonNameSuffix}(#${species.getNationalPokedexNumber()})`,
        PokemonUtil.getSpriteUri(species, form)
      )
      .setThumbnail(PokemonUtil.getThumbnailUri(species, form))
      .setDescription(
        i18next.t(`Pixelmon:${species.getName().toLowerCase()}.description`) +
          '\n\u200b'
      )
      .addField(
        ':crossed_swords: ' + i18next.t('field.type'),
        bs.types
          .map(type => i18next.t(`type.${type.toLowerCase()}`))
          .join(', '),
        true
      )
      .addField(
        ':shield: ' + i18next.t('field.ability'),
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
        PokemonUtil.IntegerFormatter.format(eggCycles),
        true
      )
      .addField(
        ':crystal_ball: ' + i18next.t('field.catchRate'),
        catchRate,
        true
      )
      .addField(':hourglass: ' + i18next.t('field.spawnTime'), spawnTimes, true)
      .addField(
        ':mushroom: ' + i18next.t('field.spawnBiome'),
        spawnBiomes,
        isInlineEmbedField
      )
    if (isInlineEmbedField) {
      embed.addField('\u200b', '\u200b', true)
    }

    if (spawnMetadatas.length > 0) {
      embed.addField(
        ':mount_fuji: ' + i18next.t('field.spawnCondition'),
        '`' + spawnMetadatas.join(' / ') + '`'
      )
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

    if (evolutionSet.size > 0) {
      embed.addField(
        ':whale: ' + i18next.t('field.evolutionEntity'),
        [
          '```md',
          [...evolutionSet]
            .filter(evolutionPhase => evolutionPhase.includes('━➔'))
            .join('\n'),
          '```'
        ].join('\n')
      )
    }

    if (evolutionSpec) {
      embed.addField(
        ':sparkles: ' + i18next.t('field.evolution'),
        ['```cs', `# ${evolutionSpec}`, '```'].join('\n')
      )
    }

    // Easter-egg
    if (species.getName() === 'MissingNo') {
      embed
        .setThumbnail(undefined as never)
        .setDescription(
          [
            'Thank you for using the Hakase Pokedex bot.',
            '**Created & Maintained by** <@!247351691077222401>, We are welcome DM whatever anything.',
            '',
            `포켓몬 도감봇 <@!847264173079134248>(을)를 사용해 주셔서 고마워요!`,
            '<@!247351691077222401>(이)가 만들고 관리 중이에요. 궁금한 점이 있다면 DM 보내주세요.'
          ].join('\n')
        )
        .setFields([])
    } else if (species === EnumSpecies.Floette && form === 5) {
      embed.setThumbnail(thumbImageOverrideSet.floetteAz)
    }

    PokemonUtil.sharedRandInt = -1

    return { components, embed }
  }

  private static getRegionalNamespace(form: number): 'galar' | 'alola' | '' {
    switch (form) {
      case 2:
        return 'galar'
      case 1:
        return 'alola'
      default:
        return ''
    }
  }
}
