module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    ENV: true
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  parserOptions: {
    project: "./tsconfig.json",
    sourceType: "module",
    ecmaFeatures: {
      globalReturn: true,
      impliedStrict: true,
      experimentalObjectRestSpread: true
    },
    extraFileExtensions: [".ts", ".tsx"]
  },
  rules: {
    "no-var": "off",
    indent: [0, 2],
    quotes: "off",
    semi: [1, "always"],
    "no-useless-escape": [0, "off"],
    "no-unsafe-finally": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/restrict-plus-operands": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-floating-promises": "off"
  }
};
