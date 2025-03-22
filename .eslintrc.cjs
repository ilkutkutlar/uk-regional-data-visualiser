/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "sort-imports": ["error", { ignoreCase: true, allowSeparatedGroups: true }],
    "no-duplicate-imports": "error",
    "no-use-before-define": "error",
    complexity: "warn",
    "dot-notation": "warn",
    eqeqeq: "error",
    "func-style": "warn",
    "new-cap": "warn",
    "no-console": "error",
    "no-extra-bind": "warn",
  },
};
