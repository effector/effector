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
const stages = {
  editPackage(pkg, names, version) {
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
  },
  cleanup(pathBuild) {
    ensureDirSync(pathBuild)
    emptyDirSync(pathBuild)
  },
  writePackage({name, pathRoot, pathBuild, version}, names) {
    const joinBuild = file => join(pathBuild, file)
    const joinSrc = file => join(pathRoot, file)

    const pkg = readPackage(pathRoot)
    stages.editPackage(pkg, names, version)
    stages.cleanup(pathBuild)

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
  },
}
export function writePackages(names /*: string[]*/) {
  const rootPackage = readPackage()
  const version /*: string*/ = rootPackage.version
  const pkgList = names.map(name => ({
    name,
    version,
    pathRoot: join(rootDir, 'packages', name),
    pathBuild: join(rootDir, 'npm', name),
  }))
  for (const pkg of pkgList) {
    stages.writePackage(pkg, names)
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
