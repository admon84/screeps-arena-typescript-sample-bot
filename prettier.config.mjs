/** @type {import("prettier").Config} */
export default {
  semi: true,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 120,
  arrowParens: 'avoid',
  endOfLine: 'auto',
  organizeImportsSkipDestructiveCodeActions: true,
  plugins: ['prettier-plugin-organize-imports'],
};
