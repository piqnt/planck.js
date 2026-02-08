import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  // ...tseslint.configs.recommendedTypeChecked,
  // ...tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.ts"],

    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "no-var": "off",
      "prefer-rest-params": "off",
      "prefer-spread": "off",
      "quotes": ["warn", "double"],
      "semi": ["warn", "always"],
      "one-var-declaration-per-line": "warn",
      "no-constant-condition": "warn",
      "no-empty": "warn",
      "no-prototype-builtins": "warn",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/typedef": [
        "error",
        {
          propertyDeclaration: true,
        },
      ],
    },
  },
  prettierConfig,
]);
