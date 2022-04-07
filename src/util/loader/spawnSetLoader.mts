import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { SpawnInfo, SpawnSet } from '../../@types.mjs'
import { DataDirectory } from '../Constant.mjs'
import { walk } from '../function.mjs'

export type SpawnSetMap = ReadonlyMap<string, SpawnInfo[]>
export async function loadAllSpawnSets(
  paths = [
    join(DataDirectory, `pixelmon`, `spawning`, `standard`),
    join(DataDirectory, `pixelmon`, `spawning`, `legendaries`)
  ]
): Promise<SpawnSetMap> {
  const spawnSetMap = new Map()
  const spawnSetFiles = paths
    .map(path => walk(path, { globs: [`**/*.json`] }))
    .flat()

  for await (const spawnSetFile of spawnSetFiles) {
    const spawnSetBuf = await readFile(spawnSetFile)
    const spawnSet: SpawnSet = JSON.parse(spawnSetBuf.toString())

    spawnSetMap.set(spawnSet.id, spawnSet.spawnInfos)
  }

  return spawnSetMap
}
