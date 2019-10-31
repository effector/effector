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
  const effectorReactPackagePath = resolve(
    __dirname,
    '..',
    'npm/effector-react/package.json',
  )
  const effectorReactPackage = readJSONSync(effectorReactPackagePath)
  preparePackage(effectorReactPackage)
  prepareGithubPackage('@zerobias/effector-react', effectorReactPackage)
  outputJSONSync(effectorReactPackagePath, effectorReactPackage, {
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
