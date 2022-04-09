import type { Base as SpeciesSpec } from '../species/interface/Base.js'
import { checkState } from '../util/verify.js'
import type { EvolutionCondition } from './Evolution.js'

export class EvolutionBuilder {
  #level?: number
  #to: {
    name: SpeciesSpec
    form?: number
  }
  #item?: { itemID: string }
  #conditions: EvolutionCondition[] = []
  #type: EvolutionType
  #moves?: string[]

  public level(level: number): EvolutionBuilder {
    checkState(level > 0, 'level must be greater than 0')
    this.#level = level

    return this
  }

  public to(name: SpeciesSpec, form?: number): EvolutionBuilder {
    if (form) {
      checkState(form >= 0, 'form must be greater than or equal to 0')
    }
    this.#to = { form, name }

    return this
  }
}
