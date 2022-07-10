import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { type Maybe, InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework'
import type { ApplicationCommandOptionChoiceData, AutocompleteInteraction } from 'discord.js'
import type { LocaleString } from 'discord-api-types/v10'

import { fuzzyPokemonToSelectOption } from '../../lib/utils/responseBuilders/pokemonResponseBuilder'

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
  ): Promise<Maybe<ApplicationCommandOptionChoiceData[]>> {
    if (interaction.commandName !== `pokemon`) {
      return this.none()
    }

    const focusedOption = interaction.options.getFocused(true)

    switch (focusedOption.name) {
      case `pokemon`: {
        const fuzzyPokemon = await this.container.pokemonClient.fuzzilySearchPokemon(
          focusedOption.value,
          { locale: interaction.locale as LocaleString }
        )

        return this.some(
          fuzzyPokemon.map(fuzzyEntry => fuzzyPokemonToSelectOption(fuzzyEntry, locale))
        )
      }
      default:
        return this.none()
    }
  }
}
