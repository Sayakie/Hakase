/**
 * @fileoverview Represents immutable constatns collection
 * @author Sayakie <sayakie@kakao.com>
 */

import { Constants } from 'discord.js'
import { toUpperCase } from 'io/github/sayakie/hakase/util/ArrayUtil.mjs'
import { createEnum } from 'io/github/sayakie/hakase/util/function.mjs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
export const LogDirectory = join(RootDirectory, 'logs')
export const ConfigDirectory = join(RootDirectory, 'config')
export const DataDirectory = join(RootDirectory, 'data')
export const LocaleDirectory = join(RootDirectory, 'locales')

export const ClientStatus = createEnum(
  toUpperCase(['Initializing', 'Initialized', 'Ready', 'Deferred', 'Destroyed'])
)

export const enum FormFlags {
  ExposeMeta = 0x1,
  FakeForm = 0x2,
  PinToPrefix = 0x4
}

// export const FormFlag = keyMirror(['ExposeMeta', 'FakeForm', 'PinToPrefix'])
