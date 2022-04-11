import type { EmbedFieldData } from 'discord.js'
import { MessageActionRow, MessageButton, MessageEmbed } from 'discord.js'
import { MessageButtonStyles } from 'discord.js/typings/enums'
import { ButtonStyle } from 'discord-api-types/v10'
import i18next from 'i18next'
import mergeOptions from 'merge-options'

import type { SpawnerConfig, SpawnInfo, Stat } from '../../@types.js'
import { ArrayUtil, Species } from '../../index.js'
import { formLink } from '../DataManager.js'
import { IllegalArgumentException } from '../exception.js'
import { getImageUri, getSpriteUri } from '../function.js'

const numericFormatter = new Intl.NumberFormat('en-IN')

export function generateBaseEmbed({
  stat,
  spawnInfos,
  spawnerConfig,
  variant = 0
}: {
  stat: Stat
  spawnInfos: SpawnInfo[]
  spawnerConfig: SpawnerConfig
  variant?: number
}): {
  components: MessageActionRow[]
  embeds: MessageEmbed[]
} {
  const [embeds, components]: [MessageEmbed[], MessageActionRow[]] = [[], []]

  const species = Species.getFromName(stat.pixelmonName)
  if (!species) {
    throw new IllegalArgumentException(
      `No species found for ${stat.pixelmonName}`
    )
  }

  if (formLink.has(species)) {
    const forms = formLink.get(species)!
    const currentForm = ArrayUtil.getRandomElement(
      forms.filter(({ form }) => form === variant)
    )
    const otherForms = forms.filter(({ form }) => form !== variant)

    // Add button for other forms
    if (otherForms.length > 0) {
      // Discord doesn't allow more than 5 buttons per.
      const rows = Math.ceil(otherForms.length / 5)

      if (rows > 1) {
        // TODO
      } else {
        const row = new MessageActionRow()

        otherForms.forEach(formBelongTo => {
          const speciesName =
            formBelongTo.isDefaultForm() ||
            formBelongTo.isMegaForm() ||
            formBelongTo.isAlolan() ||
            formBelongTo.isGalarian() ||
            formBelongTo.isHisuian()
              ? `Generic`
              : formBelongTo.species.getName()
          const formName = formBelongTo.name
          const label = i18next.t(
            `Pixelmon:${speciesName.toLowerCase()}.form.${formName.toLowerCase()}`
          )
          if (
            row.components
              .filter((it): it is MessageButton => it instanceof MessageButton)
              .some(({ label: labelToCompare }) => labelToCompare === label)
          ) {
            return
          }

          const button = new MessageButton()
            .setStyle(`SUCCESS`)
            .setCustomId(
              `Pixelmon-Hakase.${species.getName().toLowerCase()}.form.${
                formBelongTo.form
              }`
            )
            .setLabel(label)

          row.addComponents(button)
        })

        components.push(row)
      }
    }
  }

  let spawnInfo: SpawnInfo
  const spawnInfoSpecs = spawnInfos.filter(
    ({ spec: { form } }) => (form ?? variant) === variant
  )
  if (spawnInfoSpecs.length > 1) {
    spawnInfo = spawnInfoSpecs.reduce(
      (acc, curr) => mergeOptions({ concatArray: true }, acc, curr),
      {} as SpawnInfo
    )
  } else {
    spawnInfo = spawnInfoSpecs.at(0)!
  }
  const eggGroups = stat.eggGroups
    .map(eggGroup => i18next.t(`egg.${eggGroup.toLowerCase()}`))
    .join(`, `)
  const eggCycles = (stat.eggCycles + 1) * 255
  const catchRate = String(stat.catchRate)

  // ##########
  // # Spawn times, biomes
  // ##########
  const spawnTimes = [
    ...new Set<string>(
      spawnInfo.condition.times?.map(time =>
        i18next.t(`time.${time.toLowerCase()}`)
      ) ?? [`Unknown`]
    )
  ].join(`, `)
  const spawnBiomes =
    spawnInfo.condition.stringBiomes
      ?.map(biome => {
        if (Object.keys(spawnerConfig.biomeCategories).includes(biome)) {
          return spawnerConfig.biomeCategories[biome]!
        }

        return [biome]
      })
      .flatMap(biomes =>
        biomes.map(biome => {
          if (biome.includes(':')) return biome.replace(/^[^:]+./, '')
          return biome
        })
      )
      .map(biome => i18next.t(`Biome:${biome}`, ``))
      .filter(Boolean)
      .join(', ') ?? `Unknown`

  // ##########
  // # Stats
  // ##########
  const { HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed } =
    stat.stats

  const stats = [HP, Attack, Defence, SpecialAttack, SpecialDefence, Speed]
    .map(stat => stat.toString().padStart(3))
    .join(` `)
  const totalStats = Object.values(stat.stats)
    .reduce((acc, curr) => acc + curr, 0)
    .toString()
    .padStart(4)
    .padEnd(5)
  const inlineField: EmbedFieldData =
    spawnBiomes.length < 25
      ? {
          inline: true,
          name: `\u200b`,
          value: `\u200b`
        }
      : {
          inline: false,
          name: `\u200b`,
          value: `\u200b`
        }
  let hiddenAbilityField: EmbedFieldData = {
    inline: true,
    name: `\u200b`,
    value: `\u200b`
  }

  const embed = new MessageEmbed()
    .setAuthor({
      iconURL: getSpriteUri(species),
      name: `${species.getLocalizedName()}(#${species
        .getNationalPokedex()
        .asString()})`
    })
    .setThumbnail(getImageUri(species))
    .setDescription(
      i18next.t(`Pixelmon:${species.getName().toLowerCase()}.description`) +
        `\n\u200b`
    )
    .addField(
      `:crossed_swords: ${i18next.t(`field.type`)}`,
      stat.types
        .map(type => i18next.t(`type.${type.toLowerCase()}`))
        .join(`, `),
      true
    )
    .addField(
      `:shield: ${i18next.t(`field.ability`)}`,
      stat.abilities
        .map((ability, index) => {
          if (!ability) return null
          else if ([`BattleArmor`, `ShellArmor`].includes(ability)) {
            ability = ability.replaceAll(`Armor`, `Armour`)
          }

          ability = i18next.t(
            `Ability:${ability.replace(/\s/g, '').toLowerCase()}.name`
          )!

          if (index == 2) {
            hiddenAbilityField = {
              inline: true,
              name: `:alembic: ${i18next.t(`type.ha`)}`,
              value: ability
            }
            return null
          }

          return ability
        })
        .filter(Boolean)
        .join(', '),
      true
    )
    .addFields(hiddenAbilityField)
    .addField(`:egg: ${i18next.t(`field.eggGroup`)}`, eggGroups, true)
    .addField(
      `:hatching_chick: ${i18next.t(`field.hatchTime`)}`,
      numericFormatter.format(eggCycles),
      true
    )
    .addField(`:crystal_ball: ${i18next.t(`field.catchRate`)}`, catchRate, true)
    .addField(`:hourglass: ${i18next.t(`field.spawnTime`)}`, spawnTimes, true)
    .addField(
      `:mushroom: ${i18next.t(`field.spawnBiome`)}`,
      spawnBiomes,
      inlineField.inline
    )

  if (inlineField.inline) {
    embed.addFields(inlineField)
  }

  embed.addField(
    `:hibiscus: ${i18next.t(`field.stats`)}`,
    '```ml\n' +
      `+-------------------------+-------+\n` +
      `|  HP Atk Def SpA SpD Spe | Total |\n` +
      `+-------------------------+-------+\n` +
      `| ${stats} | ${totalStats} |\n` +
      `+-------------------------+-------+\n` +
      '```',
    true
  )

  embeds.push(embed)

  return { components, embeds }
}
