import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

import { Directories, ResourceIdentifiers } from '../../../utils/constants.js'

export async function loadAllStats(): Promise<ReadonlyMap<string, string>>
export async function loadAllStats(
  targetDir: string = join(Directories.Data.pathname, ResourceIdentifiers.PIXELMON, `species`)
): Promise<ReadonlyMap<string, string>> {
  const stats = new Map<string, string>()

  const statsFileNames = await readdir(targetDir)

  for await (const statFileName of statsFileNames) {
    const statFilePath = join(targetDir, statFileName)

    const ext = extname(statFileName)

    if (ext !== `.json`) {
      container.logger.debug(`[StatLoader] Skipping ${statFileName} due to is not JSON type.`)
      continue
    }

    const [dex, name] = statFileName.replace(ext, ``).split(`_`)

    const result = await Result.fromAsync(async () => await readFile(statFilePath))

    if (result.isErr()) {
      container.logger.error(
        `[StatLoader] Failed to fetch data corresponding with ${name} (#${dex})`
      )
      container.logger.error(result.unwrapErr())
      continue
    }

    const stat = result.unwrap().toString()

    stats.set(name, stat)
  }

  return stats
}
