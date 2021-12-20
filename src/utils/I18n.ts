import type { InitOptions } from 'i18next'
import i18next from 'i18next'
import type { i18nextFsBackend } from 'i18next-fs-backend'
import Backend from 'i18next-fs-backend'
import { join } from 'node:path'

import { LocaleDirectory } from '@/utils/Constants.js'

export interface LocaleOptions {
  defaultName?: string
  defaultNamespaces?: string[]
  backend?: i18nextFsBackend.i18nextFsBackendOptions
  i18next?: InitOptions
  languagesDirectory?: string
}

export class Locale {
  private static instance: Locale | null

  /**
   * The options that Locale was initialized with in.
   *
   * @readonly
   */
  public readonly options: LocaleOptions

  /**
   * Represents a directory passed to `i18next-fs-backend`.
   *
   * @readonly
   * @type {string}
   */
  public readonly languagesDirectory: string

  /**
   * Represents a backend options for `i18next-fs-backend` used by `i18next`.
   *
   * @readonly
   * @type {i18nextFsBackend.i18nextFsBackendOptions}
   */
  public readonly backendOptions: i18nextFsBackend.i18nextFsBackendOptions

  private constructor(options?: LocaleOptions) {
    this.options = options ?? { i18next: { ignoreJSONStructure: false } }
    this.languagesDirectory = this.options.languagesDirectory ?? LocaleDirectory
    this.backendOptions = {
      addPath: this.languagesDirectory,
      loadPath: join(this.languagesDirectory, '{{lng}}', '{{ns}}.json'),
      ...this.options.backend
    }
  }

  public static getInstance(): Locale
  public static getInstance(options?: LocaleOptions): Locale {
    if (!this.instance) {
      this.instance = new Locale(options)
    }

    return this.instance
  }

  public async init(): Promise<void> {
    i18next.use(Backend)
    await i18next.init({
      backend: this.backendOptions,
      defaultNS: 'Generic',
      fallbackLng: this.options.defaultName ?? 'en-US',
      initImmediate: false,
      load: 'all',
      ns: this.options.defaultNamespaces ?? [
        `Ability`,
        `Biome`,
        `Evolution`,
        `Generic`,
        `Item`,
        `Misc`,
        `Move`,
        `Pixelmon`
      ],
      preload: ['en-US', 'ko']
    })
  }
}
