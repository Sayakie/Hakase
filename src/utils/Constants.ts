/**
 * @fileoverview Represents immutable constants collection
 * @author Sayakie <sayakie@kakao.com>
 */

import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { toUpperCase } from '@/utils/ArrayUtil.js'
import {
  loadAllBaseStats,
  loadAllDrops,
  loadAllForms,
  loadAllSpawnSets,
  loadSpawnerConfig
} from '@/utils/PokemonUtil.js'
import { createEnum, keyMirror } from '@/utils/Util.js'

export const SourceDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../'
)

export const RootDirectory = resolve(SourceDirectory, '../')
export const LogDirectory = join(RootDirectory, 'logs')
export const ConfigDirectory = join(RootDirectory, 'config')
export const DataDirectory = join(RootDirectory, 'data')
export const LocaleDirectory = join(RootDirectory, 'locales')

export const baseStats = await loadAllBaseStats()
export const forms = await loadAllForms()
export const spawnerConfig = await loadSpawnerConfig()
export const spawnSets = await loadAllSpawnSets()
export const pokeDrops = await loadAllDrops()

export const emojis: Record<string, string> = {}

export const ClientStatus = createEnum(
  toUpperCase(['Initializing', 'Initialized', 'Ready', 'Deferred', 'Destroyed'])
)

export const FormFlag = keyMirror(['ExposeMeta', 'FakeForm', 'PinToPrefix'])
