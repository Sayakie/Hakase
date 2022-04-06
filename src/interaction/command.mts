import type { SlashCommandBuilder } from '@discordjs/builders'
import { REST } from '@discordjs/rest'
import type { Snowflake } from 'discord.js'
import { Routes } from 'discord-api-types/v9'
import type { Client } from 'io/github/sayakie/hakase/Client.mjs'
import { checkState } from 'io/github/sayakie/hakase/util/verify.mjs'

type CommandData =
  | Partial<SlashCommandBuilder> & Pick<SlashCommandBuilder, `toJSON`>

const { DISCORD_API_VERSION = `9` } = process.env
export async function createCommand(
  client: Client,
  guildId: Snowflake,
  data: CommandData | CommandData[]
): Promise<void> {
  checkState(client.isReady(), `Client is not ready`)
  checkState(
    typeof DISCORD_API_VERSION === `string`,
    `Invalid DISCORD_API_VERSION`
  )

  const rest = new REST({ version: DISCORD_API_VERSION }).setToken(client.token)
  await rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
    body: Array.isArray(data) ? data.map(it => it.toJSON()) : [data.toJSON()]
  })
}

export async function deleteCommand(
  client: Client,
  guildId: Snowflake,
  data: CommandData | CommandData[]
): Promise<void> {
  checkState(client.isReady(), `Client is not ready`)
  checkState(
    typeof DISCORD_API_VERSION === `string`,
    `Invalid DISCORD_API_VERSION`
  )

  const rest = new REST({ version: DISCORD_API_VERSION }).setToken(client.token)
  await rest.delete(Routes.applicationGuildCommands(client.user.id, guildId), {
    body: Array.isArray(data) ? data.map(it => it.toJSON()) : [data.toJSON()]
  })
}
