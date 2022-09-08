import type { Form, Stat } from '@internal/pixelmon'
import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { green } from 'colorette'
import mergeOptions from 'merge-options'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Directories, ResourceIdentifiers } from '#lib/utils/constants.js'

function prepareStat(stat: Stat): Stat {
  if (Object.keys(stat.forms).length <= 0) {
    return stat
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { moves: unused, ...baseForm } = mergeOptions<Form>({}, stat.forms.at(0)!)

  stat.forms.forEach((form, i) => {
    const preparedForm = mergeOptions<Form>(baseForm, form)

    Reflect.set(stat.forms, i, preparedForm)
  })

  return stat
}

export async function loadAllStats(): Promise<ReadonlyMap<string, Stat>>
export async function loadAllStats(
  targetDir: string = join(fileURLToPath(Directories.Data), ResourceIdentifiers.PIXELMON, `stats`)
): Promise<ReadonlyMap<string, Stat>> {
  const stats = new Map<string, Stat>()

  const statsFileNames = await readdir(targetDir)

  for await (const statFileName of statsFileNames) {
    const statFilePath = join(targetDir, statFileName)

    const ext = extname(statFileName)

    if (ext !== `.json`) {
      console.debug(`[StatLoader] Skip ${green(statFileName)} because could not transform to JSON.`)
      continue
    }

    const [dex, name] = statFileName.replace(ext, ``).split(`_`)

    const result = await Result.fromAsync(async () => await readFile(statFilePath))

    if (result.isErr()) {
      console.error(`[StatLoader] Failed to fetch data: ${name} (#${dex})`)
      console.error(`  Caused:` + result.unwrapErr())
      continue
    }

    const bakedStat = JSON.parse(result.unwrap().toString())

    const stat = prepareStat(bakedStat)

    stats.set(name, stat)
  }

  return stats
}
