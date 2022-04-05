import { FormFlag } from 'io/github/sayakie/hakase/Constant.mjs'
import { EnumAegislash } from 'io/github/sayakie/hakase/entity/form/EnumAegislash.mjs'
import { EnumAlcremie } from 'io/github/sayakie/hakase/entity/form/EnumAlcremie.mjs'
import { EnumArceus } from 'io/github/sayakie/hakase/entity/form/EnumArceus.mjs'
import { EnumBasculin } from 'io/github/sayakie/hakase/entity/form/EnumBasculin.mjs'
import { EnumBurmy } from 'io/github/sayakie/hakase/entity/form/EnumBurmy.mjs'
import { EnumCalyrex } from 'io/github/sayakie/hakase/entity/form/EnumCalyrex.mjs'
import { EnumCastform } from 'io/github/sayakie/hakase/entity/form/EnumCastform.mjs'
import { EnumCherrim } from 'io/github/sayakie/hakase/entity/form/EnumCherrim.mjs'
import { EnumDarmanitan } from 'io/github/sayakie/hakase/entity/form/EnumDarmanitan.mjs'
import { EnumDeoxys } from 'io/github/sayakie/hakase/entity/form/EnumDeoxys.mjs'
import { EnumEiscue } from 'io/github/sayakie/hakase/entity/form/EnumEiscue.mjs'
import { EnumEternatus } from 'io/github/sayakie/hakase/entity/form/EnumEternatus.mjs'
import { EnumFlabebe } from 'io/github/sayakie/hakase/entity/form/EnumFlabebe.mjs'
import { EnumGastrodon } from 'io/github/sayakie/hakase/entity/form/EnumGastrodon.mjs'
import { EnumGiratina } from 'io/github/sayakie/hakase/entity/form/EnumGiratina.mjs'
import { EnumGreninja } from 'io/github/sayakie/hakase/entity/form/EnumGreninja.mjs'
import { EnumGroudon } from 'io/github/sayakie/hakase/entity/form/EnumGroudon.mjs'
import { EnumHeroDuo } from 'io/github/sayakie/hakase/entity/form/EnumHeroDuo.mjs'
import { EnumHoopa } from 'io/github/sayakie/hakase/entity/form/EnumHoopa.mjs'
import { EnumKeldeo } from 'io/github/sayakie/hakase/entity/form/EnumKeldeo.mjs'
import { EnumKyurem } from 'io/github/sayakie/hakase/entity/form/EnumKyurem.mjs'
import { EnumLycanroc } from 'io/github/sayakie/hakase/entity/form/EnumLycanroc.mjs'
import { EnumMeloetta } from 'io/github/sayakie/hakase/entity/form/EnumMeloetta.mjs'
import { EnumMimikyu } from 'io/github/sayakie/hakase/entity/form/EnumMimikyu.mjs'
import { EnumMorpeko } from 'io/github/sayakie/hakase/entity/form/EnumMorpeko.mjs'
import { EnumNecrozma } from 'io/github/sayakie/hakase/entity/form/EnumNecrozma.mjs'
import { EnumOricorio } from 'io/github/sayakie/hakase/entity/form/EnumOricorio.mjs'
import { EnumRotom } from 'io/github/sayakie/hakase/entity/form/EnumRotom.mjs'
import { EnumShaymin } from 'io/github/sayakie/hakase/entity/form/EnumShaymin.mjs'
import { EnumTherian } from 'io/github/sayakie/hakase/entity/form/EnumTherian.mjs'
import { EnumToxtricity } from 'io/github/sayakie/hakase/entity/form/EnumToxtricity.mjs'
import { EnumUnown } from 'io/github/sayakie/hakase/entity/form/EnumUnown.mjs'
import { EnumUrshifu } from 'io/github/sayakie/hakase/entity/form/EnumUrshifu.mjs'
import { EnumVivillon } from 'io/github/sayakie/hakase/entity/form/EnumVivillon.mjs'
import { EnumWishiwashi } from 'io/github/sayakie/hakase/entity/form/EnumWishiwashi.mjs'
import { EnumXerneas } from 'io/github/sayakie/hakase/entity/form/EnumXerneas.mjs'
import { EnumZygarde } from 'io/github/sayakie/hakase/entity/form/EnumZygarde.mjs'
import { MegaForm } from 'io/github/sayakie/hakase/entity/form/MegaForm.mjs'
import { RegionalForm } from 'io/github/sayakie/hakase/entity/form/RegionalForm.mjs'
import { FormBelongToSpecies } from 'io/github/sayakie/hakase/entity/FormBelongToSpecies.mjs'
import { Species } from 'io/github/sayakie/hakase/entity/Species.mjs'
import { Exception } from 'io/github/sayakie/hakase/util/exception.mjs'

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
