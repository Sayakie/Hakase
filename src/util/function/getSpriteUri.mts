import type { Species } from '../../entity/Species.mjs'
import type { FormBelongToSpecies } from '../../index.mjs'
import { ArrayUtil } from '../../index.mjs'
import { FormFlag } from '../Constant.mjs'
import { formLink } from '../DataManager.mjs'

const originHostUri = `https://raw.githubusercontent.com/Sayakie/Hakase/resource/sprites`
const properties: {
  extension: string
  hostUri: string
  readonly originHostUri: string
} = {
  extension: `png`,
  hostUri: originHostUri,
  originHostUri
}

export const getSpriteUri = Object.assign(
  (species: Species, flag = FormFlag.DefaultForm): string => {
    const { hostUri, extension } = getSpriteUri
    const pokedex = species.getNationalPokedex().asString()
    let spriteSuffix = ``

    if (formLink.has(species)) {
      const forms = formLink
        .get(species)!
        .filter(({ flags }) => (flags & flag) === flag)
      let targetForm: FormBelongToSpecies

      // if (forms.length > 1) {
      //   targetForm = ArrayUtil.getRandomElement(forms)
      // } else {
      //   targetForm = forms.at(0)!
      // }
      targetForm = forms.at(0)!

      spriteSuffix = targetForm.spriteSuffix ?? ``
    }

    return `${hostUri}/${pokedex}${spriteSuffix}.${extension}`
  },
  properties
)
