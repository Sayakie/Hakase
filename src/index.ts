import { setup } from "#lib/setup.js";

import * as Log from "#lib/output/log.js";

const isForcedSlient =
  "FORCE_SILENT" in process.env || process.argv.includes("--slient");
const isProduction = process.env.NODE_ENV === "production";
// eslint-disable-next-line @typescript-eslint/naming-convention
const slient = isForcedSlient || isProduction;

await setup({ slient });
Log.trace("Environment loaded.");

await import("./bot.js").then((bot) => bot.connect());
