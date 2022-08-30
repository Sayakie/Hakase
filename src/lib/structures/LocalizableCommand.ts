import { type Args, type PieceContext, Command as SapphireCommand } from '@sapphire/framework'
import type { LocalizationMap } from 'discord-api-types/v10'

export class LocalizableCommand<
  PreParseReturn = Args,
  O extends SapphireCommand.Options = SapphireCommand.Options
> extends SapphireCommand<PreParseReturn, O> {
  public override nameLocalizations: LocalizationMap | null = null

  public override descriptionLocalizations: LocalizationMap | null = null

  public constructor(context: PieceContext, options: O = {} as O) {
    super(context, options)

    this.nameLocalizations = options.nameLocalizations
    this.descriptionLocalizations = options.descriptionLocalizations
  }
}

interface LocalizationProperties {
  nameLocalizations: LocalizationMap | null
  descriptionLocalizations: LocalizationMap | null
}

/* eslint-disable @typescript-eslint/no-empty-interface */
declare module '@sapphire/framework' {
  interface Command extends LocalizationProperties {}

  interface CommandOptions extends LocalizationProperties {}
}
