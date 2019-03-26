//@flow

import {createEffect} from 'effector'

import {prepareRuntime} from './prepareRuntime'
import {evalExpr} from './evalExpr'
import scopedEval from './scopedEval'
import {selectVersion, version} from '../domain'
import {consoleMap} from '../logs'

version.on(selectVersion, (_, p) => p)

const cache = new Map()

const tag = `# source`
function createRealm(sourceCode: string, version: string) {
  const realm = {}
  realm.process = {env: {NODE_ENV: 'development'}}
  realm.require = path => {
    console.log('require: ', path)
    //$todo
    return Symbol.observable
  }
  realm.exports = {}
  realm.module = {exports: realm.exports}
  realm.console = consoleMap()
  scopedEval
    .runLibrary(
      `'use strict'; ${sourceCode}\n//${tag}URL=effector.${version}.js`,
    )
    .call(window, realm)
  return realm.exports
}

export const fetchVersion = createEffect/*:: <string, *, *> */('fetch', {
  async handler(ver: string) {
    const url =
      ver === 'develop'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.cjs.js'
        : `https://unpkg.com/effector@${ver}/effector.cjs.js`
    const req = await fetch(url)
    const text = await req.text()
    return createRealm(text, ver)
  },
})

export const versionLoader = version.map/*::<*>*/(v => {
  const cached = cache.get(v)
  if (cached) return cached
  const req = fetchVersion(v)
  cache.set(v, req)
  return req
})

async function loadEngine() {
  const realm = await cache.get(version.getState())
  console.log('load effector version', version.getState(), realm)
  return realm
}

export async function evaluator(code: string) {
  const effector = await loadEngine()
  const env = prepareRuntime(effector, version.getState())
  return evalExpr(code, env)
}
