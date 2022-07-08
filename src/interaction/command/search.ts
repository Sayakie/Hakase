import { SlashCommandBuilder } from '@discordjs/builders'

export const searchCommand = new SlashCommandBuilder()
  .setName(`search`)
  .setDescription(`Search a Pokémon.`)
  .setDefaultPermission(true)
  .addStringOption(option =>
    option
      .setName(`pokemon`)
      .setDescription(`The name of a Pokémon to search for.`)
      .setRequired(true)
  )
