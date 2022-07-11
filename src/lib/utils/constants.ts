import { join } from 'node:path'
import { URL } from 'node:url'

const root = new URL(`../`, import.meta.url)

export const Directories = {
  Data: new URL(join(`data`), root),
  Root: root
}

export const enum ResourceIdentifiers {
  // Main resource head
  MINECRAFT = `minecraft`,
  PIXELMON = `pixelmon`,
  FORGE = `forge`
}

export const enum BrandingColors {
  Primary = 0x06d6a0,
  Secondary = 0xa08de9,
  Info = 0x608bda,
  Warn = 0xf1c40f,
  Danger = 0xe22b46
}

export const enum MemoryUnits {
  MiB = 1048576
}
