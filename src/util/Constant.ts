/**
 * @fileoverview Represents immutable constants collection
 * @author Sayakie <sayakie@kakao.com>
 */

import { Constants } from 'discord.js'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import type { SpawnInfo } from '../@types.js'
import { ArrayUtil, Util } from '../index.js'

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

export const defaultSpawnInfos: [SpawnInfo] = [
  {
    condition: {},
    maxLevel: -1,
    minLevel: -1,
    rarity: -1,
    spec: {
      name: `MissingNo`
    },
    stringLocationTypes: [],
    typeID: `pokemon`
  }
]

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
  // Core presents the base version of the Pixelmon.
  core = `core`,

  // Latest follows the latest version of this.
  latest = `8.3.8`,

  // The versions below are synced with the Pixelmon version.
  v838 = `8.3.8`
}

// @ts-expect-error For better type hinting. It is intended to be used as a constant.
export const VersionChoice: [
  {
    [V in keyof typeof Version]: [V, typeof Version[V]]
  }[Exclude<keyof typeof Version, `core`>]
] = Object.entries(Version).filter(([, version]) => version !== Version.core)

export const enum FormFlag {
  DefaultForm = 1 << 0,
  AlterForm = 1 << 1,
  UnreleasedForm = 1 << 2,
  GenderlessForm = 1 << 3,
  GenderForm = 1 << 4,
  MegaForm = 1 << 5,
  AlolanForm = 1 << 6,
  GalarianForm = 1 << 7,
  HisuianForm = 1 << 8,
  UnownForm = 1 << 9,
  DisplayFormName = 1 << 10
}
