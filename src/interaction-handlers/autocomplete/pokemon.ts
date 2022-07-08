import { ApplyOptions as Mixin } from '@sapphire/decorators'
import { type Maybe, InteractionHandler, InteractionHandlerTypes } from '@sapphire/framework'
import type { ApplicationCommandOptionChoiceData, AutocompleteInteraction } from 'discord.js'

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
      case 'pokemon': {
        return this.some([
          { name: `Jirachi`, nameLocalizations: { ko: `지라치` }, value: `지라치` }
        ])
        // const fuzzyPokemon = await this.container.gqlClient.fuzzilySearchPokemon(
        //   focusedOption.value as string,
        //   20,
        //   interaction.commandName !== 'learn'
        // )

        // return this.some(
        //   fuzzyPokemon.map(fuzzyEntry => fuzzyPokemonToSelectOption(fuzzyEntry, 'name'))
        // )
      }
      default:
        return this.none()
    }
  }
}
