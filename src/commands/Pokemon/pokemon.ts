import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { type ChatInputCommand, RegisterBehavior } from '@sapphire/framework'
import { isNullish } from '@sapphire/utilities'
import type { Locale } from 'discord-api-types/v10'

import { LocalizableCommand } from '#lib/structures/LocalizableCommand.js'

@Mixin<ChatInputCommand.Options>({
  description: `Gets data for the chosen Pokémon.`,
  descriptionLocalizations: {
    ko: `포켓몬 정보를 검색합니다.`,
    th: `ได้รับข้อมูลสำหรับโปเกม่อนที่เลือกไว้`
  },
  nameLocalizations: {
    ko: `포켓몬`,
    th: `โปเกมอน`
  }
})
export class SlashCommand extends LocalizableCommand {
  public override registerApplicationCommands(registry: ChatInputCommand.Registry): void {
    registry.registerChatInputCommand(
      builder =>
        builder
          .setName(this.name)
          .setNameLocalizations(this.nameLocalizations)
          .setDescription(this.description)
          .setDescriptionLocalizations(this.descriptionLocalizations)
          .addStringOption(option =>
            option
              .setName(`pokemon`)
              .setDescription(`The name of the Pokémon which you want to get information.`)
              .setNameLocalizations({
                //
                ko: `이름`,
                th: `โปเกมอน`
              })
              .setDescriptionLocalizations({
                ko: `정보를 검색할 포켓몬 이름`,
                th: `ชื่อของโปเกม่อนที่คุณต้องการรับข้อมูล`
              })
              .setRequired(true)
              .setAutocomplete(true)
          ),
      {
        behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
        guildIds: [`933262986720706600`, `740965554713657414`],
        idHints: [`994423768481017957`]
      }
    )
  }

  public override async chatInputRun(interaction: ChatInputCommand.Interaction): Promise<void> {
    await interaction.deferReply()

    const spec = interaction.options.getString(`pokemon`, true)

    const pokemon = await this.container.pokemon.getPokemon(spec, {
      locale: interaction.locale as `${Locale}`
    })

    if (isNullish(pokemon)) {
      // TODO: Suggest pokemon from entries
      await interaction.editReply({
        content: 'Could not find any pokemons like thest name: ' + spec
      })

      return
    }

    await interaction.editReply({
      content: `You just typed: ${pokemon.species.translation().with('ko')}`
    })
  }
}
