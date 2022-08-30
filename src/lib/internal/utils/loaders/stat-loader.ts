import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { green } from 'colorette'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Directories, ResourceIdentifiers } from '#lib/utils/constants.js'

export async function loadAllStats(): Promise<ReadonlyMap<string, string>>
export async function loadAllStats(
  targetDir: string = join(fileURLToPath(Directories.Data), ResourceIdentifiers.PIXELMON, `stats`)
): Promise<ReadonlyMap<string, string>> {
  const stats = new Map<string, string>()

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
      container.logger.error(`[StatLoader] Failed to fetch data: ${name} (#${dex})`)
      container.logger.error(`  Caused:` + result.unwrapErr())
      continue
    }

    const stat = JSON.parse(result.unwrap().toString())

    stats.set(name, stat)
  }

  return stats
}
