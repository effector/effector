//@flow
import * as React from 'react'
import * as pathLibrary from 'path'
import {createEffect, createStore} from 'effector'
import {prepareRuntime} from './prepareRuntime'
import {selectVersion} from '../editor'
import {version, sourceCode, compiledCode} from '../editor/state'
import {typechecker} from '../settings/state'
import {consoleMap} from '../logs'
import {realmStatusApi, realmListener, realmRemoveListener} from '../realm'
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
async function createRealm(sourceCode: string, filename, additionalLibs = {}): $todo {
  const realm = {}
  realm.process = {env: {NODE_ENV: 'development'}}
  realm.require = path => {
    switch (path) {
      //$off
      case 'symbol-observable': return Symbol.observable
      case 'path': return pathLibrary
      case 'react': return React
    }
    if (path in additionalLibs) return additionalLibs[path]
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

const fetchEffector = createEffect/*:: <string, *, *> */('fetch effector', {
  async handler(ver: string) {
    const url =
      ver === 'master'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/effector.cjs.js'
        : `https://unpkg.com/effector@${ver}/effector.cjs.js`
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `effector.${ver}.js`)
  },
})

fetchEffector.fail.watch(() => selectVersion('master'))

const fetchBabelPlugin = createEffect<string, {[key: string]: any, ...}, mixed>('fetch babel plugin', {
  async handler(ver): $todo {
    const url =
      ver === 'master'
        ? 'https://effector--canary.s3-eu-west-1.amazonaws.com/@effector/babel-plugin/index.js'
        : `https://unpkg.com/@effector/babel-plugin@latest/index.js`
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `effector-babel-plugin.${ver}.js`)
  },
})

const fetchEffectorReact = createEffect<any, {[key: string]: any, ...}, mixed>('fetch effector-react', {
  async handler(effector): $todo {
    const url = 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector-react/effector-react.cjs.js'
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `effector-react.cjs.js`, {effector})
  },
})

const fetchEffectorDom = createEffect({
  async handler(effector) {
    const url = 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector-dom/effector-dom.cjs.js'
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `effector-dom.cjs.js`, {effector})
  }
})
const fetchEffectorFork = createEffect({
  async handler(effector) {
    const url = 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector/fork.js'
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `fork.js`, {effector})
  }
})

const fetchEffectorReactSSR = createEffect({
  async handler(effector) {
    const url = 'https://effector--canary.s3-eu-west-1.amazonaws.com/effector-react/ssr.js'
    const sourceMap = `${url}.map`
    const req = await fetch(url)
    let text = await req.text()
    text = text.replace(/\/\/\# sourceMappingURL\=.*$/m, `//${tag}MappingURL=${sourceMap}`)
    return createRealm(text, `ssr.js`, {effector})
  }
})

fetchBabelPlugin.fail.watch(() => selectVersion('master'))

const api = {
  'effector': fetchEffector,
  'effector/fork': fetchEffectorFork,
  '@effector/babel-plugin': fetchBabelPlugin,
  'effector-dom': fetchEffectorDom,
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
  const effectorReact = await fetchEffectorReact(effector)
  let effectorDom
  let effectorFork
  let effectorReactSSR
  if (version.getState() === 'master') {
    const additionalLibs = await Promise.all([
      fetchEffectorDom(effector),
      fetchEffectorFork(effector),
      fetchEffectorReactSSR(effector)
    ])
    effectorDom = additionalLibs[0]
    effectorFork = additionalLibs[1]
    effectorReactSSR = additionalLibs[2]
  }
  //$off
  const env = prepareRuntime(effector, effectorReact, version.getState())
  return exec({
    code,
    realmGlobal: getIframe().contentWindow,
    globalBlocks: [env, {dom: effectorDom, effectorDom, effectorFork, effectorReactSSR}],
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
function replaceModuleImports(globalVarName, path, {types: t}) {
  const values = []
  for (const specifier of path.node.specifiers) {
    switch (specifier.type) {
      case 'ImportSpecifier':
        values.push(
          t.objectProperty(
            t.identifier(specifier.imported.name),
            t.identifier(specifier.local.name)
          )
        )
        break
      case 'ImportNamespaceSpecifier':
      case 'ImportDefaultSpecifier':
        path.replaceWith(
          t.VariableDeclaration("const", [
            t.VariableDeclarator(
              t.identifier(specifier.local.name),
              t.memberExpression(
                t.identifier("globalThis"),
                t.identifier(globalVarName)
              )
            )
          ])
        )
        return
    }
  }
  path.replaceWith(
    t.VariableDeclaration("const", [
      t.VariableDeclarator(
        t.objectPattern(values),
        t.memberExpression(
          t.identifier("globalThis"),
          t.identifier(globalVarName)
        )
      )
    ])
  )
}
const removeImportsPlugin = babel => ({
  visitor: {
    ImportDeclaration(path) {
      switch (path.node.source.value) {
        case 'effector-dom':
          replaceModuleImports('effectorDom', path, babel)
          break
        case 'effector/fork':
          replaceModuleImports('effectorFork', path, babel)
          break
        case 'effector-react/ssr':
          replaceModuleImports('effectorReactSSR', path, babel)
          break
        default:
          path.remove()
      }
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
    const wrapListenerMethods = target => {
      if (!target) return
      if (!target.addEventListener.__original__) {
        const originalMethod = target.addEventListener.bind(target)
        function addEventListener(type, fn, options) {
          originalMethod(type, fn, options)
          realmListener({type, target, fn, options})
        }
        addEventListener.__original__ = originalMethod
        target.addEventListener = addEventListener
      }
      if (!target.removeEventListener.__original__) {
        const originalMethod = target.removeEventListener.bind(target)
        function removeEventListener(type, fn, options) {
          originalMethod(type, fn, options)
          realmRemoveListener({type, target, fn, options})
        }
        removeEventListener.__original__ = originalMethod
        target.removeEventListener = removeEventListener
      }
    }
    const generateFrame = () => {
      if (iframe === null) return
      if (iframe.contentDocument.body === null) return
      //$off
      resetHead(iframe.contentDocument)
      iframe.contentDocument.body.innerHTML =
        '<div class="spectrum spectrum--lightest spectrum--medium" id="root"></div>'
      //wrapListenerMethods(iframe.contentDocument)
      //wrapListenerMethods(iframe.contentWindow)
      //wrapListenerMethods(iframe.contentDocument.body)
      //wrapListenerMethods(iframe.contentDocument.documentElement)
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
