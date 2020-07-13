module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ENV: true
  },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    indent: [0, 2],
    quotes: ["error", "double"],
    semi: [1, "always"],
    "no-useless-escape": [0, "off"],
    "no-unsafe-finally": "off",
    "no-unused-vars": "off"
  }
};
