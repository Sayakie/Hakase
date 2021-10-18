/**
 * @fileoverview Validates
 * @author Sayakie <sayakie@kakao.com>
 */

import assert from 'assert'
import fs from 'fs/promises'
import semver from 'semver'
import { $ } from 'zx'

/** @type {boolean} */
let isDevEnvironment

try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { default: test } = await import('prettier')

  if (test.version) isDevEnvironment = true
} catch {} // eslint-disable-line no-empty

// Early quit if not in development
if (!isDevEnvironment) {
  process.exit(0) // eslint-disable-line no-process-exit
}

$.verbose = false

assert(
  process.argv.length >= 3,
  'Expected to receive a package.json file path to parse'
)

const packageFilePath = process.argv[2]
let packageData = null

try {
  const packageDataBuf = await fs.readFile(packageFilePath)

  packageData = JSON.parse(packageDataBuf)
} catch (error) {
  assert(
    false,
    `Expected to be able to parse ${packageFilePath} as json ` +
      `but we got this error instead: ${error}`
  )
}

const devEngines = packageData.devEngines
if (devEngines.node !== undefined) {
  assert(
    // First check "devEngines.node" are valid semver
    semver.validRange(devEngines.node),
    `devEngines.node (${devEngines.node}) is not a valid semver range`
  )

  // Then actually check out version satisfies
  let nodeVersion = process.version
  nodeVersion = nodeVersion.node ?? nodeVersion
  assert(
    semver.satisfies(nodeVersion, devEngines.node),
    'Current node version is not supported for development, ' +
      `expected "${nodeVersion}" to satisfy "${devEngines.node}".`
  )
}

if (devEngines.pnpm !== undefined) {
  // First check "devEngines.pnpm" are valid semver
  assert(
    semver.validRange(devEngines.pnpm),
    `devEngines.pnpm (${devEngines.pnpm}) is not a valid semver range`
  )

  const { stderr, stdout, exitCode } = await $`pnpm --version`
  assert(exitCode === 0, `Failed to get pnpm version ` + stderr)

  let pnpmVersion = stdout.trim()
  assert(
    semver.satisfies(pnpmVersion, devEngines.pnpm),
    'Current pnpm version is not supported for development, ' +
      `expected "${pnpmVersion}" to satisfy "${devEngines.pnpm}."`
  )
}
