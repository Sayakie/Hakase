import { Store } from '@sapphire/pieces'

import { FuzzyPokemonStrategy } from '#lib/structures/FuzzyPokemonStrategy.js'
import { StoreRegistryEntries } from '#lib/utils/Identifiers.js'

export class FuzzyPokemonStrategyStore extends Store<FuzzyPokemonStrategy> {
  private readonly globalStrategies: FuzzyPokemonStrategy[] = []

  public constructor() {
    super(FuzzyPokemonStrategy as any, { name: StoreRegistryEntries.Strategies })
  }

  public getStrategies(): FuzzyPokemonStrategy[] {
    return [...this.globalStrategies]
  }

  public override set(key: string, value: FuzzyPokemonStrategy): this {
    this.globalStrategies.push(value)

    return super.set(key, value)
  }

  public override delete(key: string): boolean {
    const index = this.globalStrategies.findIndex(strategy => strategy.name === key)

    // If the strategy was found, remove it
    if (index !== -1) this.globalStrategies.splice(index, 1)

    return super.delete(key)
  }

  public override clear(): void {
    this.globalStrategies.length = 0

    super.clear()
  }
}
