import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { isNullish } from '@sapphire/utilities'
import { green } from 'colorette'
import { Locale } from 'discord-api-types/v10'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Directories, ResourceIdentifiers } from '#lib/utils/constants.js'

const pixelmonToDiscordMappings = {
  [`da_da`]: Locale.Danish,
  [`de_de`]: Locale.German,
  [`en_gb`]: Locale.EnglishGB,
  [`en_us`]: Locale.EnglishUS,
  [`es_es`]: Locale.SpanishES,
  // [`es_mx`]: Locale
  // [`fr_ca`]: Locale
  [`fr_fr`]: Locale.French,
  // [`he_il`]: Locale
  [`it_it`]: Locale.Italian,
  [`ja_jp`]: Locale.Japanese,
  [`ko_kr`]: Locale.Korean,
  [`lt_lt`]: Locale.Lithuanian,
  [`nb_no`]: Locale.Norwegian,
  [`nl_nl`]: Locale.Dutch,
  [`pt_br`]: Locale.PortugueseBR,
  // [`pt_pt`]: Locale
  [`ru_ru`]: Locale.Russian,
  [`sv_se`]: Locale.Swedish,
  [`th_th`]: Locale.Thai,
  [`zh_cn`]: Locale.ChineseCN,
  [`zh_tw`]: Locale.ChineseTW
}

export async function loadAllLanguages(): Promise<ReadonlyMap<`${Locale}`, Record<string, string>>>
export async function loadAllLanguages(
  targetDir: string = join(fileURLToPath(Directories.Data), ResourceIdentifiers.PIXELMON, `lang`)
): Promise<ReadonlyMap<`${Locale}`, Record<string, string>>> {
  const languageMappings = new Map<`${Locale}`, Record<string, string>>()

  const languageFileNames = await readdir(targetDir)

  for await (const languageFileName of languageFileNames) {
    const languageFilePath = join(targetDir, languageFileName)

    const ext = extname(languageFileName)

    if (ext !== `.json`) {
      console.warn(
        `[LanguageLoader] Skip ${green(languageFileName)} because could not transform to JSON.`
      )
      continue
    }

    const locale: `${Locale}` | null =
      pixelmonToDiscordMappings[languageFileName.replace(ext, ``) as `en_us`]

    if (isNullish(locale)) {
      console.warn(
        `[LanguageLoader] Skip ${green(languageFileName)} ` +
          `because not compatible with Discord mapping.`
      )
      continue
    }

    const result = await Result.fromAsync(async () => await readFile(languageFilePath))

    if (result.isErr()) {
      console.error(`[StatLoader] Failed to fetch data: ${languageFileName}`)
      console.error(`  Caused:` + result.unwrapErr())
      continue
    }

    const jsonParseResult = Result.from(() => JSON.parse(result.unwrap().toString()))

    if (jsonParseResult.isErr()) {
      console.error(`[StatLoader] Failed to transform JSON data: ${languageFileName}`)
      console.error(`  Caused:` + jsonParseResult.unwrapErr())
      continue
    }

    languageMappings.set(locale, jsonParseResult.unwrap())
  }

  return languageMappings
}
