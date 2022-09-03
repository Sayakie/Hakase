import type { Stat } from '@internal/pixelmon'
import { Result } from '@sapphire/result'
import { isNullish, toTitleCase } from '@sapphire/utilities'

import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import { loadAllStats } from '#lib/utils/loaders.js'

export async function injectStats(): Promise<void> {
  const stats = await loadAllStats()

  for (const [pokemonName, raw] of stats) {
    const result = Result.from(() => JSON.parse(raw) as Stat)

    const data = result.match({
      err: () => null,
      ok: data => data
    })

    if (isNullish(data)) {
      continue
    }

    const species = Reflect.construct(PokemonSpecies, [data])

    Reflect.set(PokemonSpecies, toTitleCase(pokemonName), species)
  }
}
