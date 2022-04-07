import { SlashCommandBuilder } from '@discordjs/builders'

export const searchCommand = new SlashCommandBuilder()
  .setName(`search`)
  .setDescription(`Searches for a Pokémon.`)
  .setDefaultPermission(true)
  .addStringOption(option =>
    option
      .setName(`pokemon`)
      .setDescription(`The name of the Pokémon to search for.`)
      .setRequired(true)
  )
  .addStringOption(option =>
    option
      .setName(`type`)
      .setDescription(`The type of the Pokémon to search for. (optional)`)
      .setRequired(false)
  )
