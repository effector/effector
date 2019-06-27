// @flow

import {combine, createStore, type Store} from 'effector'
import {typechecker} from '../settings/domain'

const filename = createStore('repl.js').on(typechecker, (_, typechecker) => {
  if (typechecker === 'typescript') return 'repl.ts'
  return 'repl.js'
})

const typecheckerPreset = typechecker.map(typechecker => {
  switch (typechecker) {
    case 'flow':
      return [['flow', {all: true}]]
    case 'typescript':
      return [
        [
          'typescript',
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ]
    default:
      return []
  }
})

export const babelOptions: Store<any> = combine(
  filename,
  typecheckerPreset,
  (filename, typecheckerPreset) => ({
    filename,
    sourceFileName: filename,
    presets: ['react', ...typecheckerPreset],
    parserOpts: {
      allowAwaitOutsideFunction: true,
    },
    plugins: [
      'transform-strict-mode',
      'syntax-bigint',
      'syntax-dynamic-import',
      'proposal-numeric-separator',
      'proposal-nullish-coalescing-operator',
      'proposal-optional-chaining',
      ['proposal-class-properties', {loose: true}],
      'effector/babel-plugin-react',
      'effector/babel-plugin',
      '@effector/repl-remove-imports',
    ],
    sourceMaps: 'inline',
  }),
)
