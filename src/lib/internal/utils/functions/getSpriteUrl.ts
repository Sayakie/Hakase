import type { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'

export interface GetSpriteUrlOptions {
  hostUri?: string
  extension?: `png` | `jpg` | `gif` | `webp`
}
export function getSpriteUrl(species: PokemonSpecies, form: string): string
export function getSpriteUrl(
  species: PokemonSpecies,
  form: string,
  {
    hostUri = `https://raw.githubusercontent.com/Sayakie/Hakase/resource/sprites`,
    extension = `png`
  }: GetSpriteUrlOptions = {}
): string {
  const pokedex = species.getNationalPokedex().asString()

  const suffix = form ? `-${form}` : ``

  return `${hostUri}/${pokedex}${suffix}.${extension}`
}
