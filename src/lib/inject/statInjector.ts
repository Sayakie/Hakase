import { toTitleCase } from '@sapphire/utilities'

import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import { loadAllStats } from '#lib/utils/loaders.js'

export async function injectStats(): Promise<void> {
  const stats = await loadAllStats()

  for (const [pokemonName, data] of stats) {
    const species = Reflect.construct(PokemonSpecies, [data])

    Reflect.set(PokemonSpecies, toTitleCase(pokemonName), species)
  }
}
