import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("plugin:@typescript-eslint/recommended"), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        parser: tsParser,
    },

    rules: {
        "no-var": "off",
        "prefer-rest-params": "off",
        "prefer-spread": "off",
        quotes: ["warn", "double"],
        semi: ["warn", "always"],
        "one-var-declaration-per-line": "warn",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-var-requires": "off",

        "@typescript-eslint/typedef": ["error", {
            propertyDeclaration: true,
        }],
    },
}];