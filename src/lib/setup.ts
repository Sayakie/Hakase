import "@frutbits/pino-logger/register";
import { loadEnvConfig } from "@next/env";
import "@sapphire/plugin-i18next/register";
import { noop } from "@sapphire/utilities";
import { createColors } from "colorette";
import { injectStats } from "#lib/inject/statInjector.js";
import * as Log from "#lib/output/log.js";
import { getProjectDir } from "./get-project-dir.js";

export interface SetupOptions {
  slient?: boolean;
}

export async function setup({ slient = false }: SetupOptions): Promise<void> {
  createColors();

  const logger = slient ? { error: noop, info: noop, warn: noop } : Log;

  const projectDir = getProjectDir();

  //! `env` from ["./env.ts"] cannot be used here because it is havn't been loaded yet.
  loadEnvConfig(projectDir, process.env.NODE_ENV === "development", logger);

  await injectStats();
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/ban-types
      NODE_ENV: "development" | "production" | (string & {});
    }
  }
}
