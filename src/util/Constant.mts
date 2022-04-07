/**
 * @fileoverview Represents immutable constants collection
 * @author Sayakie <sayakie@kakao.com>
 */

import { Constants } from 'discord.js'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ArrayUtil, Util } from '../index.mjs'
import {
  loadAllForms,
  loadAllSpawnSets,
  loadAllStats,
  loadSpawnerConfig
} from './loader.mjs'

/* eslint-disable @typescript-eslint/naming-convention */
export const Events = {
  ...Constants.Events,
  ...({
    KEEP: 'keep'
  } as const)
} as const
/* eslint-enable @typescript-eslint/naming-convention */

export const SourceDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../'
)

export const RootDirectory = resolve(SourceDirectory, '../')
export const DataDirectory = join(RootDirectory, 'data')

export const formLink = await loadAllForms()
export const spawnerConfig = await loadSpawnerConfig()
export const spawnSetMap = await loadAllSpawnSets()
export const statLink = await loadAllStats()

export const ClientStatus = Util.createEnum(
  ArrayUtil.toUpperCase([
    'Initializing',
    'Initialized',
    'Ready',
    'Deferred',
    'Destroyed'
  ])
)

export enum Version {
  latest = `8.3.8`,
  v838 = `8.3.8`
}

export const VersionChoice: [
  {
    [V in keyof typeof Version]: [V, typeof Version[V]]
  }[keyof typeof Version]
] = Object.entries(Version) as any

export const enum FormFlag {
  DefaultForm = 0x1,
  AlterForm = 0x2,
  UnreleasedForm = 0x4,
  GenderlessForm = 0x8,
  GenderForm = 0x10,
  MegaForm = 0x20,
  AlolanForm = 0x40,
  GalarianForm = 0x80,
  HisuianForm = 0x100,
  UnownForm = 0x200,
  DisplayFormName = 0x400
}
