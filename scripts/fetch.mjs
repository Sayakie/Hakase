/**
 * @fileoverview Preprocessor Pixelmon's base stats whose was fetched
 * @author Sayakie <sayakie@kakao.com>
 */

import jsonKeys from '@barreljs/json-keys'
import assert from 'node:assert'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { basename, join } from 'node:path'
import { $ } from 'zx'

$.verbose = false

/** @type {Map<string, number>} */
const statsKeys = new Map()

/** @type {Map<string, Set<string>>} */
const missingKeys = new Map()

const aaa = new Set()

assert(
  process.argv.length >= 3,
  "Expected to receive a path that stores Pixelmon's baseStats."
)

const baseStatsDirectoryPath = process.argv[2]

try {
  const files = await readdir(new URL(baseStatsDirectoryPath, import.meta.url))
  const statsFiles = files.filter(file => file.endsWith('.json'))
  const statsRawData = await Promise.all(
    statsFiles.map(async dex => [
      basename(dex, '.json'),
      await readFile(
        new URL(join(baseStatsDirectoryPath, dex), import.meta.url)
      )
    ])
  )
  const statsData = statsRawData.map(([dex, raw]) => [
    dex,
    JSON.parse(raw.toString())
  ])

  statsData.forEach(([, stats]) => {
    stats.spawnInfos.forEach(spawnInfo => {
      ;(spawnInfo.condition?.stringBiomes ?? []).forEach(key => {
        if (statsKeys.has(key)) statsKeys.set(key, statsKeys.get(key) + 1)
        else statsKeys.set(key, 0)

        // if (key === 'weathers') aaa.add(spawnInfo.condition[key])
        // ;(spawnInfo.condition).forEach(d => aaa.add(d))
      })
    })
  })
  console.log(
    `Following keys is registered:\n  ${Array.from(statsKeys.keys()).join(
      ', '
    )}`
  )

  statsKeys.forEach((value, key) => {
    console.log(key, value)
  })

  console.log(aaa)

  statsData.forEach(([dex, stats]) => {
    statsKeys.forEach(key => {
      stats.spawnInfos.forEach(spawnInfo => {
        if (!spawnInfo[key]) {
          if (missingKeys.has(dex)) missingKeys.get(dex).add(key)
          else {
            const missingKeySet = new Set([key])
            missingKeys.set(dex, missingKeySet)
          }
        }
      })
    })
  })

  // if (missingKeys.size) {
  //   console.log('Missing keys are detected:')
  //   missingKeys.forEach((keySet, dex) =>
  //     console.log(`  ${dex}-${Array.from(keySet).join(', ')}`)
  //   )
  // }
} catch (e) {
  console.error(e)
  process.exitCode = 1
}
