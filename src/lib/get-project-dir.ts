// # Credits to the Vercel Team for the original implementation
// # vercel/next.js, MIT License

import { realpathSync } from "node:fs";
import { resolve } from "node:path";
import * as Log from "#lib/output/log.js";
import { isError } from "./is-error.js";

export function getProjectDir(dir?: string): string {
  try {
    const resolvedDir = resolve(dir || ".");
    const realDir = realpathSync(resolvedDir);

    if (
      resolvedDir !== realDir &&
      resolvedDir.toLowerCase() === realDir.toLowerCase()
    ) {
      Log.warn(
        `Invalid casing detected for project dir, expected "${realDir}" but actual dir is "${resolvedDir}"`,
      );
    }

    return realDir;
  } catch (err: unknown) {
    if (isError(err) && err.code === "ENOENT") {
      const resolvedDir = resolve(dir || ".");

      Log.error(
        `Invalid project directory provided, no such directory: ${resolvedDir}`,
      );
      process.exit(1);
    }

    throw err;
  }
}
