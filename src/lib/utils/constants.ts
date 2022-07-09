import { URL } from 'node:url'

const root = new URL(`../../../`, import.meta.url)

export const Directories = {
  Data: new URL(`data`, root),
  Root: root
}

export const enum ResourceIdentifiers {
  // Main resource head
  MINECRAFT = `minecraft`,
  PIXELMON = `pixelmon`,
  FORGE = `forge`
}
