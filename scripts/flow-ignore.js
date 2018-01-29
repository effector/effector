//@flow

const {
  readdirSync,
  outputFileSync,
  pathExistsSync,
  //$todo
  readFileSync,
} = require('fs-extra')

const ROOT = `${__dirname}/..`
const RESULT_PATH = `${ROOT}/.flowconfig-ignore`
const FLOW_CONFIG = `${ROOT}/.flowconfig`
const RUN_AGAIN = `${ROOT}/scripts/rerun-flowignore.sh`
const PACKAGE = 'package.json'
const PACKAGES = `${ROOT}/packages`
const MODULES = `${ROOT}/node_modules`
const TYPINGS = `${ROOT}/flow-typed`
const TYPINGS_ALT = `${ROOT}/flow`
const TYPINGS_NPM = `${ROOT}/flow-typed/npm`

const COMMENT_SYMBOL = '💩 '
const BOUND_SYMBOL = '🙈'

/*::
type BoundState
  = 'none'
  | 'open'
  // | 'closed'
*/
let pureCurrentConfig = ''
function readConfig() {
  try {
    const cfg/*:::string*/ = readFileSync(FLOW_CONFIG, {encoding: 'utf8'})
    pureCurrentConfig = cfg
    return cfg.split(`\n`)
  } catch (error) {

  }
  return []
}

function* listIterable(result, orig) {
  for (const line of orig) {
    if (!line.includes(BOUND_SYMBOL)) {
      yield line
      // console.log('line', line)
    } else {
      // console.log('line else', line)
      const v = [COMMENT_SYMBOL, BOUND_SYMBOL].join('')
      yield v
      yield result
      return
    }
  }
}

function writeConfig(result) {
  const orig = readConfig()
  const text = [...listIterable(result, orig)].join(`\n`)
  if (text.length > 0) {
    if (text === pureCurrentConfig) {
      console.log(`Nothing changed!`)
      return
    }
    outputFileSync(FLOW_CONFIG, text)
  }
}

const getTypingFiles = () => uniq([
  ...readdirSafe(TYPINGS),
  ...readdirSafe(TYPINGS_NPM),
  ...readdirSafe(TYPINGS_ALT),
])

const getTypings = () => uniq(getTypingFiles()
  .map(processTyping)
  .filter(name => pathExistsSync(`${MODULES}/${name}`)))

function processTyping(rawTyping) {
  const omitJs = rawTyping.trim().replace('.js', '')
  const omitVersion = omitJs.lastIndexOf('_') > -1
    ? omitJs.slice(0, omitJs.lastIndexOf('_'))
    : omitJs
  return omitVersion
}

const uniq = list => [...new Set(list)]
const IGNORED_TYPINGS = getTypings()
const IGNORED_ONLY = uniq((process.env.IGNORED || '')
  .split(',')
  .map(x => x.trim()))

const IGNORED = IGNORED_ONLY

const notIgnored = name => !IGNORED.includes(name)

const getModuleInfo = (name) => `${MODULES}/${name}/${PACKAGE}`
const getPackageInfo = (name) => `${PACKAGES}/${name}/${PACKAGE}`

const getDependencies = (info) => Object.keys(info.dependencies || {})
const getPackageName = (info)/*:::string*/ => info.name || ''

function readdirSafe(fullPath) {
  try {
    return readdirSync(fullPath)
  } catch (err) {
    return []
  }
}

function safeReadPackage(fullPath)/*:::Object*/ {
  try {
    //$off
    const data = require(fullPath)

    return data
  } catch (err) {
    return {}
  }
}

const readModuleDeps = (fullPath) => {
  try {
    //$off
    const data = require(fullPath)
    return getDependencies(data)
  } catch (err) {
    return []
  }
}

// const getPackagesNames = () => readdirSafe(PACKAGES)
//   .map(getPackageInfo)
//   .reduce((acc/*:::string[]*/, path) => {
//     const name = getPackageName(
//       safeReadPackage(path)
//     )
//     return name === ''
//       ? acc
//       : [
//         ...acc,
//         name
//       ]
//   }, [])
//   .filter(notIgnored)

// const packageNames = getPackagesNames()





const getInnerDeps = (result, depName) =>
  readModuleDeps(getModuleInfo(depName))
    .filter(x => !result.includes(x))
    .filter(notIgnored)
    .reduce(getInnerDeps, uniq([...result, depName]))
    .filter(notIgnored)

const concatUniq = (a, b) => uniq(a.concat(b))

const readScope = scope => readdirSafe(`${MODULES}/${scope}`)
  .map(subDir => [scope, subDir].join('/'))

const rawDeps = readdirSafe(MODULES)

const getModules = (deps) => {
  const scopes = rawDeps
    .filter(name => name[0] === '@')
  return scopes
    .map(readScope)
    .filter(notIgnored)
    .reduce(concatUniq, rawDeps)
    .filter(x => !scopes.includes(x))
    .filter(x => !deps.includes(x))
    .filter(notIgnored)
}

const isNotTyping = x => !IGNORED_TYPINGS.includes(x)

const deps = readdirSafe(PACKAGES)
  .filter(name => {
    const realName = getPackageName(
      safeReadPackage(
        getPackageInfo(name)
      )
    )
    return realName !== '' && notIgnored(realName)
  })
  .map(name => readModuleDeps(getPackageInfo(name)))
  .concat([readModuleDeps(`${ROOT}/${PACKAGE}`)])
  .reduce(concatUniq, [])
  .filter(notIgnored)
  .filter(isNotTyping)

const nodeModules = getModules(deps)

function runAgainText() {
  return `IGNORED="${uniqIgnored.sort().join(',')}" node scripts/flow-ignore`
}

function updateRerunner() {
  outputFileSync(RUN_AGAIN, runAgainText())
}

const uniqIgnored = IGNORED_ONLY.filter(isNotTyping)

const ignored =
`💩 ignored total:
💩 ${IGNORED.join(',')}
💩 ignored typings:
💩 ${IGNORED_TYPINGS.sort().join(', ')}
💩 active:
💩 ${deps.sort().join(', ')}
💩 run again:
💩 ${runAgainText()}
💩 \n`

updateRerunner()

const result = ignored.concat(
  nodeModules
    .map(name => `<PROJECT_ROOT>/node_modules/${name}/*`)
    .join(`\n`))
outputFileSync(RESULT_PATH, result)
writeConfig(result)
console.log(`Total deps: ${deps.length}`)
console.log(deps
  .filter(isNotTyping)
  .sort()
  .join(', '))
console.log(`Total typings: ${IGNORED_TYPINGS.length}`)
console.log(`Total ignored deps: ${nodeModules.length}`)
// console.log(`Saved as ${RESULT_PATH}`)
