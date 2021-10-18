/**
 * @fileoverview Represents immutable constants collection
 * @author Sayakie <sayakie@kakao.com>
 */

import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { ArrayUtil } from '@/utils/ArrayUtil.js'
import { Util } from '@/utils/Util.js'

export const ClientStatus = Util.createEnum(
  ArrayUtil.toUpperCase([
    'Initializing',
    'Initialized',
    'Ready',
    'Deferred',
    'Destroyed'
  ])
)

export const FormFlag = Util.keyMirror([
  'ExposeMeta',
  'FakeForm',
  'PinToPrefix'
])

export const SourceDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../'
)

export const RootDirectory = resolve(SourceDirectory, '../')
export const LogDirectory = join(RootDirectory, 'logs')
export const ConfigDirectory = join(RootDirectory, 'config')
export const DataDirectory = join(RootDirectory, 'data')
export const LocaleDirectory = join(RootDirectory, 'locales')
