import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import alias from "@rollup/plugin-alias";
import json from "@rollup/plugin-json";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import { eslint } from "rollup-plugin-eslint";
import typescript from "rollup-plugin-typescript2";
import sourceMaps from "rollup-plugin-sourcemaps";
import path from "path";

import pkg from "./package.json";
const isDev = process.env.NODE_ENV !== "production";
const projectRootDir = path.resolve(__dirname);
const customResolver = resolve({
  extensions: [".js", ".ts", ".d.ts", ".json"]
});

export default {
  input: "src/index.ts",
  external: ["axios", "express"],
  plugins: [
    resolve(),
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
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve(projectRootDir, "src")
        }
      ],
      customResolver
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
    // {
    //   file: pkg.browser,
    //   sourcemap: isDev ? true : false,
    //   format: "iife",
    //   name: "windSDK",
    //   globals: {
    //     axios: "axios"
    //   }
    // }
  ]
};
