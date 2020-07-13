import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";

import pkg from "./package.json";
const isDev = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.ts",
  external: ["express", "get-port", "glob", "fs"],
  plugins: [
    resolve({
      browser: true,
      preferBuiltins: true
    }),
    commonjs(),
    sourceMaps(),
    json(),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**"],
      exclude: ["node_modules/**"]
    }),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true
    }),
    !isDev && terser()
  ],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: isDev ? true : false
    },
    { file: pkg.module, format: "esm", sourcemap: isDev ? true : false }
  ]
};
