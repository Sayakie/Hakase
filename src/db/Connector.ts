import type { Database } from 'better-sqlite3'
import sqlite3 from 'better-sqlite3'
import { join } from 'node:path'

import { ConfigDirectory } from '@/utils/Constants.js'

let connector: Database | null = null
export function getConnector(): Database {
  if (connector === null) {
    throw new ReferenceError('Could not find any connector.')
  }

  return connector
}

export async function setup(): Promise<Database> {
  return new Promise((resolve, reject) => {
    try {
      if (connector !== null) {
        throw new ReferenceError('Connector already initialised!')
      }

      connector = sqlite3(join(ConfigDirectory, 'hakase.db'), {
        verbose: (...args: unknown[]) =>
          console.info(...args.map(String.prototype.trim.bind(args)))
      })
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
      resolve(connector)
    } catch (e) {
      reject(`There was an error while setting database up: ${e}`)
    }
  })
}
