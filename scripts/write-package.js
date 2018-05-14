//@flow

const {resolve, join} = require('path')
const {outputJsonSync, readJsonSync} = require('fs-extra')

function packageList() {
 const rootDir = resolve(__dirname, '..')
 const packageRootPath = join(rootDir, 'package.json')
 const rootPackage = readJsonSync(packageRootPath)
 const names /*: string[]*/ = rootPackage.packages
 const version /*: string*/ = rootPackage.version
 const fullNames /*: string[]*/ = []
 const fullPackages = []
 const paths = []
 for (const name of names) {
  const packageSrcPath = join(rootDir, 'src', name, 'package.npm.json')
  const npmDir = join(rootDir, 'npm', name, 'package.json')
  const srcPackage = readJsonSync(packageSrcPath)
  srcPackage.version = version
  paths.push(npmDir)
  fullNames.push(srcPackage.name)
  fullPackages.push(srcPackage)
 }
 for (const pkg of fullPackages) {
  if ('dependencies' in pkg) {
   setVersion(fullNames, pkg.dependencies, version)
  }
  if ('devDependencies' in pkg) {
   setVersion(fullNames, pkg.devDependencies, version)
  }
  if ('peerDependencies' in pkg) {
   setVersion(fullNames, pkg.peerDependencies, version)
  }
 }
 for (let i = 0; i < paths.length; i++) {
  const path = paths[i]
  const pkg = fullPackages[i]
  outputJsonSync(path, pkg, {spaces: 2})
 }
}

function setVersion(fullNames, depsMap, version) {
 const deps = Object.keys(depsMap)
 for (const name of fullNames) {
  if (deps.includes(name)) {
   depsMap[name] = version
  }
 }
}

packageList()
