import { EnumForm } from '@/enums/EnumForm.js'

const form = EnumForm.of('Unown').addFlags('ExposeMeta')

export class EnumUnown {
  public static readonly A = form.clone().setForm(0).setSpriteSuffix('-a')
  public static readonly B = form.clone().setForm(0).setSpriteSuffix('-b')
  public static readonly C = form.clone().setForm(0).setSpriteSuffix('-c')
  public static readonly D = form.clone().setForm(0).setSpriteSuffix('-d')
  public static readonly E = form.clone().setForm(0).setSpriteSuffix('-e')
  public static readonly F = form.clone().setForm(0).setSpriteSuffix('-f')
  public static readonly G = form.clone().setForm(0).setSpriteSuffix('-g')
  public static readonly H = form.clone().setForm(0).setSpriteSuffix('-h')
  public static readonly I = form.clone().setForm(0).setSpriteSuffix('-i')
  public static readonly J = form.clone().setForm(0).setSpriteSuffix('-j')
  public static readonly K = form.clone().setForm(0).setSpriteSuffix('-k')
  public static readonly L = form.clone().setForm(0).setSpriteSuffix('-l')
  public static readonly M = form.clone().setForm(0).setSpriteSuffix('-m')
  public static readonly N = form.clone().setForm(0).setSpriteSuffix('-n')
  public static readonly O = form.clone().setForm(0).setSpriteSuffix('-o')
  public static readonly P = form.clone().setForm(0).setSpriteSuffix('-p')
  public static readonly Q = form.clone().setForm(0).setSpriteSuffix('-q')
  public static readonly R = form.clone().setForm(0).setSpriteSuffix('-r')
  public static readonly S = form.clone().setForm(0).setSpriteSuffix('-s')
  public static readonly T = form.clone().setForm(0).setSpriteSuffix('-t')
  public static readonly U = form.clone().setForm(0).setSpriteSuffix('-u')
  public static readonly V = form.clone().setForm(0).setSpriteSuffix('-v')
  public static readonly W = form.clone().setForm(0).setSpriteSuffix('-w')
  public static readonly X = form.clone().setForm(0).setSpriteSuffix('-x')
  public static readonly Y = form.clone().setForm(0).setSpriteSuffix('-y')
  public static readonly Z = form.clone().setForm(0).setSpriteSuffix('-z')
  public static readonly Question = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-question')
    .setImageSuffix('-qm')
  public static readonly Exclamation = form
    .clone()
    .setForm(0)
    .setSpriteSuffix('-exclamation')
    .setImageSuffix('-em')

  public static values(): EnumForm[] {
    return [
      this.A,
      this.B,
      this.C,
      this.D,
      this.E,
      this.F,
      this.G,
      this.H,
      this.I,
      this.J,
      this.K,
      this.L,
      this.M,
      this.N,
      this.O,
      this.P,
      this.Q,
      this.R,
      this.S,
      this.T,
      this.U,
      this.V,
      this.W,
      this.X,
      this.Y,
      this.Z,
      this.Question,
      this.Exclamation
    ]
  }
}
