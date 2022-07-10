import { ApplyOptions as Mixin } from '@sapphire/decorators'
import type { ChatInputCommand } from '@sapphire/framework'
import { RegisterBehavior } from '@sapphire/framework'

import { LocalizableCommand } from '../../lib/structures/LocalizableCommand.js'

@Mixin<ChatInputCommand.Options>({
  description: `Gets data for the chosen Pokémon.`,
  descriptionLocalizations: {
    ko: `포켓몬 정보를 검색합니다.`
  },
  nameLocalizations: {
    ko: `포켓몬`
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
              .setNameLocalizations({ ko: `이름` })
              .setDescriptionLocalizations({
                ko: `정보를 검색할 포켓몬 이름`
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

    const it = interaction.options.getString(`pokemon`, true)
    console.log(it)

    await interaction.deleteReply()
    await interaction.followUp(`unknown`)
  }
}
