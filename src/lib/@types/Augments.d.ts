import type { LocaleString } from 'discord-api-types/v10'

import type { PokemonClient } from '../client/PokemonClient.js'
import type { FuzzyPokemonStrategyStore } from '../structures/FuzzyPokemonStrategyStore.js'
import type { StoreRegistryEntries } from '../utils/Identifiers.js'

declare module '@sapphire/pieces' {
  interface Container {
    pokemonClient: PokemonClient
    languageMappings: ReadonlyMap<LocaleString, Record<string, string>>
  }

  interface StoreRegistryEntries {
    // @ts-expect-error This feature let y'all allow to obtain `FuzzyPokemonStrategyStore` by enum.
    [StoreRegistryEntries.Strategies]: FuzzyPokemonStrategyStore

    // @ts-expect-error This feature let y'all allow to obtain `FuzzyPokemonStrategyStore` by literal string.
    [`strategies`]: FuzzyPokemonStrategyStore
  }
}
