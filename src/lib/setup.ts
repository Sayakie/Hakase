/* eslint-disable import/first */
process.env.NODE_ENV ??= "development";

import "@frutbits/pino-logger/register";
import "@sapphire/plugin-i18next/register";
import "#lib/config.js";

import { inspect } from "node:util";

import { createColors } from "colorette";

import { injectStats } from "#lib/inject/statInjector.js";

inspect.defaultOptions.depth = 2;

createColors({ useColor: true });

await injectStats();
