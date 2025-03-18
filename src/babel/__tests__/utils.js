import {format} from 'prettier'

export function formatCode(code) {
  return format(code, {
    semi: false,
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    jsxBracketSameLine: true,
    arrowParens: 'avoid',
    parser: 'babel',
  })
}
