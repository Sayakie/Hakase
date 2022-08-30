import type { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'

export interface GetImageUrlOptions {
  hostUri?: string
  extension?: `png` | `jpg` | `gif` | `webp`
}
export function getImageUrl(species: PokemonSpecies, form: string): string
export function getImageUrl(
  species: PokemonSpecies,
  form: string,
  {
    hostUri = `https://raw.githubusercontent.com/Sayakie/Hakase/resource/images`,
    extension = `png`
  }: GetImageUrlOptions = {}
): string {
  const pokedex = species.getNationalPokedex().asString()

  const suffix = form ? `-${form}` : ``

  return `${hostUri}/${pokedex}${suffix}.${extension}`
}
