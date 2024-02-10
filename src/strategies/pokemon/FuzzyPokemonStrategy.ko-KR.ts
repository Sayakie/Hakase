import { ApplyOptions as Mixin } from "@sapphire/decorators";
import { jaroWinkler } from "@skyra/jaro-winkler";
import { Locale } from "discord-api-types/v10";
import { explode } from "korean-regexp";

import { FuzzyPokemonStrategy } from "#lib/structures/FuzzyPokemonStrategy.js";

@Mixin<FuzzyPokemonStrategy.Options>({
  locale: Locale.Korean,
})
export class FuzzyPokemonStrategy$Korean extends FuzzyPokemonStrategy<`ko`> {
  // Due to `#flat` don't consume Infinity constant, we define as `1` to shade
  // TypeScript acquire this value as numeric.
  readonly #infinityLike: 1 = Number.POSITIVE_INFINITY as 1;

  public override fits(compareTo: string, compareWith: string): boolean {
    return this.similarity(compareTo, compareWith) > this.threshold;
  }

  public override similarity(compareTo: string, compareWith: string): number {
    if (compareTo === compareWith) {
      return 1;
    }

    return jaroWinkler(
      this.explodeWordToFlatten(compareTo),
      this.explodeWordToFlatten(compareWith),
    );
  }

  private explodeWordToFlatten(str: string): string {
    return explode(str)
      .flat(this.#infinityLike)
      .map((it) => it.toLowerCase())
      .join("");
  }
}
