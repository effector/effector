/*eslint-disable max-len, no-eval*/
require('dotenv').config()

const {resolve} = require('path')
const {promises} = require('fs')

// const jasmine2 = require('jest-jasmine2')
const {remote} = require('webdriverio')

const browserStackConfig = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: ['browserstack'],
  // browserstackLocal: true,
  updateJob: false,
  capabilities: {
    'bstack:options': {
      os: 'OS X',
      osVersion: 'Mojave',
      projectName: 'effector-dom',
      buildName: 'macos Safari',
      seleniumVersion: '3.141.59',
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      // local: 'true',
      // debug: 'true',
      // video: 'true',
    },
    browserName: 'Safari',
    browserVersion: '12.1',
    // browserVersion: '79.0',
    // 'browserstack.localIdentifier': 'Test123',
    'browserstack.use_w3c': true,
    // 'browserstack.local': true,
    'browserstack.console': 'verbose',
    acceptSslCert: true,
    // 'browserstack.networkLogs': true,
  },
  logLevel: 'warn',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',
}

if (!browserStackConfig.user || !browserStackConfig.key) {
  throw Error(
    `BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY env variables must be set`,
  )
}

async function loadModules() {
  const effectorPath = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'npm',
    'effector',
    'effector.cjs.js',
  )
  const effectorDomPath = resolve(
    __dirname,
    '..',
    '..',
    '..',
    'npm',
    'effector-dom',
    'effector-dom.cjs.js',
  )
  const [effector, dom] = await Promise.all([
    promises.readFile(effectorPath, 'utf8'),
    promises.readFile(effectorDomPath, 'utf8'),
  ])

  return {effector, dom}
}

module.exports = class BSTestRunner extends require('jest-runner') {
  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    const modulesReq = loadModules()
    return await super.runTests(
      tests,
      watcher,
      async test => {
        const browser = await remote(browserStackConfig)
        const initBrowser = async() => {
          await browser.url('about:blank')
          await browser.execute(initPageRuntime, modulesList)
        }
        const {effector, dom} = await modulesReq
        const modulesList = [
          {
            name: 'symbol-observable',
            src: 'module.exports = "@@observable"',
          },
          {
            name: 'effector',
            src: effector,
          },
          {
            name: 'effector-dom',
            src: dom,
          },
        ]
        // if (browser.isChrome) browser.takeHeapSnapshot
        const execFunc = async cb => {
          const result = await browser.executeAsync(
            execAsyncCode,
            typeof cb === 'function' ? cb.toString() : cb,
          )
          if (Object(result).error) {
            throw result.error
          }
          return result
        }
        const exec = cb =>
          execFunc(`async () => {
            await (${typeof cb === 'function' ? cb.toString() : cb})()
            return domSnapshots
          }`)

        test.context.config = {
          ...test.context.config,
          globals: {
            ...test.context.config.globals,
            browser,
            execFunc,
            exec,
            initBrowser,
          },
        }
        return await onStart(test)
      },
      async(test, result) => {
        // console.log(test)
        await test.context.config.globals.browser.deleteSession()
        return await onResult(test, result)
      },
      async(test, result) => {
        // console.log(test)
        await test.context.config.globals.browser.deleteSession()
        return await onFailure(test, result)
      },
      options,
    )
  }
}
async function execAsyncCode(cb, done) {
  console.log('cb', cb)
  try {
    done(await eval(`(${cb})()`))
  } catch (error) {
    console.log('error!', error.message)
    done({error})
  }
}
function initPageRuntime(modules) {
  const loadedModules = {}
  const domSnapshots = (window.domSnapshots = [])
  window.requireModule = window.require = path => {
    if (path in loadedModules) return loadedModules[path]
    throw Error(`module "${path}" not found`)
  }
  const evalModule = (window.evalModule = ({name, src}) => {
    const exports = {}
    window.exports = exports
    window.module = {exports}
    try {
      eval(src)
      loadedModules[name] = window.module.exports
    } catch (err) {
      console.error(err.message)
      throw err
    } finally {
      window.exports = null
      window.module = null
    }
    return loadedModules[name]
  })
  const addGlobals = (window.addGlobals = shape => {
    for (const key in shape) {
      window[key] = shape[key]
    }
    return shape
  })
  const el = document.createElement('div')
  el.id = 'root'
  document.body.appendChild(el)
  addGlobals({
    el,
    readHTML: () => el.innerHTML,
    _effectorFileName: 'no_file',
    async act(cb) {
      if (cb) {
        await cb()
      }
      await new Promise(rs => setTimeout(rs, 500))
      domSnapshots.push(el.innerHTML)
    },
  })
  modules.forEach(evalModule)
  const {effector, dom} = addGlobals({
    effector: requireModule('effector'),
    dom: requireModule('effector-dom'),
  })

  addGlobals({
    _effector: effector,
    _effectorDom: dom,
    h: dom.h,
    using: dom.using,
    spec: dom.spec,
    remap: dom.remap,
    list: dom.list,
    variant: dom.variant,
    ...effector,
  })
}
