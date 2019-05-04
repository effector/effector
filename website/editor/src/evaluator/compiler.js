//@flow
//$todo
import PluginEffectorReact from '@effector/babel-plugin-react'

//$todo
import PluginEffector from '@effector/babel-plugin'
//$todo
import PluginBigInt from '@babel/plugin-syntax-bigint'
//$todo
// import PresetReact from '@babel/preset-react'
//$todo
// import PresetFlow from '@babel/preset-flow'
//$todo
// import PluginStrictMode from '@babel/plugin-transform-strict-mode'
//$todo
// import PluginClassProps from '@babel/plugin-proposal-class-properties'
//$todo
// import PluginNullish from '@babel/plugin-proposal-nullish-coalescing-operator'
//$todo
// import PluginOptional from '@babel/plugin-proposal-optional-chaining'
//$todo
import {transform, registerPlugin, registerPreset} from '@babel/standalone'

registerPlugin('syntax-bigint', PluginBigInt)

// registerPreset('@babel/preset-react', PresetReact)
// registerPreset('@babel/preset-flow', PresetFlow)

// registerPlugin('@babel/plugin-proposal-class-properties', PluginClassProps)
// registerPlugin(
//   '@babel/plugin-proposal-nullish-coalescing-operator',
//   PluginNullish,
// )
// registerPlugin('@babel/plugin-proposal-optional-chaining', PluginOptional)
// registerPlugin('@babel/plugin-transform-strict-mode', PluginStrictMode)

registerPlugin('@effector/babel-plugin', PluginEffector)
registerPlugin('@effector/babel-plugin-react', PluginEffectorReact)
registerPlugin('@effector/repl-remove-imports', function(babel) {
  return {
    visitor: {
      ImportDeclaration(path) {
        path.remove()
      },
    },
  }
})

const compileAll = (code: string): string =>
  transform(code, {
    filename: 'repl.js',
    sourceFileName: 'repl.js',
    presets: ['react', ['flow', {all: true}]],
    plugins: [
      'transform-strict-mode',
      'syntax-bigint',
      'proposal-numeric-separator',
      'proposal-nullish-coalescing-operator',
      'proposal-optional-chaining',
      ['proposal-class-properties', {loose: true}],
      '@effector/babel-plugin-react',
      '@effector/babel-plugin',
      '@effector/repl-remove-imports',
    ],
    sourceMaps: 'inline',
  }).code
export const transformCode = (code: string): string => compileAll(code)
