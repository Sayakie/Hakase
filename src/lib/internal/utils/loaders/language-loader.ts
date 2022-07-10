import { container } from '@sapphire/pieces'
import { Result } from '@sapphire/result'
import { isNullish } from '@sapphire/utilities'
import type { LocaleString } from 'discord-api-types/v10'
import { Locale } from 'discord-api-types/v10'
import { readdir, readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'

import { Directories, ResourceIdentifiers } from '../../../utils/constants.js'

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

export async function loadAllLanguages(): Promise<ReadonlyMap<LocaleString, Record<string, string>>>
export async function loadAllLanguages(
  targetDir: string = join(Directories.Data.pathname, ResourceIdentifiers.PIXELMON, `lang`)
): Promise<ReadonlyMap<LocaleString, Record<string, string>>> {
  const languageMappings = new Map<LocaleString, Record<string, string>>()

  const languageFileNames = await readdir(targetDir)
  for await (const languageFileName of languageFileNames) {
    const languageFilePath = join(targetDir, languageFileName)
    const ext = extname(languageFileName)
    if (ext !== `.json`) {
      container.logger.debug(
        `[LanguageLoader] Skipping ${languageFileName} due to is not JSON type.`
      )
      continue
    }

    const locale: LocaleString | null =
      pixelmonToDiscordMappings[languageFileName.replace(ext, ``) as `en_us`]
    if (isNullish(locale)) {
      container.logger.warn(
        `[LanguageLoader] Skipping ${languageFileName} due to is not compatible language with Discord.`
      )
      continue
    }

    const result = await Result.fromAsync(async () => await readFile(languageFilePath))
    if (result.isErr()) {
      container.logger.error(
        `[StatLoader] Failed to fetch data corresponding with ${languageFileName}`
      )
      container.logger.error(result.unwrapErr())
      continue
    }

    const data = JSON.parse(result.unwrap().toString())

    languageMappings.set(locale, data)
  }

  return languageMappings
}
