import { RootDirectory } from 'io/github/sayakie/hakase/Constant.mjs'
import { readFileSync } from 'node:fs'

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
