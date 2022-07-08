/**
 * @fileoverview Represents strategy how Prettier formatting
 * @author Sayakie <sayakie@kakao.com>
 */

/** @type {import('prettier').Options} */
module.exports = {
  parser: 'typescript',
  semi: false,
  useTabs: false,
  singleQuote: true,
  tabWidth: 2,
  printWidth: 100,
  endOfLine: 'lf',
  quoteProps: 'as-needed',
  arrowParens: 'avoid',
  bracketSpacing: true,
  trailingComma: 'none'
}
