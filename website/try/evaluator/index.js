import {createStore, createEffect} from 'effector'
import versions from '../versions.json'

//import {loadEngine} from './loadEngine'
import {prepareRuntime} from './prepareRuntime'
import {evalExpr} from './evalExpr'
import {selectVersion} from '../domain'

export const version = createStore(versions[0])

version.on(selectVersion, (_, p) => p)

const cache = new Map()

function createRealm(sourceCode) {
  const realm = {}
  realm.process = {env: 'development'}
  realm.require = path => {
    console.log('require: ', path)
    return Symbol.observable
  }
  realm.exports = {}
  realm.module = {exports: realm.exports}
  Function('process', 'require', 'exports', 'module', sourceCode).call(
    window,
    realm.process,
    realm.require,
    realm.exports,
    realm.module,
  )
  return realm.exports
}

export const fetchVersion = createEffect('fetch', {
  async handler(ver) {
    const req = await fetch(`https://unpkg.com/effector@${ver}/effector.cjs.js`)
    const text = await req.text()
    return createRealm(text)
  },
})

export const versionLoader = version.map(v => {
  if (cache.has(v)) return cache.get(v)
  const req = fetchVersion(v)
  cache.set(v, req)
  return req
})

async function loadEngine() {
  const realm = await cache.get(version.getState())
  console.log('load effector version', version.getState(), realm)
  return realm
}

export async function evaluator(code) {
  const effector = await loadEngine()
  const env = prepareRuntime(effector)
  return evalExpr(code, env)
}
