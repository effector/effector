//@flow

//$todo
import {transform, registerPlugin, availablePlugins} from '@babel/standalone'

export type BabelPlugin = string | [string, Object]

function writeStuckFlag(stuck: boolean) {
  try {
    localStorage.setItem('runtime/stuck', JSON.stringify(stuck))
  } catch (err) {}
}

export async function exec({
  realmGlobal,
  code,
  globalBlocks = [],
  types = 'typescript',
  filename = 'repl',
  pluginRegistry = {},
  compile = true,
  onCompileError,
  onRuntimeError,
  onCompileComplete,
  onRuntimeComplete,
}: {
  realmGlobal: any,
  code: string,
  globalBlocks?: Object[],
  types?: 'flow' | 'typescript',
  filename?: string,
  pluginRegistry?: {[name: string]: any, ...},
  compile?: boolean,
  onCompileError?: (error: any) => any,
  onRuntimeError?: (error: any) => any,
  onCompileComplete?: (code: string, babelConfig: any) => any,
  onRuntimeComplete?: () => any,
}) {
  const globalFull = Object.assign({}, ...[...globalBlocks].reverse())
  Object.assign(realmGlobal, globalFull)
  let compiled = code
  if (compile) {
    for (const key in pluginRegistry) {
      delete availablePlugins[key]
      registerPlugin(key, pluginRegistry[key])
    }
    const babelOptions = generateBabelConfig({types, filename})
    try {
      compiled = transformCode(code, babelOptions)
      if (onCompileComplete) await onCompileComplete(compiled, babelOptions)
    } catch (error) {
      if (onCompileError) await onCompileError(error)
      throw error
    }
  }
  writeStuckFlag(true)
  try {
    const result = await realmGlobal.eval(compiled)
    if (onRuntimeComplete) await onRuntimeComplete()
    return result
  } catch (error) {
    if (onRuntimeError) await onRuntimeError(error)
    throw error
  } finally {
    writeStuckFlag(false)
  }
}

function transformCode(code: string, babelOptions): string {
  const compiled = transform(code, babelOptions).code
  const wrappedCode = `async function main() {

${compiled}

}
main()
//# sourceURL=${babelOptions.filename}`
  return wrappedCode
}

function generateBabelConfig({types, filename}) {
  const presets: BabelPlugin[] = ['react']
  const plugins: BabelPlugin[] = [
    'transform-strict-mode',
    'syntax-bigint',
    'syntax-dynamic-import',
    // '@effector/repl-highlight',
    'proposal-numeric-separator',
    'proposal-nullish-coalescing-operator',
    'proposal-optional-chaining',
    ['proposal-class-properties', {loose: true}],
    'effector/babel-plugin-react',
    [
      'effector/babel-plugin',
      {
        addLoc: true,
      },
    ],
    '@effector/repl-remove-imports',
  ]
  if (!/\.[jt]sx?$/.test(filename)) {
    filename = `${filename}.${types === 'typescript' ? 't' : 'j'}s`
  }
  switch (types) {
    case 'flow':
      presets.push(['flow', {all: true}])
      break
    case 'typescript':
    case 'ts':
      presets.push([
        'typescript',
        {
          isTSX: true,
          allExtensions: true,
        },
      ])
      break
  }
  return {
    filename,
    sourceFileName: filename,
    presets,
    parserOpts: {
      allowAwaitOutsideFunction: true,
      ranges: true,
      tokens: true,
    },
    generatorOpts: {
      shouldPrintComment: () => true,
    },
    plugins,
    sourceMaps: 'inline',
  }
}
