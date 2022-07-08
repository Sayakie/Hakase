import { Species } from '../../enum/Species.js'
import type { FormBelongToSpecies } from '../../index.js'
import { ArrayUtil } from '../../index.js'
import { FormFlag } from '../Constant.js'
import { formLink } from '../DataManager.js'

export function getImageUri(
  species: Species,
  flag = FormFlag.DefaultForm,
  {
    hostUri = `https://raw.githubusercontent.com/Sayakie/Hakase/resource/images`,
    extension = `png`
  }: {
    hostUri?: string
    extension?: `png` | `jpg` | `gif` | `webp`
  } = {}
): string {
  const pokedex = species.getNationalPokedex().asString()
  let imageSuffix = ``

  // Jirachi is amazingly cute
  if (species == Species.Jirachi) {
    extension = `gif`
  }

  if (formLink.has(species)) {
    const forms = formLink
      .get(species)!
      .filter(({ flags }) => (flags & flag) === flag)
    const targetForm: FormBelongToSpecies = forms.at(0)!

    // if (forms.length > 1) {
    //   targetForm = ArrayUtil.getRandomElement(forms)
    // } else {
    //   targetForm = forms.at(0)!
    // }

    imageSuffix = targetForm.imageSuffix ?? targetForm.spriteSuffix ?? ``
  }

  return `${hostUri}/${pokedex}${imageSuffix}.${extension}`
}
