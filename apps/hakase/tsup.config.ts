import { createTsupConfig } from '../../tsup.config'

export default createTsupConfig({
  dts: false,
  entry: [`src/**/*.ts`],
  format: [`esm`]
})
