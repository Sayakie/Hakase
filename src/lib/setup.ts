//
// Apply some patches
import './patches/Math.js'
//
// Setting up environments
import './config.js'

import { container } from '@sapphire/pieces'
import { blueBright } from 'colorette'

import { PokemonSpecies } from './pokemon/PokemonSpecies.js'
import { loadAllLanguages, loadAllStats } from './utils/loaders.js'

const stats = await loadAllStats()
for (const [species, rawStatData] of stats) {
  const speciesInstance = Reflect.construct(PokemonSpecies, [rawStatData])
  Reflect.set(PokemonSpecies, species, speciesInstance)

  container.logger.debug(
    `[bootstrap/StatLoader] Applied ${blueBright(`Species{${species}}`)} into PokemonSpecies.`
  )
}

container.logger.info(`[bootstrap/StatLoader] Applied ${blueBright(stats.size)} species.`)

container.languageMappings = await loadAllLanguages()
container.logger.info(
  `[bootstrap/LanguageLoader] Applied ${blueBright(
    container.languageMappings.size
  )} language mappings.`
)
