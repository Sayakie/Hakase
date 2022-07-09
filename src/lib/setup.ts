//
// Apply some patches
import './patches/Math.js'
//
// Setting up environments
import './config.js'

import { container } from '@sapphire/pieces'
import { blueBright } from 'colorette'

import { loadAllStats } from './internal/utils/loaders/stat-loader.js'
import { PokemonSpecies } from './pokemon/PokemonSpecies.js'

const stats = await loadAllStats()
for (const [species, rawStatData] of stats) {
  const speciesInstance = Reflect.construct(PokemonSpecies, [rawStatData])
  Reflect.set(PokemonSpecies, species, speciesInstance)

  container.logger.debug(
    `[bootstrap/Stats] Applied ${blueBright(`Species{${species}}`)} into PokemonSpecies.`
  )
}

container.logger.debug(`[bootstrap/Stats] Applied ${blueBright(stats.size)} species.`)
