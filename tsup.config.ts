/* eslint-disable import/no-extraneous-dependencies */
import { relative, resolve } from "node:path";
import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  dts: false,
  entry: ["src/**/*.ts"],
  format: ["esm"],
  keepNames: true,
  minify: true,
  noExternal: [],
  replaceNodeEnv: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: "esnext",
  tsconfig: relative(__dirname, resolve(process.cwd(), "tsconfig.json")),
});
