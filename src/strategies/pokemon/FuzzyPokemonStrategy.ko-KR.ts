import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { jaroWinkler } from '@skyra/jaro-winkler'
import { Locale } from 'discord-api-types/v10'
import { explode } from 'korean-regexp'

import { FuzzyPokemonStrategy } from '../../lib/structures/FuzzyPokemonStrategy.js'

@Mixin<FuzzyPokemonStrategy.Options>({
  locale: Locale.Korean
})
export class FuzzyPokemonStrategy$Korean extends FuzzyPokemonStrategy<`ko`> {
  public override fits(compareTo: string, compareWith: string): boolean {
    return this.similarity(compareTo, compareWith) > this.threshold
  }

  public override similarity(compareTo: string, compareWith: string): number {
    if (compareTo === compareWith) {
      return 1
    }

    return jaroWinkler(explode(compareTo).join(``), explode(compareWith).join(``))
  }
}
