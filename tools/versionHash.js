const {resolve} = require('path')
const {outputJSONSync, readJSONSync} = require('fs-extra')

const versionHash = process.env.VERSION_HASH || process.env.GITHUB_SHA
if (typeof versionHash !== 'string') throw Error('no VERSION_HASH/GITHUB_SHA')

const packagePath = resolve(__dirname, '..', 'npm/effector/package.json')

const effectorPackage = readJSONSync(packagePath)

effectorPackage.name = '@effector/canary'
effectorPackage.version = `${effectorPackage.version}-${versionHash.slice(
  0,
  8,
)}`
effectorPackage.repository = 'git://github.com/zerobias/effector.git'
const registry = process.env.VERSION_HASH_REGISTRY
if (registry) {
  effectorPackage.publishConfig = effectorPackage.publishConfig || {}
  effectorPackage.publishConfig.registry = registry
  effectorPackage.name = '@zerobias/effector'
}

outputJSONSync(packagePath, effectorPackage, {
  spaces: 2,
})
