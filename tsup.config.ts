/* eslint-disable import/no-extraneous-dependencies */
import { relative, resolve } from 'node:path'
import { type Options, defineConfig } from 'tsup'

type ConfigOptions = Pick<
  Options,
  | 'globalName'
  | 'minify'
  | 'entry'
  | 'format'
  | 'target'
  | 'sourcemap'
  | 'skipNodeModulesBundle'
  | 'noExternal'
  | 'esbuildOptions'
  | 'dts'
>

export const createTsupConfig = ({
  globalName,
  format = [`esm`, `cjs`],
  target = `es2022`,
  sourcemap = true,
  minify = false,
  entry = [`src/index.ts`],
  skipNodeModulesBundle = true,
  noExternal,
  dts = true,
  esbuildOptions = (options, context) => {
    if (context.format === `cjs`) {
      // eslint-disable-next-line no-param-reassign
      options.banner = {
        js: `"use strict";`
      }
    }
  }
}: ConfigOptions = {}): PromiseLike<Options | Options[]> =>
  // @ts-expect-error - asdf
  defineConfig({
    clean: true,
    dts,
    entry,
    esbuildOptions,
    format,
    globalName,
    keepNames: true,
    minify,
    noExternal,
    replaceNodeEnv: false,
    skipNodeModulesBundle,
    sourcemap,
    target,
    tsconfig: relative(__dirname, resolve(process.cwd(), `tsconfig.json`))
  })
