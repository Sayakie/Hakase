import { $ } from 'zx'

/** @type {boolean} */
let isDevEnvironment

try {
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { default: test } = await import('prettier')

  if (test.version) isDevEnvironment = true
} catch {} // eslint-disable-line no-empty

if (isDevEnvironment) {
  $.verbose = false

  await $`pnpx ts-patch install`
}
