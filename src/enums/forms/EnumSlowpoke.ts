import type { EnumForm } from '@/enums/EnumForm.js'
import { RegionalForm } from '@/enums/forms/RegionalForm.js'

export class EnumSlowpoke {
  public static readonly Galarian = RegionalForm.Galarian.clone().setForm(1)

  public static values(): EnumForm[] {
    return [this.Galarian]
  }
}
