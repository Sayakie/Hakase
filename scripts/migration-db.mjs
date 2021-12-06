import sqlite3 from 'better-sqlite3'
import { readFileSync } from 'fs'

const targetJson = JSON.parse(readFileSync('./config/guilds.json'))
const connector = sqlite3('./config/hakase.db', { verbose: console.log })

connector.exec(`
  CREATE TABLE IF NOT EXISTS Guild (
    id        TEXT PRIMARY KEY,
    prefix    TEXT,
    locale    TEXT,
    tier      INTEGER
  );
  CREATE TABLE IF NOT EXISTS Channel (
    id        TEXT PRIMARY KEY,
    guildId   TEXT
  );
`)

targetJson.cache.forEach(([guildIdRaw, guildConfigRaw]) => {
  const guildId = guildIdRaw.replace(/^keyv:/, '')
  const { value } = guildConfigRaw
  /** @type {{ channels: string[], locale: string, prefix: string, version: string }} */
  const guildConfig = JSON.parse(value).value

  const idx = connector
    .prepare('SELECT id FROM Guild WHERE id = ?')
    .get(guildId)
  if (idx) return

  connector
    .prepare(`INSERT INTO Guild VALUES (@id, @prefix, @locale, @tier)`)
    .run({
      id: guildId,
      locale: guildConfig.locale,
      prefix: '!',
      tier: 1
    })
})
