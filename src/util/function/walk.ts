import mergeOptions from 'merge-options'
import type { Options as WalkOptions } from 'walk-sync'
import walkSync from 'walk-sync'

export const walkDefaultOptions: WalkOptions = {
  directories: false,
  globs: ['**/*.+(ts|js)'],
  ignore: ['test/**/*', '*.(test|module).+(ts|js)'],
  includeBasePath: true
}

export function walk(
  directory: string,
  walkOptions?: WalkOptions
): ReadonlyArray<string> {
  walkOptions = mergeOptions(walkDefaultOptions, walkOptions)

  return walkSync(directory, walkOptions)
}
