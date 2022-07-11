/**
 * Regex that can capture the Pokémon name and form name.
 *
 * @raw `/(?<pokemon>[^\s]+)(\s+\((?<form>.+)\))?/`
 * @remark Capture group 1 is the Pokémon name that is named `pokemon`.
 * @remark Capture group 2 is the form name that is named `form`. Maybe {@code undefined} in no represent.
 */
export const PokemonChatInputQuery = /(?<pokemon>[^\s]+)(\s+\((?<form>.+)\))?/
