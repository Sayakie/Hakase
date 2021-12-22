import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import i18next from 'i18next'
import { correctPostpositions } from 'korean-regexp'
import mergeOptions from 'merge-options'
import type { Options as WalkOptions } from 'walk-sync'
import walkSync from 'walk-sync'

import { EnumForm } from '@/enums/EnumForm.js'
import { EnumSpecies } from '@/enums/EnumSpecies.js'
import { ArrayUtil } from '@/utils/ArrayUtil.js'
import { pokeDrops } from '@/utils/Constants.js'
import {
  getEvolutionSpec,
  getPokemonName,
  getSpriteUri,
  getThumbnailUri,
  setSharedRandInt
} from '@/utils/PokemonUtil.js'

const numericFormatter = new Intl.NumberFormat('en-IN')

interface TemplateParameters {
  bs: BaseStats
  spawnInfos: SpawnInfo[]
  spawnerConfig: SpawnerConfig
  variant?: number
}

export const walkDefaultOptions: WalkOptions = {
  directories: false,
  globs: ['**/*.+(ts|js)'],
  ignore: ['test/**/*', '*.(test|module).+(ts|js)'],
  includeBasePath: true
}

export function walk(
  directory: string,
  walkOptions?: WalkOptions
): ReadonlyArray<string> {
  walkOptions = mergeOptions(walkDefaultOptions, walkOptions)

  return walkSync(directory, walkOptions)
}

export function getPostPosition(pos: string): string {
  const isNumericPost = /(?<target>\d)(?<f1>.)\((?<f2>.)\)/g
  // eslint-disable-next-line prefer-const
  let { target, f1, f2 } = (isNumericPost.exec(pos)?.groups ?? {
    f1: ``,
    f2: ``,
    target: ``
  }) as {
    target: string
    f1: string
    f2: string
  }
  if (f1 === '으' && f2 === '로') {
    f1 += f2
  }

  if (target) {
    if (target === '0' || target === '3' || target === '6') {
      pos = pos.replace(isNumericPost, target + f1)
    } else {
      pos = pos.replace(isNumericPost, target + f2)
    }
  }

  return correctPostpositions(pos)
}

/**
 * Constructs an enumeration with keys equal to their value.
 *
 * @param {string[]} keys An array of keys
 * @returns {Record<string, string>} An enumeration with keys equal to their value
 */
export function keyMirror<T extends string>(
  keys: T[] | ReadonlyArray<T>
): { readonly [P in T]: P }
export function keyMirror(
  keys: string[] | ReadonlyArray<string>
): Record<string, string> {
  return (keys as string[]).reduce((mirror, key) => {
    mirror[key] = key

    return mirror
  }, {} as Record<string, string>)
}

export function createEnum<T extends ReadonlyArray<string>>(
  keys: [...T] | Readonly<T>
): {
  [V in T[number]]: {
    [K in Exclude<keyof T, keyof unknown[]>]: V extends T[K] ? K : never
  }[Exclude<keyof T, keyof unknown[]>]
} & {
  [K in Exclude<keyof T, keyof unknown[]>]: T[K]
} {
  return (keys as T).reduce((mirror, key, index) => {
    mirror[key] = index
    mirror[index] = key

    return mirror
  }, {} as any) // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function createFlag<T extends string>(keys: T[]): Record<T, number> {
  return (keys as string[]).reduce((mirror, key, index) => {
    mirror[key] = 1 << index

    return mirror
  }, {} as Record<string, number>)
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

  const pokemonName = getPokemonName(bs, variant)

  if (EnumForm.formList.has(species)) {
    const forms = EnumForm.formList.get(species)!
    const currentForm = ArrayUtil.getRandomElement(
      forms.filter(({ form }) => form === variant)
    )
    const otherFormList = forms.filter(({ form }) => form !== variant)

    setSharedRandInt(forms.indexOf(currentForm))

    // Add some button for other forms
    if (otherFormList.length > 0) {
      // Due to Discord only allows up to 5 buttons, we need to split the list
      const rows = Math.ceil(otherFormList.length / 5)

      if (rows > 1) {
        /** TODO */
      } else {
        const row = new MessageActionRow()

        otherFormList.forEach(
          ({ form: variant, species: fakeSpecies, spriteSuffix, $memo }) => {
            const formName = $memo ?? spriteSuffix.replace(/^-/, '')
            const label = i18next.t(
              `Pixelmon:${fakeSpecies.toLowerCase()}.form.${formName}`
            )

            // Make sure customId should be unique
            if (
              row.components
                .filter(
                  (it): it is MessageButton => it instanceof MessageButton
                )
                .some(
                  ({ label: labelCompare, customId }) =>
                    customId?.endsWith(`form.${variant}`) ||
                    labelCompare === label
                )
            ) {
              return
            }

            const button = new MessageButton()
              .setStyle('SUCCESS')
              .setCustomId(
                `Pixelmon.${species.getName().toLowerCase()}.form.${variant}`
              )
              .setLabel(label)

            row.addComponents(button)
          }
        )

        components.push(row)
        // Array.from({ length: rows }).forEach((_, i) => {
        //   const row = new MessageActionRow()

        //   row.addComponents(
        //     otherFormList
        //       .slice(i * 5, i * 5 + 5)
        //       .map(
        //         ({
        //           form: variant,
        //           species: fakeSpecies,
        //           spriteSuffix,
        //           $memo
        //         }) => {
        //           const formName = $memo ?? spriteSuffix.replace(/^-/, '')
        //           const label = i18next.t(
        //             `Pixelmon:${fakeSpecies.toLowerCase()}.form.${formName}`
        //           )

        //           const button = new MessageButton()
        //             .setStyle('SUCCESS')
        //             .setCustomId(
        //               `Pixelmon.${species
        //                 .getName()
        //                 .toLowerCase()}.form.${variant}`
        //             )
        //             .setLabel(label)

        //           return button
        //         }
        //       )
        //   )

        //   components.push(row)
        // })
      }
    }
  }

  // Add details button
  const hasEvolution = getEvolutionSpec(species, variant) !== null
  const hasMove = Object.keys(bs)
    .filter(key => key.includes(`Moves`))
    .some(key => (bs[key as `trMoves`]?.length || 0) > 0)
  const hasDrop = pokeDrops.some(
    ({ pokemon, form }) =>
      pokemon === species.getName() && (form ?? 0) === variant
  )
  let data = ``
  if (hasEvolution) data += `.Evolution`
  if (hasMove) data += `` // `.Move`
  if (hasDrop) data += `.PokeDrop`

  if (data) {
    const button = new MessageButton()
      .setStyle('SECONDARY')
      .setCustomId(
        `Pixelmon.${species.getName().toLowerCase()}.details.${variant}${data}`
      )
      .setLabel(i18next.t('field.button.details'))

    if ((components.at(0)?.components.length ?? Number.MAX_VALUE) < 5) {
      components.at(0)?.addComponents([button])
    } else {
      components.push(new MessageActionRow().addComponents([button]))
    }
  }

  let spawnInfo: SpawnInfo
  const spawnInfoSpecs = spawnInfos.filter(
    ({ spec: { form } }) => (form ?? variant) === variant
  )
  if (spawnInfoSpecs.length > 1) {
    spawnInfo = spawnInfoSpecs.reduce(
      (acc, curr) => mergeOptions.call({ concatArrays: true }, acc, curr),
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

  const spawnTimes = [
    ...new Set<string>(
      spawnInfo.condition.times?.map(time =>
        i18next.t(`time.${time.toLowerCase()}`)
      ) ?? [i18next.t(`field.spawn.unknown`)]
    )
  ].join(', ')

  const spawnBiomes =
    spawnInfo.condition.stringBiomes
      ?.map(biome => {
        // Hotfix. Should be on the top of this handler
        if (biome === 'nether') return 'hell'
        if (Object.keys(spawnerConfig.biomeCategories).includes(biome)) {
          return spawnerConfig.biomeCategories[biome]!
        }

        return biome
      })
      .flatMap(biomes => {
        function splitNamespaceIfExists(biome: string): string {
          if (biome.includes(':')) return biome.replace(/^[^:]+./, '')
          return biome
        }
        if (Array.isArray(biomes)) {
          return biomes.map(splitNamespaceIfExists)
        } else {
          return splitNamespaceIfExists(biomes)
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
      `${pokemonName}(#${species.getNationalPokedexNumber()})`,
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
      ':shield: ' + i18next.t('field.ability'),
      bs.abilities
        .map((ability, index) => {
          if (!ability) return null
          else if ([`BattleArmor`, `ShellArmor`].includes(ability)) {
            ability = ability.replaceAll(`Armor`, `Armour`)
          }

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
