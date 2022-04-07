import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { DataDirectory } from '../Constant.mjs'

export interface SpawnerConfig {
  blockCategories: Record<string, string[]>
  biomeCategories: Record<string, string[]>
}

export async function loadSpawnerConfig(
  configFile = join(
    DataDirectory,
    `pixelmon`,
    `spawning`,
    `BetterSpawnerConfig.json`
  )
): Promise<SpawnerConfig> {
  const spawnerConfigBuf = await readFile(configFile)
  const spawnerConfig = JSON.parse(spawnerConfigBuf.toString())

  return spawnerConfig
}
