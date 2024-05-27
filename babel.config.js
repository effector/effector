const {resolve: resolvePath, join} = require('path')

module.exports = api => {
  api && api.cache && api.cache.never && api.cache.never()
  // const env = api.cache(() => process.env.NODE_ENV)
  return generateConfig(meta, babelConfig)
}

function generateConfig(meta, config = babelConfig) {
  const result = {}
  for (const key in config) {
    const value = config[key]
    result[key] = typeof value === 'function' ? value(meta) : value
  }
  return result
}

module.exports.generateConfig = generateConfig

const meta = {
  isBuild: !!process.env.IS_BUILD,
  isTest: process.env.NODE_ENV === 'test',
  isCompat: false,
  isEsm: false,
  isSolid: false,
}

const isBrowserstackDomTest = !!process.env.DOM

const typesTestsPath = join('types', '__tests__')

const domTestsPath = join('forest', '__tests__')
const domSSRTestsPath = join('forest', '__tests__', 'ssr')
const jsdomTestPlugin = resolvePath(
  __dirname,
  'tools',
  'remoteDeviceTestRunner',
  'jsdomTestPlugin.js',
)

const aliases = {
  'effector/fixtures': resolveFromSources('fixtures'),
  'effector-react/scope': {
    esm: 'effector-react/scope.mjs',
    compat: null,
    build: null,
    test: null,
    default: null,
  },
  'effector-react': {
    esm: 'effector-react/effector-react.mjs',
    compat: 'effector-react/compat',
    build: null,
    test: null,
    default: resolveFromSources('../npm/effector-react'),
  },
  'effector-vue': resolveFromSources('vue'),
  'effector-solid/scope': {
    esm: 'effector-solid/scope.mjs',
    compat: null,
    build: null,
    test: null,
    default: null,
  },
  'effector-solid': resolveFromSources('solid'),
  Builder: resolveFromSources('../tools/builder'),
  effector: {
    esm: 'effector/effector.mjs',
    compat: 'effector/compat',
    build: null,
    test: null,
    default: resolveFromSources('../npm/effector'),
  },
  '^use-sync-external-store/shim/with-selector$': {
    esm: 'use-sync-external-store/shim/with-selector.js',
    compat: 'use-sync-external-store/shim/with-selector.js',
    build: 'use-sync-external-store/shim/with-selector.js',
    test: null,
    default: null,
  },
  '^use-sync-external-store/shim$': {
    esm: 'use-sync-external-store/shim/index.js',
    compat: 'use-sync-external-store/shim/index.js',
    build: 'use-sync-external-store/shim/index.js',
    test: null,
    default: null,
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

const babelConfig = {
  presets(meta) {
    const jsxPreset = meta.isSolid
      ? ['babel-preset-solid']
      : ['@babel/preset-react', {useBuiltIns: true}]

    return [
      jsxPreset,
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
    ]
  },
  plugins(meta) {
    const alias = parseAliases(meta, aliases)
    if (meta.replaceVueNext) {
      alias['vue-next'] = 'vue'
    }
    const result = [
      '@babel/plugin-transform-export-namespace-from',
      '@babel/plugin-transform-optional-chaining',
      '@babel/plugin-transform-nullish-coalescing-operator',
      ['@babel/plugin-transform-class-properties', {loose: true}],
      [
        'babel-plugin-module-resolver',
        {
          alias,
          loglevel: 'silent',
        },
      ],
    ]
    function addSrcPlugin(condition, fileName) {
      if (!condition) return
      const pluginPath = resolvePath(__dirname, 'src', 'babel', fileName)
      result.unshift(pluginPath)
    }
    if (meta.isTest) {
      result.push('@babel/plugin-transform-modules-commonjs')
    }
    addSrcPlugin(meta.replaceVueReactivity, 'vueImports.js')
    addSrcPlugin(meta.replaceReactShim, 'reactShimImports.js')
    return result
  },
  overrides: [
    {
      test(filename) {
        return (
          !isBrowserstackDomTest &&
          filename &&
          filename.includes(domTestsPath) &&
          !filename.includes(domSSRTestsPath)
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
          !filename.includes('compat') &&
          !filename.includes('observable')
        )
      },
      plugins: [
        [
          babelPlugin,
          {
            addLoc: true,
            factories: ['src/effector/__tests__/fork/factory'],
          },
        ],
      ],
    },
    {
      test(filename) {
        return filename && filename.includes('multiPass')
      },
      plugins: [
        [
          babelPlugin,
          {
            addLoc: true,
          },
          'effector-logger',
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
    } else if (typeof value === 'object' && value !== null) {
      const name = applyPaths(value)
      if (name === undefined || name === null) continue
      result[key] = name
    } else {
      const name = value
      if (name === undefined || name === null) continue
      result[key] = name
    }
  }
  return result

  function applyPaths(paths) {
    if (meta.isEsm) return paths.esm
    if (meta.isCompat) return paths.compat
    if (meta.isBuild) return paths.build
    if (meta.isTest) return paths.test
    return paths.default
  }
}
function resolveFromSources(path) {
  return resolvePath(__dirname, 'src', path)
}
module.exports.getAliases = (metadata = meta) => parseAliases(metadata, aliases)
