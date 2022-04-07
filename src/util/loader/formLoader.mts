import { FormFlag } from '../../Constant.mjs'
import { EnumAegislash } from '../../entity/form/EnumAegislash.mjs'
import { EnumAlcremie } from '../../entity/form/EnumAlcremie.mjs'
import { EnumArceus } from '../../entity/form/EnumArceus.mjs'
import { EnumBasculin } from '../../entity/form/EnumBasculin.mjs'
import { EnumBurmy } from '../../entity/form/EnumBurmy.mjs'
import { EnumCalyrex } from '../../entity/form/EnumCalyrex.mjs'
import { EnumCastform } from '../../entity/form/EnumCastform.mjs'
import { EnumCherrim } from '../../entity/form/EnumCherrim.mjs'
import { EnumDarmanitan } from '../../entity/form/EnumDarmanitan.mjs'
import { EnumDeoxys } from '../../entity/form/EnumDeoxys.mjs'
import { EnumEiscue } from '../../entity/form/EnumEiscue.mjs'
import { EnumEternatus } from '../../entity/form/EnumEternatus.mjs'
import { EnumFlabebe } from '../../entity/form/EnumFlabebe.mjs'
import { EnumGastrodon } from '../../entity/form/EnumGastrodon.mjs'
import { EnumGiratina } from '../../entity/form/EnumGiratina.mjs'
import { EnumGreninja } from '../../entity/form/EnumGreninja.mjs'
import { EnumGroudon } from '../../entity/form/EnumGroudon.mjs'
import { EnumHeroDuo } from '../../entity/form/EnumHeroDuo.mjs'
import { EnumHoopa } from '../../entity/form/EnumHoopa.mjs'
import { EnumKeldeo } from '../../entity/form/EnumKeldeo.mjs'
import { EnumKyurem } from '../../entity/form/EnumKyurem.mjs'
import { EnumLycanroc } from '../../entity/form/EnumLycanroc.mjs'
import { EnumMeloetta } from '../../entity/form/EnumMeloetta.mjs'
import { EnumMimikyu } from '../../entity/form/EnumMimikyu.mjs'
import { EnumMorpeko } from '../../entity/form/EnumMorpeko.mjs'
import { EnumNecrozma } from '../../entity/form/EnumNecrozma.mjs'
import { EnumOricorio } from '../../entity/form/EnumOricorio.mjs'
import { EnumRotom } from '../../entity/form/EnumRotom.mjs'
import { EnumShaymin } from '../../entity/form/EnumShaymin.mjs'
import { EnumTherian } from '../../entity/form/EnumTherian.mjs'
import { EnumToxtricity } from '../../entity/form/EnumToxtricity.mjs'
import { EnumUnown } from '../../entity/form/EnumUnown.mjs'
import { EnumUrshifu } from '../../entity/form/EnumUrshifu.mjs'
import { EnumVivillon } from '../../entity/form/EnumVivillon.mjs'
import { EnumWishiwashi } from '../../entity/form/EnumWishiwashi.mjs'
import { EnumXerneas } from '../../entity/form/EnumXerneas.mjs'
import { EnumZygarde } from '../../entity/form/EnumZygarde.mjs'
import { MegaForm } from '../../entity/form/MegaForm.mjs'
import { RegionalForm } from '../../entity/form/RegionalForm.mjs'
import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.mjs'
import { Species } from '../../entity/Species.mjs'
import { Exception } from '../exception.mjs'

export type FormLink = ReadonlyMap<Species, ReadonlyArray<FormBelongToSpecies>>
export function loadAllForms(): Promise<FormLink> {
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
      formLink.set(Species.Eiscue, EnumEiscue.values())
      formLink.set(Species.Eternatus, EnumEternatus.values())
      formLink.set(Species.Flabebe, EnumFlabebe.values())
      formLink.set(Species.Floette, EnumFlabebe.values())
      formLink.set(Species.Florges, EnumFlabebe.values())
      formLink.set(Species.Gastrodon, EnumGastrodon.values())
      formLink.set(Species.Giratina, EnumGiratina.values())
      formLink.set(Species.Greninja, EnumGreninja.values())
      formLink.set(Species.Groudon, EnumGroudon.values())
      formLink.set(Species.Hoopa, EnumHoopa.values())
      formLink.set(Species.Keldeo, EnumKeldeo.values())
      formLink.set(Species.Kyurem, EnumKyurem.values())
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

      FormBelongToSpecies.customNormalForms.forEach(species => {
        formLink.set(species, [
          RegionalForm.Normal.builder()
            .species(species)
            .spriteSuffix(`-normal`)
            .build()
        ])
      })

      FormBelongToSpecies.megaForms.forEach(species => {
        formLink.set(
          species,
          [MegaForm.Normal, MegaForm.Mega].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      FormBelongToSpecies.megaXYForms.forEach(species => {
        formLink.set(
          species,
          [MegaForm.Normal, MegaForm.MegaX, MegaForm.MegaY].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      FormBelongToSpecies.alolanForms.forEach(species => {
        formLink.set(
          species,
          [RegionalForm.Normal, RegionalForm.Alolan].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      FormBelongToSpecies.galarianForms.forEach(species => {
        formLink.set(
          species,
          [RegionalForm.Normal, RegionalForm.Galarian].map(form =>
            form.builder().species(species).build()
          )
        )
      })

      FormBelongToSpecies.hisuianForms.forEach(species => {
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
