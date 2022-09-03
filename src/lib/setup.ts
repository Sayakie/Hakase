import '@sapphire/plugin-logger/register'
import '#lib/config.js'

import { container } from '@sapphire/pieces'
import { Stopwatch } from '@sapphire/stopwatch'
import { isNullishOrEmpty, toTitleCase } from '@sapphire/utilities'
import { blueBright, cyanBright } from 'colorette'

import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import { loadAllLanguages, loadAllStats } from '#lib/utils/loaders.js'

process.env.NODE_ENV ??= `development`

const statsMeasure = new Stopwatch()

const stats = await loadAllStats()

for (const [species, data] of stats) {
  const speciesInstance = Reflect.construct(PokemonSpecies, [data])

  Reflect.set(PokemonSpecies, toTitleCase(species), speciesInstance)

  console.debug(
    `[bootstrap/StatLoader] Applied ${blueBright(toTitleCase(species))} into PokemonSpecies.`
  )
}

console.info(`[bootstrap/StatLoader] Applied ${blueBright(stats.size)} species.`)
console.info(
  `[bootstrap/StatLoader] Took ${cyanBright(statsMeasure.stop().toString())} to initialize.`
)

const langaugeMeasure = new Stopwatch()

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
      if (/* isNullishOrEmpty(form.name) ||  */ ignoreForms.includes(form.name.toLowerCase())) {
        continue
      } else if (commonForms.includes(form.name.toLowerCase())) {
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
        const properValue =
          speciesName + //
          (formName ? ` (${formName})` : ``)

        species.setLocalizedNameBelongToForm(form.name.toLowerCase(), locale, properValue)
      }
    }
  }
})
console.info(
  `[bootstrap/LanguageLoader] Applied ` +
    `${blueBright(container.languageMappings.size)} language mappings.`
)
console.info(
  `[bootstrap/LanguageLoader] Mapping languages: ` +
    `${blueBright([...container.languageMappings.keys()].join(`, `))}`
)
console.info(
  `[bootstrap/LanguageLoader] Took ` +
    `${cyanBright(langaugeMeasure.stop().toString())} to initialize.`
)
