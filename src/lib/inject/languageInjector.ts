import { container } from '@sapphire/pieces'
import { isNullishOrEmpty } from '@sapphire/utilities'

import { PokemonSpecies } from '#lib/pokemon/PokemonSpecies.js'
import { loadAllLanguages } from '#lib/utils/loaders.js'

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

export async function injectLangauges(): Promise<void> {
  container.languageMappings = await loadAllLanguages()
  container.languageMappings.forEach((values, locale) => {
    for (const species of PokemonSpecies.iter()) {
      const localizedSpeciesName = Reflect.get(values, `pixelmon.${species.name.toLowerCase()}`)

      if (isNullishOrEmpty(localizedSpeciesName)) {
        continue
      }

      species.setLocalizedName(locale, localizedSpeciesName)

      for (const form of species.forms) {
        if (commonForms.includes(form.name.toLowerCase())) {
          const localizedFormName = Reflect.get(
            values,
            `pixelmon.generic.form.${form.name.toLowerCase()}`
          )

          species.setLocalizedNameBelongToForm(
            form.name.toLowerCase(),
            locale,
            `${localizedFormName} ${localizedSpeciesName}`
          )
        } else {
          const localizedFormName = Reflect.get(
            values,
            `pixelmon.${species.name.toLowerCase()}.form.${form.name.toLowerCase()}`
          )

          const localizedFormFullName =
            localizedSpeciesName + //
            (localizedFormName ? ` (${localizedFormName})` : ``)

          species.setLocalizedNameBelongToForm(
            form.name.toLowerCase(),
            locale,
            localizedFormFullName
          )
        }
      }
    }
  })
}
