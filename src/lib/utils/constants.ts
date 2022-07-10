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
  Primary = 0x06d6a0
}

export const enum MemoryUnits {
  MiB = 1048576
}
