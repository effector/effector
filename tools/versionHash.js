const {resolve} = require('path')
const {outputJSONSync, readJSONSync} = require('fs-extra')

const versionHash = process.env.VERSION_HASH || process.env.GITHUB_SHA
if (typeof versionHash !== 'string') throw Error('no VERSION_HASH/GITHUB_SHA')

const shortHash = versionHash.slice(0, 8)

const packagePath = resolve(__dirname, '..', 'npm/effector/package.json')

const effectorPackage = readJSONSync(packagePath)

effectorPackage.name = '@effector/canary'
preparePackage(effectorPackage)
const registry = process.env.VERSION_HASH_REGISTRY
if (registry) {
  prepareGithubPackage('@zerobias/effector', effectorPackage)
  preparePackageFull({
    path: 'effector-react',
    name: '@zerobias/effector-react',
  })
  preparePackageFull({
    path: 'effector-dom',
    name: '@zerobias/effector-dom',
  })
}
function preparePackageFull({path, name}) {
  const packagePath = resolve(__dirname, '..', 'npm', path, 'package.json')
  const packageJson = readJSONSync(packagePath)
  preparePackage(packageJson)
  prepareGithubPackage(name, packageJson)
  outputJSONSync(packagePath, packageJson, {
    spaces: 2,
  })
}
function prepareGithubPackage(name, pkg) {
  pkg.publishConfig = pkg.publishConfig || {}
  pkg.publishConfig.registry = registry
  pkg.name = name
}
function preparePackage(pkg) {
  pkg.version = `${pkg.version}-${shortHash}`
  pkg.repository = 'git://github.com/zerobias/effector.git'
}

outputJSONSync(packagePath, effectorPackage, {
  spaces: 2,
})
