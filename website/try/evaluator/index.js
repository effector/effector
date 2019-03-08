//@flow

import {createEffect} from 'effector'

//import {loadEngine} from './loadEngine'
import {prepareRuntime} from './prepareRuntime'
import {evalExpr} from './evalExpr'
import scopedEval from './scopedEval'
import {selectVersion, version} from '../domain'
import {consoleMap} from '../logs'

version.on(selectVersion, (_, p) => p)

const cache = new Map()

function createRealm(sourceCode, version) {
  const realm = {}
  realm.process = {env: {NODE_ENV: 'development'}}
  realm.require = path => {
    console.log('require: ', path)
    return Symbol.observable
  }
  realm.exports = {}
  realm.module = {exports: realm.exports}
  realm.console = consoleMap()
  scopedEval
    .runLibrary(
      `'use strict'; ${sourceCode}\n//# sourceURL=effector.${version}.js`,
    )
    .call(window, realm)
  return realm.exports
}

export const fetchVersion = createEffect('fetch', {
  async handler(ver) {
    const url =
      ver === 'develop'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.cjs.js'
        : `https://unpkg.com/effector@${ver}/effector.cjs.js`
    const req = await fetch(url)
    const text = await req.text()
    return createRealm(text, ver)
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
  const env = prepareRuntime(effector, version.getState())
  return evalExpr(code, env)
}
