import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'tests/**', // Exclut le dossier "tests" à la racine
      '**/*.test.js', // Exclut les fichiers de test Jest
      '**/*.spec.js', // Exclut les fichiers de test Playwright
      "coverage/**",
      "playwright-report/**",
      "node_modules/**",
      "dist/**",
    ],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node, 
      },
    },
  },
  {
    languageOptions: { globals: globals.browser }
  },
  pluginJs.configs.recommended,
];

