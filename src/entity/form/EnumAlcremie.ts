import { FormBelongToSpecies } from '../../entity/FormBelongToSpecies.js'
import { Species } from '../../entity/Species.js'
import { FormFlag } from '../../util/Constant.js'
import { IllegalArgumentException } from '../../util/exception.js'

/**
 * Represents available forms of Alcremie.
 */
export const EnumAlcremie = {
  StrawBerry: FormBelongToSpecies.builder()
    .name(`Straw Berry`)
    .species(Species.Alcremie)
    .form(0)
    .flags(FormFlag.DefaultForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-vanilla')
    .imageSuffix('-vanilla-cream-strawberry')
    .build(),
  StrawBerryRubyCream: FormBelongToSpecies.builder()
    .name(`Straw Berry Ruby Cream`)
    .species(Species.Alcremie)
    .form(1)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-rubycream')
    .imageSuffix('-ruby-cream-strawberry')
    .build(),
  StrawBerryMatcha: FormBelongToSpecies.builder()
    .name(`Straw Berry Matcha`)
    .species(Species.Alcremie)
    .form(2)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-matcha')
    .imageSuffix('-matcha-cream-strawberry')
    .build(),
  StrawBerryMint: FormBelongToSpecies.builder()
    .name(`Straw Berry Mint`)
    .species(Species.Alcremie)
    .form(3)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-mint')
    .imageSuffix('-mint-cream-strawberry')
    .build(),
  StrawBerryLemon: FormBelongToSpecies.builder()
    .name(`Straw Berry Lemon`)
    .species(Species.Alcremie)
    .form(4)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-lemon')
    .imageSuffix('-lemon-cream-strawberry')
    .build(),
  StrawBerrySalted: FormBelongToSpecies.builder()
    .name(`Straw Berry Salted`)
    .species(Species.Alcremie)
    .form(5)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-salted')
    .imageSuffix('-salted-cream-strawberry')
    .build(),
  StrawBerryRubySwirl: FormBelongToSpecies.builder()
    .name(`Straw Berry Ruby Swirl`)
    .species(Species.Alcremie)
    .form(6)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-rubyswirl')
    .imageSuffix('-ruby-swirl-strawberry')
    .build(),
  StrawBerryCaramel: FormBelongToSpecies.builder()
    .name(`Straw Berry Caramel`)
    .species(Species.Alcremie)
    .form(7)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-caramel')
    .imageSuffix('-caramel-swirl-strawberry')
    .build(),
  StrawBerryRainbow: FormBelongToSpecies.builder()
    .name(`Straw Berry Rainbow`)
    .species(Species.Alcremie)
    .form(8)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-strawberry-rainbow')
    .imageSuffix('-rainbow-swirl-strawberry')
    .build(),

  Berry: FormBelongToSpecies.builder()
    .name(`Berry`)
    .species(Species.Alcremie)
    .form(9)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-vanilla')
    .imageSuffix('-vanilla-cream-berry')
    .build(),
  BerryRubyCream: FormBelongToSpecies.builder()
    .name(`Berry Ruby Cream`)
    .species(Species.Alcremie)
    .form(10)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-rubycream')
    .imageSuffix('-ruby-cream-berry')
    .build(),
  BerryMatcha: FormBelongToSpecies.builder()
    .name(`Berry Matcha`)
    .species(Species.Alcremie)
    .form(11)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-matcha')
    .imageSuffix('-matcha-cream-berry')
    .build(),
  BerryMint: FormBelongToSpecies.builder()
    .name(`Berry Mint`)
    .species(Species.Alcremie)
    .form(12)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-mint')
    .imageSuffix('-mint-cream-berry')
    .build(),
  BerryLemon: FormBelongToSpecies.builder()
    .name(`Berry Lemon`)
    .species(Species.Alcremie)
    .form(13)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-lemon')
    .imageSuffix('-lemon-cream-berry')
    .build(),
  BerrySalted: FormBelongToSpecies.builder()
    .name(`Berry Salted`)
    .species(Species.Alcremie)
    .form(14)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-salted')
    .imageSuffix('-salted-cream-berry')
    .build(),
  BerryRubySwirl: FormBelongToSpecies.builder()
    .name(`Berry Ruby Swirl`)
    .species(Species.Alcremie)
    .form(15)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-rubyswirl')
    .imageSuffix('-ruby-swirl-berry')
    .build(),
  BerryCaramel: FormBelongToSpecies.builder()
    .name(`Berry Caramel`)
    .species(Species.Alcremie)
    .form(16)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-caramel')
    .imageSuffix('-caramel-swirl-berry')
    .build(),
  BerryRainbow: FormBelongToSpecies.builder()
    .name(`Berry Rainbow`)
    .species(Species.Alcremie)
    .form(17)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-berry-rainbow')
    .imageSuffix('-rainbow-swirl-berry')
    .build(),

  Love: FormBelongToSpecies.builder()
    .name(`Love`)
    .species(Species.Alcremie)
    .form(18)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-vanilla')
    .imageSuffix('-vanilla-cream-love')
    .build(),
  LoveRubyCream: FormBelongToSpecies.builder()
    .name(`Love Ruby Cream`)
    .species(Species.Alcremie)
    .form(19)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-rubycream')
    .imageSuffix('-ruby-cream-love')
    .build(),
  LoveMatcha: FormBelongToSpecies.builder()
    .name(`Love Matcha`)
    .species(Species.Alcremie)
    .form(20)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-matcha')
    .imageSuffix('-matcha-cream-love')
    .build(),
  LoveMint: FormBelongToSpecies.builder()
    .name(`Love Mint`)
    .species(Species.Alcremie)
    .form(21)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-mint')
    .imageSuffix('-mint-cream-love')
    .build(),
  LoveLemon: FormBelongToSpecies.builder()
    .name(`Love Lemon`)
    .species(Species.Alcremie)
    .form(22)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-lemon')
    .imageSuffix('-lemon-cream-love')
    .build(),
  LoveSalted: FormBelongToSpecies.builder()
    .name(`Love Salted`)
    .species(Species.Alcremie)
    .form(23)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-salted')
    .imageSuffix('-salted-cream-love')
    .build(),
  LoveRubySwirl: FormBelongToSpecies.builder()
    .name(`Love Ruby Swirl`)
    .species(Species.Alcremie)
    .form(24)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-rubyswirl')
    .imageSuffix('-ruby-swirl-love')
    .build(),
  LoveCaramel: FormBelongToSpecies.builder()
    .name(`Love Caramel`)
    .species(Species.Alcremie)
    .form(25)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-caramel')
    .imageSuffix('-caramel-swirl-love')
    .build(),
  LoveRainbow: FormBelongToSpecies.builder()
    .name(`Love Rainbow`)
    .species(Species.Alcremie)
    .form(26)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-love-rainbow')
    .imageSuffix('-rainbow-swirl-love')
    .build(),

  Star: FormBelongToSpecies.builder()
    .name(`Star`)
    .species(Species.Alcremie)
    .form(27)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-vanilla')
    .imageSuffix('-vanilla-cream-star')
    .build(),
  StarRubyCream: FormBelongToSpecies.builder()
    .name(`Star Ruby Cream`)
    .species(Species.Alcremie)
    .form(28)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-rubycream')
    .imageSuffix('-ruby-cream-star')
    .build(),
  StarMatcha: FormBelongToSpecies.builder()
    .name(`Star Matcha`)
    .species(Species.Alcremie)
    .form(29)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-matcha')
    .imageSuffix('-matcha-cream-star')
    .build(),
  StarMint: FormBelongToSpecies.builder()
    .name(`Star Mint`)
    .species(Species.Alcremie)
    .form(30)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-mint')
    .imageSuffix('-mint-cream-star')
    .build(),
  StarLemon: FormBelongToSpecies.builder()
    .name(`Star Lemon`)
    .species(Species.Alcremie)
    .form(31)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-lemon')
    .imageSuffix('-lemon-cream-star')
    .build(),
  StarSalted: FormBelongToSpecies.builder()
    .name(`Star Salted`)
    .species(Species.Alcremie)
    .form(32)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-salted')
    .imageSuffix('-salted-cream-star')
    .build(),
  StarRubySwirl: FormBelongToSpecies.builder()
    .name(`Star Ruby Swirl`)
    .species(Species.Alcremie)
    .form(33)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-rubyswirl')
    .imageSuffix('-ruby-swirl-star')
    .build(),
  StarCaramel: FormBelongToSpecies.builder()
    .name(`Star Caramel`)
    .species(Species.Alcremie)
    .form(34)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-caramel')
    .imageSuffix('-caramel-swirl-star')
    .build(),
  StarRainbow: FormBelongToSpecies.builder()
    .name(`Star Rainbow`)
    .species(Species.Alcremie)
    .form(35)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-star-rainbow')
    .imageSuffix('-rainbow-swirl-star')
    .build(),

  Clover: FormBelongToSpecies.builder()
    .name(`Clover`)
    .species(Species.Alcremie)
    .form(36)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-vanilla')
    .imageSuffix('-vanilla-cream-clover')
    .build(),
  CloverRubyCream: FormBelongToSpecies.builder()
    .name(`Clover Ruby Cream`)
    .species(Species.Alcremie)
    .form(37)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-rubycream')
    .imageSuffix('-ruby-cream-clover')
    .build(),
  CloverMatcha: FormBelongToSpecies.builder()
    .name(`Clover Matcha`)
    .species(Species.Alcremie)
    .form(38)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-matcha')
    .imageSuffix('-matcha-cream-clover')
    .build(),
  CloverMint: FormBelongToSpecies.builder()
    .name(`Clover Mint`)
    .species(Species.Alcremie)
    .form(39)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-mint')
    .imageSuffix('-mint-cream-clover')
    .build(),
  CloverLemon: FormBelongToSpecies.builder()
    .name(`Clover Lemon`)
    .species(Species.Alcremie)
    .form(40)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-lemon')
    .imageSuffix('-lemon-cream-clover')
    .build(),
  CloverSalted: FormBelongToSpecies.builder()
    .name(`Clover Salted`)
    .species(Species.Alcremie)
    .form(41)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-salted')
    .imageSuffix('-salted-cream-clover')
    .build(),
  CloverRubySwirl: FormBelongToSpecies.builder()
    .name(`Clover Ruby Swirl`)
    .species(Species.Alcremie)
    .form(42)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-rubyswirl')
    .imageSuffix('-ruby-swirl-clover')
    .build(),
  CloverCaramel: FormBelongToSpecies.builder()
    .name(`Clover Caramel`)
    .species(Species.Alcremie)
    .form(43)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-caramel')
    .imageSuffix('-caramel-swirl-clover')
    .build(),
  CloverRainbow: FormBelongToSpecies.builder()
    .name(`Clover Rainbow`)
    .species(Species.Alcremie)
    .form(44)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-clover-rainbow')
    .imageSuffix('-rainbow-swirl-clover')
    .build(),

  Flower: FormBelongToSpecies.builder()
    .name(`Flower`)
    .species(Species.Alcremie)
    .form(45)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-vanilla')
    .imageSuffix('-vanilla-cream-flower')
    .build(),
  FlowerRubyCream: FormBelongToSpecies.builder()
    .name(`Flower Ruby Cream`)
    .species(Species.Alcremie)
    .form(46)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-rubycream')
    .imageSuffix('-ruby-cream-flower')
    .build(),
  FlowerMatcha: FormBelongToSpecies.builder()
    .name(`Flower Matcha`)
    .species(Species.Alcremie)
    .form(47)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-matcha')
    .imageSuffix('-matcha-cream-flower')
    .build(),
  FlowerMint: FormBelongToSpecies.builder()
    .name(`Flower Mint`)
    .species(Species.Alcremie)
    .form(48)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-mint')
    .imageSuffix('-mint-cream-flower')
    .build(),
  FlowerLemon: FormBelongToSpecies.builder()
    .name(`Flower Lemon`)
    .species(Species.Alcremie)
    .form(49)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-lemon')
    .imageSuffix('-lemon-cream-flower')
    .build(),
  FlowerSalted: FormBelongToSpecies.builder()
    .name(`Flower Salted`)
    .species(Species.Alcremie)
    .form(50)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-salted')
    .imageSuffix('-salted-cream-flower')
    .build(),
  FlowerRubySwirl: FormBelongToSpecies.builder()
    .name(`Flower Ruby Swirl`)
    .species(Species.Alcremie)
    .form(51)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-rubyswirl')
    .imageSuffix('-ruby-swirl-flower')
    .build(),
  FlowerCaramel: FormBelongToSpecies.builder()
    .name(`Flower Caramel`)
    .species(Species.Alcremie)
    .form(52)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-caramel')
    .imageSuffix('-caramel-swirl-flower')
    .build(),
  FlowerRainbow: FormBelongToSpecies.builder()
    .name(`Flower Rainbow`)
    .species(Species.Alcremie)
    .form(53)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-flower-rainbow')
    .imageSuffix('-rainbow-swirl-flower')
    .build(),

  Ribbon: FormBelongToSpecies.builder()
    .name(`Ribbon`)
    .species(Species.Alcremie)
    .form(54)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-vanilla')
    .imageSuffix('-vanilla-cream-ribbon')
    .build(),
  RibbonRubyCream: FormBelongToSpecies.builder()
    .name(`Ribbon Ruby Cream`)
    .species(Species.Alcremie)
    .form(55)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-rubycream')
    .imageSuffix('-ruby-cream-ribbon')
    .build(),
  RibbonMatcha: FormBelongToSpecies.builder()
    .name(`Ribbon Matcha`)
    .species(Species.Alcremie)
    .form(56)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-matcha')
    .imageSuffix('-matcha-cream-ribbon')
    .build(),
  RibbonMint: FormBelongToSpecies.builder()
    .name(`Ribbon Mint`)
    .species(Species.Alcremie)
    .form(57)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-mint')
    .imageSuffix('-mint-cream-ribbon')
    .build(),
  RibbonLemon: FormBelongToSpecies.builder()
    .name(`Ribbon Lemon`)
    .species(Species.Alcremie)
    .form(58)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-lemon')
    .imageSuffix('-lemon-cream-ribbon')
    .build(),
  RibbonSalted: FormBelongToSpecies.builder()
    .name(`Ribbon Salted`)
    .species(Species.Alcremie)
    .form(59)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-salted')
    .imageSuffix('-salted-cream-ribbon')
    .build(),
  RibbonRubySwirl: FormBelongToSpecies.builder()
    .name(`Ribbon Ruby Swirl`)
    .species(Species.Alcremie)
    .form(60)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-rubyswirl')
    .imageSuffix('-ruby-swirl-ribbon')
    .build(),
  RibbonCaramel: FormBelongToSpecies.builder()
    .name(`Ribbon Caramel`)
    .species(Species.Alcremie)
    .form(61)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-caramel')
    .imageSuffix('-caramel-swirl-ribbon')
    .build(),
  RibbonRainbow: FormBelongToSpecies.builder()
    .name(`Ribbon Rainbow`)
    .species(Species.Alcremie)
    .form(62)
    .flags(FormFlag.AlterForm, FormFlag.DisplayFormName)
    .spriteSuffix('-ribbon-rainbow')
    .imageSuffix('-rainbow-swirl-ribbon')
    .build(),

  /**
   * Returns all forms of Alcremie.
   * @returns {FormBelongToSpecies[]} All forms of Alcremie.
   */
  values(): FormBelongToSpecies[] {
    return [
      EnumAlcremie.StrawBerry,
      EnumAlcremie.StrawBerryRubyCream,
      EnumAlcremie.StrawBerryMatcha,
      EnumAlcremie.StrawBerryMint,
      EnumAlcremie.StrawBerryLemon,
      EnumAlcremie.StrawBerrySalted,
      EnumAlcremie.StrawBerryRubySwirl,
      EnumAlcremie.StrawBerryCaramel,
      EnumAlcremie.StrawBerryRainbow,

      EnumAlcremie.Berry,
      EnumAlcremie.BerryRubyCream,
      EnumAlcremie.BerryMatcha,
      EnumAlcremie.BerryMint,
      EnumAlcremie.BerryLemon,
      EnumAlcremie.BerrySalted,
      EnumAlcremie.BerryRubySwirl,
      EnumAlcremie.BerryCaramel,
      EnumAlcremie.BerryRainbow,

      EnumAlcremie.Love,
      EnumAlcremie.LoveRubyCream,
      EnumAlcremie.LoveMatcha,
      EnumAlcremie.LoveMint,
      EnumAlcremie.LoveLemon,
      EnumAlcremie.LoveSalted,
      EnumAlcremie.LoveRubySwirl,
      EnumAlcremie.LoveCaramel,
      EnumAlcremie.LoveRainbow,

      EnumAlcremie.Clover,
      EnumAlcremie.CloverRubyCream,
      EnumAlcremie.CloverMatcha,
      EnumAlcremie.CloverMint,
      EnumAlcremie.CloverLemon,
      EnumAlcremie.CloverSalted,
      EnumAlcremie.CloverRubySwirl,
      EnumAlcremie.CloverCaramel,
      EnumAlcremie.CloverRainbow,

      EnumAlcremie.Flower,
      EnumAlcremie.FlowerRubyCream,
      EnumAlcremie.FlowerMatcha,
      EnumAlcremie.FlowerMint,
      EnumAlcremie.FlowerLemon,
      EnumAlcremie.FlowerSalted,
      EnumAlcremie.FlowerRubySwirl,
      EnumAlcremie.FlowerCaramel,
      EnumAlcremie.FlowerRainbow,

      EnumAlcremie.Ribbon,
      EnumAlcremie.RibbonRubyCream,
      EnumAlcremie.RibbonMatcha,
      EnumAlcremie.RibbonMint,
      EnumAlcremie.RibbonLemon,
      EnumAlcremie.RibbonSalted,
      EnumAlcremie.RibbonRubySwirl,
      EnumAlcremie.RibbonCaramel,
      EnumAlcremie.RibbonRainbow
    ]
  },

  /**
   * Returns the form with the given name that is a member of this enum.
   *
   * @param {string} value The name of the form to return.
   * @returns {FormBelongToSpecies} The form with the given name.
   * @throws {IllegalArgumentException} If the given name is not a member of this enum.
   */
  valueOf(
    value:
      | 'StrawBerry'
      | 'StrawBerryRubyCream'
      | 'StrawBerryMatcha'
      | 'StrawBerryMint'
      | 'StrawBerryLemon'
      | 'StrawBerrySalted'
      | 'StrawBerryRubySwirl'
      | 'StrawBerryCaramel'
      | 'StrawBerryRainbow'
      | 'Berry'
      | 'BerryRubyCream'
      | 'BerryMatcha'
      | 'BerryMint'
      | 'BerryLemon'
      | 'BerrySalted'
      | 'BerryRubySwirl'
      | 'BerryCaramel'
      | 'BerryRainbow'
      | 'Love'
      | 'LoveRubyCream'
      | 'LoveMatcha'
      | 'LoveMint'
      | 'LoveLemon'
      | 'LoveSalted'
      | 'LoveRubySwirl'
      | 'LoveCaramel'
      | 'LoveRainbow'
      | 'Clover'
      | 'CloverRubyCream'
      | 'CloverMatcha'
      | 'CloverMint'
      | 'CloverLemon'
      | 'CloverSalted'
      | 'CloverRubySwirl'
      | 'CloverCaramel'
      | 'CloverRainbow'
      | 'Flower'
      | 'FlowerRubyCream'
      | 'FlowerMatcha'
      | 'FlowerMint'
      | 'FlowerLemon'
      | 'FlowerSalted'
      | 'FlowerRubySwirl'
      | 'FlowerCaramel'
      | 'FlowerRainbow'
      | 'Ribbon'
      | 'RibbonRubyCream'
      | 'RibbonMatcha'
      | 'RibbonMint'
      | 'RibbonLemon'
      | 'RibbonSalted'
      | 'RibbonRubySwirl'
      | 'RibbonCaramel'
      | 'RibbonRainbow'
      | null
  ): FormBelongToSpecies {
    switch (value?.toLowerCase()) {
      case `strawberry`:
        return EnumAlcremie.StrawBerry
      case `strawberryrubycream`:
        return EnumAlcremie.StrawBerryRubyCream
      case `strawberrymatcha`:
        return EnumAlcremie.StrawBerryMatcha
      case `strawberrymint`:
        return EnumAlcremie.StrawBerryMint
      case `strawberrylemon`:
        return EnumAlcremie.StrawBerryLemon
      case `strawberrysalted`:
        return EnumAlcremie.StrawBerrySalted
      case `strawberryrubyswirl`:
        return EnumAlcremie.StrawBerryRubySwirl
      case `strawberrycaramel`:
        return EnumAlcremie.StrawBerryCaramel
      case `strawberryrainbow`:
        return EnumAlcremie.StrawBerryRainbow

      case `berry`:
        return EnumAlcremie.Berry
      case `berryrubycream`:
        return EnumAlcremie.BerryRubyCream
      case `berrymatcha`:
        return EnumAlcremie.BerryMatcha
      case `berrymint`:
        return EnumAlcremie.BerryMint
      case `berrylemon`:
        return EnumAlcremie.BerryLemon
      case `berrysalted`:
        return EnumAlcremie.BerrySalted
      case `berryrubyswirl`:
        return EnumAlcremie.BerryRubySwirl
      case `berrycaramel`:
        return EnumAlcremie.BerryCaramel
      case `berryrainbow`:
        return EnumAlcremie.BerryRainbow

      case `love`:
        return EnumAlcremie.Love
      case `loverubycream`:
        return EnumAlcremie.LoveRubyCream
      case `lovematcha`:
        return EnumAlcremie.LoveMatcha
      case `lovemint`:
        return EnumAlcremie.LoveMint
      case `lovelemon`:
        return EnumAlcremie.LoveLemon
      case `lovesalted`:
        return EnumAlcremie.LoveSalted
      case `loverubyswirl`:
        return EnumAlcremie.LoveRubySwirl
      case `lovecaramel`:
        return EnumAlcremie.LoveCaramel
      case `loverainbow`:
        return EnumAlcremie.LoveRainbow

      case `flower`:
        return EnumAlcremie.Flower
      case `flowerrubycream`:
        return EnumAlcremie.FlowerRubyCream
      case `flowermatcha`:
        return EnumAlcremie.FlowerMatcha
      case `flowermint`:
        return EnumAlcremie.FlowerMint
      case `flowerlemon`:
        return EnumAlcremie.FlowerLemon
      case `flowersalted`:
        return EnumAlcremie.FlowerSalted
      case `flowerrubyswirl`:
        return EnumAlcremie.FlowerRubySwirl
      case `flowercaramel`:
        return EnumAlcremie.FlowerCaramel
      case `flowerrainbow`:
        return EnumAlcremie.FlowerRainbow

      case `ribbon`:
        return EnumAlcremie.Ribbon
      case `ribbonrubycream`:
        return EnumAlcremie.RibbonRubyCream
      case `ribbonmatcha`:
        return EnumAlcremie.RibbonMatcha
      case `ribbonmint`:
        return EnumAlcremie.RibbonMint
      case `ribbonlemon`:
        return EnumAlcremie.RibbonLemon
      case `ribbonsalted`:
        return EnumAlcremie.RibbonSalted
      case `ribbonrubyswirl`:
        return EnumAlcremie.RibbonRubySwirl
      case `ribboncaramel`:
        return EnumAlcremie.RibbonCaramel
      case `ribbonrainbow`:
        return EnumAlcremie.RibbonRainbow

      default:
        throw new IllegalArgumentException(`Unknown value: ${value}`)
    }
  }
} as const
