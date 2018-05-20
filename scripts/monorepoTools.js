//@flow

import {join} from 'path'
import {
 outputJsonSync,
 readJsonSync,
 ensureDirSync,
 copySync,
 emptyDirSync,
} from 'fs-extra'

const rootDir = process.cwd()

const joinRoot = file => join(rootDir, file)
//$off
export const readPackageList = require('./scripts/readPackageList')

function readPackage(path) {
 const packagePath = join(path || rootDir, 'package.json')
 return readJsonSync(packagePath)
}
/*::
type Meta = {
 name: string,
 pathRoot: string,
 pathBuild: string,
}
*/
export function writePackages(names /*: string[]*/) {
 const rootPackage = readPackage()
 const version /*: string*/ = rootPackage.version
 const pkgList = names.map(name => ({
  name,
  pathRoot: join(rootDir, 'packages', name),
  pathBuild: join(rootDir, 'npm', name),
 }))

 for (const {name, pathRoot, pathBuild} of pkgList) {
  const joinBuild = file => join(pathBuild, file)
  const joinSrc = file => join(pathRoot, file)

  const pkg = readPackage(pathRoot)

  editPackage: {
   pkg.version = version
   if ('dependencies' in pkg) {
    setVersion(names, pkg.dependencies, version)
   }
   if ('devDependencies' in pkg) {
    setVersion(names, pkg.devDependencies, version)
   }
   if ('peerDependencies' in pkg) {
    setVersion(names, pkg.peerDependencies, version)
   }
  }

  cleanup: {
   ensureDirSync(pathBuild)
   emptyDirSync(pathBuild)
  }

  writePkg: {
   const target = joinBuild('package.json')
   outputJsonSync(target, pkg, {spaces: 2})
  }

  typings: {
   flow: {
    const flowTypings = [
     'index.js.flow',
     `${name}.cjs.js.flow`,
     `${name}.es.js.flow`,
    ].map(joinBuild)
    const src = joinSrc('index.js.flow')
    for (const target of flowTypings) {
     copySync(src, target)
    }
   }
   typescript: {
    const src = joinSrc('index.d.ts')
    const target = joinBuild('index.d.ts')
    copySync(src, target)
   }
  }

  license: {
   const src = joinRoot('LICENSE')
   const target = joinBuild('LICENSE')
   copySync(src, target)
  }

  readme: {
   let src
   if (name === 'effector') {
    src = joinRoot('README.md')
   } else {
    src = joinSrc('README.md')
   }
   const target = joinBuild('README.md')
   copySync(src, target)
  }
  // changelog: {
  //  if (name === 'effector') {
  //   const src = joinRoot('CHANGELOG.md')
  //   const target = joinBuild('CHANGELOG.md')
  //   copySync(src, target)
  //  }
  // }
 }
}

function setVersion(fullNames, depsMap, version) {
 const deps = Object.keys(depsMap)
 for (const name of fullNames) {
  if (deps.includes(name)) {
   depsMap[name] = `^${version}`
  }
 }
}
