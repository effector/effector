const {resolve} = require('path')
const {outputJSONSync, readJSONSync} = require('fs-extra')

const versionHash = process.env.VERSION_HASH || process.env.GITHUB_SHA
if (typeof versionHash !== 'string') throw Error('no VERSION_HASH/GITHUB_SHA')

const shortHash = versionHash.slice(0, 8)

const registry = process.env.VERSION_HASH_REGISTRY
if (registry) {
  preparePackageFull({
    path: 'effector',
    name: '@zerobias/effector',
    directory: 'effector',
  })
  preparePackageFull({
    path: 'effector-react',
    name: '@zerobias/effector-react',
    directory: 'react',
  })
  preparePackageFull({
    path: 'forest',
    name: '@zerobias/forest',
    directory: 'forest',
  })
} else {
  const packagePath = resolve(__dirname, '..', 'npm/effector/package.json')
  const effectorPackage = readJSONSync(packagePath)

  effectorPackage.name = '@effector/canary'
  effectorPackage.version = `${effectorPackage.version}-${shortHash}`
  effectorPackage.repository = 'git://github.com/zerobias/effector.git'

  outputJSONSync(packagePath, effectorPackage, {
    spaces: 2,
  })
}
function preparePackageFull({path, name, directory}) {
  const packagePath = resolve(__dirname, '..', 'npm', path, 'package.json')
  const pkg = readJSONSync(packagePath)
  pkg.version = `${pkg.version}-${shortHash}`
  pkg.repository = {
    type: 'git',
    url: 'git://github.com/zerobias/effector.git',
    directory: `packages/${directory}`,
  }
  pkg.publishConfig = pkg.publishConfig || {}
  pkg.publishConfig.registry = registry
  pkg.name = name
  outputJSONSync(packagePath, pkg, {
    spaces: 2,
  })
}
