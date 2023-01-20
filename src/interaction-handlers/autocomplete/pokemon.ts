import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework'
import type { Option } from '@sapphire/result'
import type { ApplicationCommandOptionChoiceData, AutocompleteInteraction } from 'discord.js'

import { fuzzyPokemonToCommandChoiceData } from '#lib/utils/responseBuilders/pokemonResponseBuilder.js'

@Mixin<InteractionHandler.Options>({
  interactionHandlerType: InteractionHandlerTypes.Autocomplete
})
export class AutocompleteHandler extends InteractionHandler<{
  interactionHandlerType: InteractionHandlerTypes.Autocomplete
}> {
  public override async run(
    interaction: AutocompleteInteraction,
    result: InteractionHandler.ParseResult<this>
  ): Promise<void> {
    return interaction.respond(result)
  }

  public override async parse(
    interaction: AutocompleteInteraction
  ): Promise<Option<ApplicationCommandOptionChoiceData[]>> {
    if (interaction.commandName !== 'pokemon') {
      return this.none()
    }

    const focusedOption = interaction.options.getFocused(true)

    if (focusedOption.name !== 'pokemon') {
      return this.none()
    }

    const { locale } = interaction

    const fuzzyPokemon = await this.container.pokemon.fuzzilySearchPokemon(
      //
      focusedOption.value,
      {
        locale
      }
    )

    return this.some(
      fuzzyPokemon.map(fuzzyEntry => fuzzyPokemonToCommandChoiceData(fuzzyEntry, { locale }))
    )
  }
}
