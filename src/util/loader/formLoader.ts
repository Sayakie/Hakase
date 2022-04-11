import { EnumAegislash } from '../../enum/form/EnumAegislash.js'
import { EnumAlcremie } from '../../enum/form/EnumAlcremie.js'
import { EnumAlterTrio } from '../../enum/form/EnumAlterTrio.js'
import { EnumArceus } from '../../enum/form/EnumArceus.js'
import { EnumBasculin } from '../../enum/form/EnumBasculin.js'
import { EnumBurmy } from '../../enum/form/EnumBurmy.js'
import { EnumCalyrex } from '../../enum/form/EnumCalyrex.js'
import { EnumCastform } from '../../enum/form/EnumCastform.js'
import { EnumCherrim } from '../../enum/form/EnumCherrim.js'
import { EnumDarmanitan } from '../../enum/form/EnumDarmanitan.js'
import { EnumDeoxys } from '../../enum/form/EnumDeoxys.js'
import { EnumEiscue } from '../../enum/form/EnumEiscue.js'
import { EnumEternatus } from '../../enum/form/EnumEternatus.js'
import { EnumFlabebe } from '../../enum/form/EnumFlabebe.js'
import { EnumGastrodon } from '../../enum/form/EnumGastrodon.js'
import { EnumGreninja } from '../../enum/form/EnumGreninja.js'
import { EnumGroudon } from '../../enum/form/EnumGroudon.js'
import { EnumHeroDuo } from '../../enum/form/EnumHeroDuo.js'
import { EnumHoopa } from '../../enum/form/EnumHoopa.js'
import { EnumKeldeo } from '../../enum/form/EnumKeldeo.js'
import { EnumKyurem } from '../../enum/form/EnumKyurem.js'
import { EnumLycanroc } from '../../enum/form/EnumLycanroc.js'
import { EnumMeloetta } from '../../enum/form/EnumMeloetta.js'
import { EnumMimikyu } from '../../enum/form/EnumMimikyu.js'
import { EnumMorpeko } from '../../enum/form/EnumMorpeko.js'
import { EnumNecrozma } from '../../enum/form/EnumNecrozma.js'
import { EnumOricorio } from '../../enum/form/EnumOricorio.js'
import { EnumRotom } from '../../enum/form/EnumRotom.js'
import { EnumShaymin } from '../../enum/form/EnumShaymin.js'
import { EnumTherian } from '../../enum/form/EnumTherian.js'
import { EnumToxtricity } from '../../enum/form/EnumToxtricity.js'
import { EnumUnown } from '../../enum/form/EnumUnown.js'
import { EnumUrshifu } from '../../enum/form/EnumUrshifu.js'
import { EnumVivillon } from '../../enum/form/EnumVivillon.js'
import { EnumWishiwashi } from '../../enum/form/EnumWishiwashi.js'
import { EnumXerneas } from '../../enum/form/EnumXerneas.js'
import { EnumZygarde } from '../../enum/form/EnumZygarde.js'
import { MegaForm } from '../../enum/form/MegaForm.js'
import { RegionalForm } from '../../enum/form/RegionalForm.js'
import {
  type FormBelongToSpecies,
  Collections
} from '../../enum/FormBelongToSpecies.js'
import { Species } from '../../enum/Species.js'
import { FormFlag } from '../Constant.js'
import { Exception } from '../exception.js'

export type FormLink = ReadonlyMap<Species, ReadonlyArray<FormBelongToSpecies>>
export async function loadAllForms(): Promise<FormLink> {
  const formLink = new Map<Species, FormBelongToSpecies[]>()

  return new Promise<FormLink>((resolve, reject) => {
    try {
      formLink.set(Species.Aegislash, EnumAegislash.values())
      formLink.set(Species.Alcremie, EnumAlcremie.values())
      formLink.set(Species.Arceus, EnumArceus.values())
      formLink.set(Species.Basculin, EnumBasculin.values())
      formLink.set(Species.Burmy, EnumBurmy.values())
      formLink.set(Species.Calyrex, EnumCalyrex.values())
      formLink.set(Species.Castform, EnumCastform.values())
      formLink.set(Species.Cherrim, EnumCherrim.values())
      formLink.set(Species.Darmanitan, EnumDarmanitan.values())
      formLink.set(Species.Deoxys, EnumDeoxys.values())
      formLink.set(Species.Dialga, EnumAlterTrio.values())
      formLink.set(Species.Eiscue, EnumEiscue.values())
      formLink.set(Species.Eternatus, EnumEternatus.values())
      formLink.set(Species.Flabebe, EnumFlabebe.values())
      formLink.set(Species.Floette, EnumFlabebe.values())
      formLink.set(Species.Florges, EnumFlabebe.values())
      // TODO: Uncomment when the form is ready to be released in the Pixelmon
      // formLink.set(Species.Enamorus, EnumTherian.values())
      formLink.set(Species.Gastrodon, EnumGastrodon.values())
      formLink.set(Species.Giratina, EnumAlterTrio.values())
      formLink.set(Species.Greninja, EnumGreninja.values())
      formLink.set(Species.Groudon, EnumGroudon.values())
      formLink.set(Species.Hoopa, EnumHoopa.values())
      formLink.set(Species.Keldeo, EnumKeldeo.values())
      formLink.set(Species.Kyurem, EnumKyurem.values())
      formLink.set(Species.Landorus, EnumTherian.values())
      formLink.set(Species.Lunatone, [
        RegionalForm.Normal.builder()
          .species(Species.Lunatone)
          .spriteSuffix(`-gibbous`)
          .build()
      ])
      formLink.set(Species.Lycanroc, EnumLycanroc.values())
      formLink.set(Species.Meloetta, EnumMeloetta.values())
      formLink.set(Species.Mimikyu, EnumMimikyu.values())
      formLink.set(Species.Morpeko, EnumMorpeko.values())
      formLink.set(Species.Necrozma, EnumNecrozma.values())
      formLink.set(Species.Oricorio, EnumOricorio.values())
      formLink.set(Species.Palkia, EnumAlterTrio.values())
      formLink.set(Species.Rotom, EnumRotom.values())
      formLink.set(Species.Shaymin, EnumShaymin.values())
      formLink.set(Species.Shellos, EnumGastrodon.values())
      formLink.set(Species.Silvally, EnumArceus.values())
      formLink.set(Species.Thundurus, EnumTherian.values())
      formLink.set(Species.Tornadus, EnumTherian.values())
      formLink.set(Species.Toxtricity, EnumToxtricity.values())
      formLink.set(Species.Unown, EnumUnown.values())
      formLink.set(Species.Urshifu, EnumUrshifu.values())
      formLink.set(Species.Vivillon, EnumVivillon.values())
      formLink.set(Species.Wishiwashi, EnumWishiwashi.values())
      formLink.set(
        Species.Wormadam,
        EnumBurmy.values().map(formBelongToWormadam => {
          if (formBelongToWormadam.form > 0) {
            return formBelongToWormadam
              .builder()
              .flags(
                formBelongToWormadam.flags & ~FormFlag.DefaultForm,
                FormFlag.AlterForm
              )
              .build()
          }

          return formBelongToWormadam
        })
      )
      formLink.set(Species.Xerneas, EnumXerneas.values())
      formLink.set(Species.Zygarde, EnumZygarde.values())
      formLink.set(Species.Zacian, EnumHeroDuo.values())
      formLink.set(Species.Zamazenta, EnumHeroDuo.values())

      Collections.customNormalForms.forEach(species => {
        formLink.set(species, [
          RegionalForm.Normal.builder()
            .species(species)
            .spriteSuffix(`-normal`)
            .build()
        ])
      })

      Collections.megaForms.forEach(species => {
        formLink.set(
          species,
          [MegaForm.Normal, MegaForm.Mega].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      Collections.megaXYForms.forEach(species => {
        formLink.set(
          species,
          [MegaForm.Normal, MegaForm.MegaX, MegaForm.MegaY].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      Collections.alolanForms.forEach(species => {
        formLink.set(
          species,
          [RegionalForm.Normal, RegionalForm.Alolan].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      Collections.galarianForms.forEach(species => {
        formLink.set(
          species,
          [RegionalForm.Normal, RegionalForm.Galarian].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      Collections.hisuianForms.forEach(species => {
        formLink.set(
          species,
          [RegionalForm.Normal, RegionalForm.Hisuian].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      resolve(formLink)
    } catch {
      reject(new Exception(`Failed to load all forms`))
    }
  })
}
