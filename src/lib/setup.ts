/* eslint-disable import/first */
process.env.NODE_ENV ??= `development`

import '@sapphire/plugin-i18next/register'
import '@frutbits/pino-logger/register'
import '#lib/config.js'

import { createColors } from 'colorette'
import { inspect } from 'node:util'

import { injectStats } from '#lib/inject/statInjector.js'

inspect.defaultOptions.depth = 2

createColors({ useColor: true })

await injectStats()
