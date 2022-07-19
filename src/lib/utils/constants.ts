import { join } from 'node:path'
import { URL } from 'node:url'

const root = new URL(`../`, import.meta.url)

export const Directories = {
  Data: new URL(join(`data`), root),
  Root: root
} as const

export enum ResourceIdentifiers {
  // Main resource head
  MINECRAFT = `minecraft`,
  PIXELMON = `pixelmon`,
  FORGE = `forge`
}

export enum BrandingColors {
  Primary = 0x06d6a0,
  Secondary = 0xa08de9,
  Info = 0x608bda,
  Warn = 0xf1c40f,
  Danger = 0xe22b46
}

export enum MemoryUnits {
  MiB = 1048576
}
