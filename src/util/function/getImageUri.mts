import { Species } from '../../entity/Species.mjs'
import type { FormBelongToSpecies } from '../../index.mjs'
import { ArrayUtil } from '../../index.mjs'
import { FormFlag, formLink } from '../Constant.mjs'

const originHostUri = `https://raw.githubusercontent.com/Sayakie/Hakase/resource/images`
const properties: {
  hostUri: string
  readonly originHostUri: string
} = {
  hostUri: originHostUri,
  originHostUri
}

export const getImageUri = Object.assign(
  (species: Species, flag = FormFlag.DefaultForm): string => {
    const pokedex = species.getNationalPokedex().asString()
    let imageSuffix = ``

    // Jirachi is amazingly cute
    if (species == Species.Jirachi) {
      return `https://cdn.discordapp.com/attachments/873927999261642822/921560707617681458/32a924544eb0501ca7d9369bf049932ac9d5acb689a35eed3f1665cdbfe40c2669d5a4a51b2e4101db06ffa65e0b4251afc4fac40beb92a237f310b41157cd8c737520372e87278041ea56d325dfb93b.gif`
    }

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

      imageSuffix = targetForm.imageSuffix ?? targetForm.spriteSuffix ?? ``
    }

    return `${getImageUri.hostUri}/${pokedex}${imageSuffix}.png`
  },
  properties
)
