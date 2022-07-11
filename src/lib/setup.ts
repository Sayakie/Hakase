//
// Apply some patches
import './patches/Math.js'
//
// Setting up environments
import './config.js'

import { container } from '@sapphire/pieces'
import { Stopwatch } from '@sapphire/stopwatch'
import { isNullishOrEmpty, toTitleCase } from '@sapphire/utilities'
import { blueBright, cyanBright } from 'colorette'

import { PokemonClient } from './client/PokemonClient.js'
import { PokemonSpecies } from './pokemon/PokemonSpecies.js'
import { PokemonResolver } from './resolvers/pokemon.js'
import { loadAllLanguages, loadAllStats } from './utils/loaders.js'
import { getProperPokemonName } from './utils/pokemon/getProperPokemonName.js'

container.pokemonClient = new PokemonClient()
container.logger.info(`[bootstrap/] Attached PokemonClient to container.`)

const langaugeTimewatch = new Stopwatch()
const commonForms = [
  `noform`,
  `mega`,
  `megax`,
  `megay`,
  `primal`,
  `dynamax`,
  `gmax`,
  `gigantamax`,
  `normal`,
  `alolan`,
  `galarian`,
  `hisuian`
]
const ignoreForms = [
  `base`,
  `zombie`,
  `online`,
  `drowned`,
  `valentine`,
  `rainbow`,
  `alien`,
  `valencian`,
  `alter`,
  `pink`,
  `summer`,
  `crystal`,
  `creator`,
  `strike`,
  `ashen`,
  `spirit`,
  `halloween`,

  `zombie.mega`,
  `online.mega`,
  `drowned.mega`,
  `valentine.mega`,
  `rainbow.mega`,
  `alien.mega`,
  `real.mega`,
  `alter.mega`,
  `pink.mega`,
  `summer.mega`,
  `crystal.mega`,

  `zombiex`,
  `zombiey`
]
container.languageMappings = await loadAllLanguages()
container.languageMappings.forEach((values, locale) => {
  for (const species of PokemonSpecies) {
    const speciesName = Reflect.get(values, `pixelmon.${species.name.toLowerCase()}`)
    if (isNullishOrEmpty(speciesName)) {
      continue
    }

    species.setLocalizedName(locale, speciesName)

    for (const form of species.forms) {
      // if (/* isNullishOrEmpty(form.name) ||  */ ignoreForms.includes(form.name.toLowerCase())) {
      //   continue
      // } else
      if (commonForms.includes(form.name.toLowerCase())) {
        const formName = Reflect.get(values, `pixelmon.generic.form.${form.name.toLowerCase()}`)

        species.setLocalizedNameBelongToForm(
          form.name.toLowerCase(),
          locale,
          `${formName} ${speciesName}`
        )
      } else {
        const formName = Reflect.get(
          values,
          `pixelmon.${species.name.toLowerCase()}.form.${form.name.toLowerCase()}`
        )
        // const properValue = getProperPokemonName(locale, species, formName)
        let properValue = speciesName
        properValue += formName ? ` (${formName})` : ``

        species.setLocalizedNameBelongToForm(form.name.toLowerCase(), locale, properValue)
      }
    }
  }
})
container.logger.info(
  `[bootstrap/LanguageLoader] Applied ` +
    `${blueBright(container.languageMappings.size)} language mappings.`
)
container.logger.info(
  `[bootstrap/LanguageLoader] Mapping languages: ` +
    `${blueBright([...container.languageMappings.keys()].join(`, `))}`
)
container.logger.info(
  `[bootstrap/LanguageLoader] Took ` +
    `${cyanBright(langaugeTimewatch.stop().toString())} to initialize.`
)

// const pokemonResolver = new PokemonResolver()
// container.pokemonResolver = pokemonResolver
// container.logger.info(`[bootstrap/PokemonResolver] Initialized.`)
