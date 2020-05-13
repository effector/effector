//@noflow

const {resolve: resolvePath, join} = require('path')

module.exports = api => {
  api && api.cache && api.cache.never && api.cache.never()
  // const env = api.cache(() => process.env.NODE_ENV)
  return generateConfig(meta, babelConfig)

  function generateConfig(meta, config) {
    const result = {}
    for (const key in config) {
      const value = config[key]
      result[key] = typeof value === 'function' ? value(meta) : value
    }
    return result
  }
}

const meta = {
  isBuild: !!process.env.IS_BUILD,
  isTest: process.env.NODE_ENV === 'test',
  isCompat: false,
}

const isBrowserstackDomTest = !!process.env.DOM

const typesTestsPath = join('types', '__tests__')
const domTestsPath = join('dom', '__tests__')

const aliases = {
  'effector/fixtures': 'fixtures',
  '@effector/forms': 'forms',
  'effector-react': 'react',
  'effector-vue': 'vue',
  Builder: '../tools/builder',
  effector({isTest, isBuild, isCompat}) {
    if (isCompat) return 'effector/compat'
    if (isBuild) return null
    if (isTest) return resolveFromSources('./effector')
    return resolveFromSources('../npm/effector')
  },
}

const babelPlugin = resolvePath(__dirname, 'src', 'babel', 'babel-plugin.js')
const locationPlugin = resolvePath(
  __dirname,
  'src',
  'types',
  'src',
  'locationPlugin.js',
)
const jsdomTestPlugin = resolvePath(
  __dirname,
  'src',
  'dom',
  '__fixtures__',
  'jsdomTestPlugin.js',
)
const babelConfig = {
  presets: [
    ['@babel/preset-react', {useBuiltIns: true}],
    [
      '@babel/preset-env',
      {
        loose: true,
        useBuiltIns: 'entry',
        corejs: 3,
        modules: false,
        shippedProposals: true,
        targets: {
          node: '10',
          browsers: [
            'last 2 Chrome versions',
            'last 2 Firefox versions',
            'last 2 Safari versions',
            'last 1 Edge versions',
          ],
        },
      },
    ],
  ],
  plugins(meta) {
    const alias = parseAliases(meta, aliases)
    const result = [
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      ['@babel/plugin-proposal-class-properties', {loose: true}],
      [
        'babel-plugin-module-resolver',
        {
          alias,
        },
      ],
    ]
    if (meta.isTest) {
      result.push('@babel/plugin-transform-modules-commonjs')
    }
    if (meta.isBuild) {
      const constToLetPlugin = resolvePath(
        __dirname,
        'src',
        'babel',
        'constToLet.js',
      )
      result.unshift(constToLetPlugin)
    }
    return result
  },
  overrides: [
    {
      test(filename) {
        return (
          !isBrowserstackDomTest && filename && filename.includes(domTestsPath)
        )
      },
      plugins: [jsdomTestPlugin],
    },
    {
      test(filename) {
        return filename && filename.includes(typesTestsPath)
      },
      plugins: [locationPlugin],
    },
    {
      test(filename) {
        return (
          filename &&
          filename.includes('__tests__') &&
          !filename.includes('redux') &&
          !filename.includes('browserstack') &&
          !filename.includes('fromObservable')
        )
      },
      plugins: [
        [
          babelPlugin,
          {
            addLoc: true,
          },
        ],
      ],
    },
    {
      test(filename) {
        return (
          filename && (filename.endsWith('.tsx') || filename.endsWith('.ts'))
        )
      },
      presets: [
        [
          '@babel/preset-typescript',
          {
            isTSX: true,
            allExtensions: true,
          },
        ],
      ],
    },
    {
      test(filename) {
        return (
          filename && !(filename.endsWith('.tsx') || filename.endsWith('.ts'))
        )
      },
      presets: ['@babel/preset-flow'],
    },
  ],
  sourceMaps: true,
}

function parseAliases(meta, obj) {
  const result = {}
  for (const key in obj) {
    const value = obj[key]
    if (typeof value === 'function') {
      const name = value(meta)
      if (name === undefined || name === null) continue
      result[key] = name
    } else {
      const name = value
      if (name === undefined || name === null) continue
      result[key] = resolveFromSources(name)
    }
  }
  return result
}
function resolveFromSources(path) {
  return resolvePath(__dirname, 'src', path)
}
module.exports.getAliases = (metadata = meta) => parseAliases(metadata, aliases)
