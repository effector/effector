//@flow
//$todo
import PluginEffectorReact from '@effector/babel-plugin-react'

//$todo
import PluginEffector from '@effector/babel-plugin'
//$todo
import PresetReact from '@babel/preset-react'
//$todo
import PresetFlow from '@babel/preset-flow'
//$todo
import PluginClassProps from '@babel/plugin-proposal-class-properties'
//$todo
import PluginNullish from '@babel/plugin-proposal-nullish-coalescing-operator'
//$todo
import PluginOptional from '@babel/plugin-proposal-optional-chaining'
//$todo
import {transform, registerPlugin, registerPreset} from '@babel/standalone'

registerPreset('@babel/preset-react', PresetReact)
registerPreset('@babel/preset-flow', PresetFlow)

registerPlugin('@babel/plugin-proposal-class-properties', PluginClassProps)
registerPlugin(
  '@babel/plugin-proposal-nullish-coalescing-operator',
  PluginNullish,
)
registerPlugin('@babel/plugin-proposal-optional-chaining', PluginOptional)

registerPlugin('@effector/babel-plugin', PluginEffector)
registerPlugin('@effector/babel-plugin-react', PluginEffectorReact)

const compileAll = (code: string): string =>
  transform(code, {
    presets: ['@babel/preset-react', '@babel/preset-flow'],
    plugins: [
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@babel/plugin-proposal-optional-chaining',
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      '@effector/babel-plugin-react',
      '@effector/babel-plugin',
    ],
  }).code
export const transformCode = (code: string): string => compileAll(code)
