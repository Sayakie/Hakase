import {
  loadAllForms,
  loadAllSpawnSets,
  loadAllStats,
  loadSpawnerConfig
} from './loader.mjs'

export const formLink = await loadAllForms()
export const spawnerConfig = await loadSpawnerConfig()
export const spawnSetMap = await loadAllSpawnSets()
export const statLink = await loadAllStats()
