//@flow

import {createEffect} from 'effector'
import {prepareRuntime} from './prepareRuntime'
import {evalExpr} from './evalExpr'
import scopedEval from './scopedEval'
import {selectVersion, version} from '../domain'
import {consoleMap} from '../logs'
import {registerPlugin} from '@babel/standalone'

const tag = `# source`
function createRealm(sourceCode: string, version: string) {
  const realm = {}
  realm.process = {env: {NODE_ENV: 'development'}}
  realm.require = path => {
    console.log('require: ', path)
    if (path === 'symbol-observable') {
      //$todo
      return Symbol.observable
    }
  }
  realm.exports = {}
  realm.module = {exports: realm.exports}
  realm.console = consoleMap()
  scopedEval
    .runLibrary(
      `'use strict'; ${sourceCode}\n//${tag}URL=effector.${version}.js`,
    )
    .call(window, realm)
  return realm.module.exports || realm.exports
}

const cache = {
  'effector': new Map(),
  '@effector/babel-plugin': new Map()
}

export const fetchEffector = createEffect/*:: <string, *, *> */('fetch effector', {
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

export const fetchBabelPlugin = createEffect('fetch babel plugin', {
  async handler(ver: string) {
    const url =
      ver === 'develop'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/@effector/babel-plugin/index.js'
        : `https://unpkg.com/@effector/babel-plugin@latest/index.js`
    const req = await fetch(url)
    const text = await req.text()
    return createRealm(text, ver)
  },
})

const api = {
  'effector': fetchEffector,
  '@effector/babel-plugin': fetchBabelPlugin
}

function cacher(v, cache, fetcher) {
  const cached = cache.get(v)
  if (cached) return cached
  const req = fetcher(v)
  cache.set(v, req)
  return req
}

export const versionLoader = version.map/*::<*>*/(v => {
  const data = {}
  for (const key in cache) {
    data[key] = cacher(v, cache[key], api[key])
  }
  return data
})

async function loadEngine() {
  const realm = await cache.effector.get(version.getState())
  console.log('load effector version', version.getState(), realm)
  return realm
}

async function loadBabel() {
  const mod = await cache['@effector/babel-plugin'].get(version.getState())
  registerPlugin('@effector/babel-plugin', mod)
}

export async function evaluator(code: string) {
  await loadBabel()
  const effector = await loadEngine()
  const env = prepareRuntime(effector, version.getState())
  return evalExpr(code, env)
}
