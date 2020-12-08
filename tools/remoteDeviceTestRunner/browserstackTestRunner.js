/*eslint-disable max-len, no-eval, prefer-arrow-callback, no-var*/
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
  updateJob: true,
  strict: true,
  capabilities: {
    'bstack:options': {
      // os: 'OS X',
      // osVersion: 'Mojave',
      // projectName: 'forest',
      // buildName: 'macos Safari',
      // seleniumVersion: '3.141.59',
      userName: process.env.BROWSERSTACK_USERNAME,
      accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
      // local: 'true',
      // debug: 'true',
      // video: 'true',
    },
    // browserName: 'Safari',
    // browserVersion: '12.1',
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
  waitforTimeout: 20000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',
}

function createBrowserstackConfig(capabilities) {
  return {
    ...browserStackConfig,
    capabilities: {
      ...browserStackConfig.capabilities,
      ...capabilities,
      'bstack:options': {
        ...browserStackConfig.capabilities['bstack:options'],
        ...capabilities['bstack:options'],
      },
    },
  }
}

if (!browserStackConfig.user || !browserStackConfig.key) {
  throw Error(
    `BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY env variables must be set`,
  )
}

const effectorCjsPath = resolve(
  __dirname,
  '..',
  '..',
  'npm',
  'effector',
  'effector.cjs.js',
)
const effectorCompatPath = resolve(
  __dirname,
  '..',
  '..',
  'npm',
  'effector',
  'compat.js',
)
const forestPath = resolve(
  __dirname,
  '..',
  '..',
  'npm',
  'forest',
  'forest.cjs.js',
)

const polyfillPath = resolve(
  __dirname,
  '..',
  '..',
  'node_modules',
  '@babel',
  'polyfill',
  'dist',
  'polyfill.js',
)

const moduleRequests = {
  cjs: {
    path: effectorCjsPath,
  },
  compat: {
    path: effectorCompatPath,
  },
  forest: {
    path: forestPath,
  },
  polyfill: {
    path: polyfillPath,
  },
}

function moduleRequest(name, field, result) {
  if (!moduleRequests[name].req) {
    moduleRequests[name].req = promises.readFile(
      moduleRequests[name].path,
      'utf8',
    )
  }
  moduleRequests[name].req.then(code => {
    result[field] = code
  })
  return moduleRequests[name].req
}

module.exports = class BSTestRunner extends require('jest-runner') {
  constructor(...args) {
    super(...args)
    this.isSerial = true
    this.__PRIVATE_UNSTABLE_API_supportsEventEmitters__ = false
  }
  async runTests(tests, watcher, onStart, onResult, onFailure, options) {
    const browserRequests = {}
    function requestBrowser(tag, config) {
      if (!browserRequests[tag]) {
        browserRequests[tag] = remote(createBrowserstackConfig(config))
      }
      return browserRequests[tag]
    }
    const browserInstances = []
    try {
      return await super.runTests(
        tests,
        watcher,
        async test => {
          const {
            needForest,
            effectorBuild,
            needPolyfill,
            capabilitiesTag,
            capabilities,
            noAsyncAwait,
          } = test.context.config.globals
          let browser
          try {
            browser = await requestBrowser(capabilitiesTag, capabilities)
          } catch (error) {
            console.error('remote() call error', error)
            if (error && error.message)
              throw Error(`remote error: ${error.message}`)
            throw error
          }
          const initBrowser = async () => {
            try {
              await browser.url('about:blank')
              await browser.execute(initPageRuntime, modulesList)
            } catch (error) {
              console.error('initBrowser error', error)
              throw error
            }
          }

          const libs = {}
          const moduleRequests = []
          if (needPolyfill) {
            moduleRequests.push(moduleRequest('polyfill', 'polyfill', libs))
          }
          moduleRequests.push(moduleRequest(effectorBuild, 'effector', libs))
          if (needForest) {
            moduleRequests.push(moduleRequest('forest', 'forest', libs))
          }
          await Promise.all(moduleRequests)
          const modulesList = []
          if (needPolyfill) {
            modulesList.push({
              name: 'polyfill',
              src: libs.polyfill,
            })
          }
          modulesList.push({
            name: 'effector',
            src: libs.effector,
          })
          if (needForest) {
            modulesList.push({
              name: 'forest',
              src: libs.forest,
            })
          }
          // if (browser.isChrome) browser.takeHeapSnapshot
          const execFunc = async cb => {
            let cbText = typeof cb === 'function' ? cb.toString() : cb
            if (noAsyncAwait) {
              const {transformSync} = require('@babel/core')
              cbText = transformSync(cbText, {
                babelrc: false,
                filename: 'execFunc.js',
                sourceType: 'script',
                sourceMaps: false,
                presets: [
                  [
                    '@babel/preset-env',
                    {
                      loose: true,
                      useBuiltIns: 'entry',
                      corejs: 3,
                      modules: false,
                      shippedProposals: true,
                      targets: ['Chrome 47', 'IE 11'],
                    },
                  ],
                ],
                plugins: [
                  [
                    'babel-plugin-transform-async-to-promises',
                    {
                      inlineHelpers: true,
                    },
                  ],
                ],
              }).code.slice(1, -2)
            }
            const result = await browser.executeAsync(execAsyncCode, cbText)
            if (Object(result).error) {
              throw result.error
            }
            return result
          }
          const exec = cb =>
            execFunc(`async () => {
            await (${typeof cb === 'function' ? cb.toString() : cb})()
            return domSnapshots
          }`).then(result => {
              if (Array.isArray(result)) {
                const prettyHtml = require('../../src/fixtures/prettyHtml')
                return result.map(prettyHtml)
              }
              return result
            })
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
          if (typeof onStart === 'function') return await onStart(test)
          return test
        },
        async (test, result) => {
          if (typeof onResult === 'function')
            return await onResult(test, result)
          return result
        },
        async (test, result) => {
          console.error('onFailure result:', result)
          if (typeof onFailure === 'function')
            return await onFailure(test, result)
          return result
        },
        options,
      )
    } finally {
      await Promise.all(
        browserInstances.map(async browser => {
          try {
            await browser.deleteSession()
          } catch (err) {}
        }),
      )
    }
  }
}
function execAsyncCode(cb, done) {
  console.log('cb', cb)
  try {
    var evaluated = eval('(' + cb + ')()')
    return Promise.resolve(evaluated)
      .then(function(result) {
        done(result)
      })
      .catch(function(error) {
        document.body.innerHTML =
          '<h1>' +
          JSON.stringify(error.message) +
          '</h1><h2>' +
          JSON.stringify(error) +
          '</h2>'
        //prettier-ignore
        console.log('error! (async)', JSON.stringify(error.message), JSON.stringify(error))
        done({error: error})
      })
  } catch (error) {
    document.body.innerHTML =
      '<h1>' +
      JSON.stringify(error.message) +
      '</h1><h2>' +
      JSON.stringify(error) +
      '</h2>'
    //prettier-ignore
    console.log('error! (sync)', JSON.stringify(error.message), JSON.stringify(error))
    done({error: error})
    return Promise.resolve()
  }
}
function initPageRuntime(modules) {
  var loadedModules = {}
  var domSnapshots = (window.domSnapshots = [])
  window.requireModule = window.require = function(path) {
    if (path in loadedModules) return loadedModules[path]
    throw Error('module "' + path + '" not found')
  }
  var evalModule = (window.evalModule = function(mod) {
    var name = mod.name
    var src = mod.src
    var exports = {}
    window.exports = exports
    window.module = {exports: exports}
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
  var addGlobals = (window.addGlobals = function(shape) {
    Object.keys(shape).forEach(function(key) {
      window[key] = shape[key]
    })
    return shape
  })
  var el = document.createElement('div')
  el.id = 'root'
  document.body.appendChild(el)
  //prettier-ignore
  addGlobals({
    el: el,
    readHTML: function () {return el.innerHTML},
    _effectorFileName: 'no_file',
    act: function act(cb) {
      if (cb) {
        try {
          var cbResult = Promise.resolve(cb())
          return cbResult
            .then(function() {
              return new Promise(function (rs) {setTimeout(rs, 500)})
            })
            .then(function () {
              domSnapshots.push(el.innerHTML)
            })
        } catch (err) {
          return Promise.reject(err)
        }
      }
      return new Promise(function (rs) {setTimeout(rs, 500)})
        .then(function() {
          domSnapshots.push(el.innerHTML)
        })
    }
  })
  modules.forEach(evalModule)
  //prettier-ignore
  addGlobals({
    effector: loadedModules.effector,
    forest: loadedModules.forest || null,
    _effector: loadedModules.effector,
    _forest: loadedModules.forest || null
  })
}
