import { createTsupConfig } from '../../tsup.config'

export default createTsupConfig({ dts: false, format: [`esm`] })
