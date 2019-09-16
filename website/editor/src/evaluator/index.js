//@flow

import * as pathLibrary from 'path'
import {createEffect, createStore} from 'effector'
import {prepareRuntime} from './prepareRuntime'
import {selectVersion} from '../editor'
import {version, sourceCode, compiledCode} from '../editor/state'
import {typechecker} from '../settings/domain'
import {consoleMap} from '../logs'
import {realmStatusApi} from '../realm'
import {exec} from './runtime'
import {getStackFrames} from './stackframe/getStackFrames'
//$todo
import PluginEffectorReact from 'effector/babel-plugin-react'
//$todo
import PluginBigInt from '@babel/plugin-syntax-bigint'

const tag = `# source`
const filename = createStore('repl.js').on(
  typechecker,
  (_, typechecker) => {
    if (typechecker === 'typescript') return 'repl.ts'
    return 'repl.js'
  },
)
async function createRealm(sourceCode: string, version: string, filename): $todo {
  const realm = {}
  realm.process = {env: {NODE_ENV: 'development'}}
  realm.require = path => {
    switch (path) {
      //$off
      case 'symbol-observable': return Symbol.observable
      case 'path': return pathLibrary
    }
    console.warn('require: ', path)
  }
  realm.exports = {}
  realm.module = {exports: realm.exports}
  realm.console = consoleMap()
  await exec({
    code: `'use strict'; ${sourceCode}\n//${tag}URL=${filename}`,
    realmGlobal: getIframe().contentWindow,
    globalBlocks: [realm],
    onRuntimeError,
    compile: false,
    filename,
  })
  return realm.module.exports || realm.exports
}

const cache = {
  'effector': new Map(),
  '@effector/babel-plugin': new Map()
}

export const fetchEffector = createEffect/*:: <string, *, *> */('fetch effector', {
  async handler(ver: string) {
    const url =
      ver === 'master'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.cjs.js'
        : `https://unpkg.com/effector@${ver}/effector.cjs.js`
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, ver, `effector.${ver}.js`)
  },
})

fetchEffector.fail.watch(() => selectVersion('master'))

export const fetchBabelPlugin = createEffect<string, {[key: string]: any, ...}, mixed>('fetch babel plugin', {
  async handler(ver): $todo {
    const url =
      ver === 'master'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/@effector/babel-plugin/index.js'
        : `https://unpkg.com/@effector/babel-plugin@latest/index.js`
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, ver, `effector-babel-plugin.${ver}.js`)
  },
})

fetchBabelPlugin.fail.watch(() => selectVersion('master'))

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


export async function evaluator(code: string) {
  realmStatusApi.init()
  const [
    babelPlugin,
    effector,
  ] = await Promise.all([
    cache['@effector/babel-plugin'].get(version.getState()),
    cache.effector.get(version.getState()),
  ])
  //$off
  const env = prepareRuntime(effector, version.getState())
  return exec({
    code,
    realmGlobal: getIframe().contentWindow,
    globalBlocks: [env],
    filename: filename.getState(),
    types: typechecker.getState() || 'typescript',
    pluginRegistry: {
      'effector/babel-plugin': babelPlugin,
      'effector/babel-plugin-react': PluginEffectorReact,
      'syntax-bigint': PluginBigInt,
      '@effector/repl-remove-imports': removeImportsPlugin,
    },
    onCompileError(error) {
      realmStatusApi.fail()
      console.error('Babel ERR', error)
      throw {type: 'babel-error', original: error, stackFrames: []}
    },
    onRuntimeError,
    onCompileComplete(compiled, config) {
      //$off
      compiledCode.setState(compiled)
    },
    onRuntimeComplete() {
      realmStatusApi.done()
    },
  })
}

const onRuntimeError = async error => {
  realmStatusApi.fail()
  console.error('Runtime ERR', error)
  const stackFrames = await getStackFrames(error)
  throw {type: 'runtime-error', original: error, stackFrames}
}

const removeImportsPlugin = babel => ({
  visitor: {
    ImportDeclaration(path) {
      path.remove()
    },
    ExportDefaultDeclaration(path) {
      path.remove()
    },
    ExportNamedDeclaration(path) {
      if (path.node.declaration) {
        path.replaceWith(path.node.declaration)
      } else {
        path.remove()
      }
    },
  },
})

let iframe: HTMLIFrameElement | null = null

function getIframe(): HTMLIFrameElement {
  if (iframe === null) {
    iframe =
      ((document.getElementById('dom'): any): HTMLIFrameElement | null) ||
      document.createElement('iframe')

    const generateFrame = () => {
      if (iframe === null) return
      if (iframe.contentDocument.body === null) return
      //$off
      resetHead(iframe.contentDocument)
      iframe.contentDocument.body.innerHTML =
        '<div class="spectrum spectrum--lightest spectrum--medium" id="root"></div>'
    }
    sourceCode.watch(generateFrame)
    selectVersion.watch(generateFrame)
  }

  return iframe
}

function resetHead(document) {
  const styleLinks = [
    'https://unpkg.com/@adobe/spectrum-css@2.x/dist/spectrum-core.css',
    'https://unpkg.com/@adobe/spectrum-css@2.x/dist/spectrum-lightest.css',
  ]
  for (const node of document.head.childNodes) {
    if (node.nodeName === 'LINK') {
      const href = node.getAttribute('href')
      const rel = node.getAttribute('rel')
      if (
          rel === 'stylesheet' &&
          styleLinks.includes(href)
        ) {
        styleLinks.splice(
          styleLinks.indexOf(href),
          1,
        )
        continue
      }
    }
    node.remove()
  }
  for (const url of styleLinks) {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', url)
    document.head.appendChild(link)
  }
}
