import { readFileSync } from 'node:fs'

import { RootDirectory } from '../Constant.mjs'

interface PackageStruct {
  version: string
}

export function getPackageVersion(): string {
  try {
    const { version } = JSON.parse(
      readFileSync(`${RootDirectory}/package.json`).toString()
    ) as PackageStruct

    return version
  } catch {
    return `Unknown`
  }
}
