import { SlashCommandBuilder } from '@discordjs/builders'
import { VersionChoice } from 'io/github/sayakie/hakase/Constant.mjs'

export const versionCommand = new SlashCommandBuilder()
  .setName(`version`)
  .setDescription(`Shows the current version or sets the version to use.`)
  .addStringOption(option =>
    option
      .setName(`version`)
      .setDescription(`List of available versions to use.`)
      .setRequired(true)
      .addChoices(VersionChoice)
  )
