//@flow

import {
  createEvent,
  createEffect,
  createStore,
  combine,
  restoreEffect,
  combine as combineFn,
  createDomain,
  forward,
} from 'effector'
import * as lzString from 'lz-string'

import {traverseGraphite} from './traverseGraphite'
import defaultSourceCode from './defaultSourceCode'
import defaultVersions from './versions.json'

export const compress = lzString.compressToEncodedURIComponent
export const decompress = lzString.decompressFromEncodedURIComponent

export const generateShareableUrl = (version, code) => {
  const result =
    window.location.origin +
    window.location.pathname +
    '?version=' +
    version +
    '&code=' +
    compress(code)

  return result
}

export const copyShareableUrl = () => {
  const input = document.getElementById('shareableUrl')
  input.select()
  document.execCommand('copy')
}

export function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function retrieveCode() {
  const code = getUrlParameter('code')
  if (code) {
    return decompress(code)
  }
  return defaultSourceCode
}

export function retrieveVersion() {
  const version = getUrlParameter('version')
  if (version) {
    return version
  }
  return defaultVersions[0]
}

export const realmEvent = createEvent('realm event created')
export const realmStore = createEvent('realm store')
export const realmEffect = createEvent('realm effect created')
export const realmDomain = createEvent('realm domain created')
export const realmInvoke = createEvent('realm invoke')
export const realmLog = createEvent('realm console.log call')
export const realmStatus = createEvent('realm status update')

export const realmInterval = createEvent('realm setInterval call')
export const realmTimeout = createEvent('realm setTimeout call')

export const evalEffect = createEffect('eval realm code')

export const changeSources = createEvent('change sources')

export const resetGraphiteState = createEvent('reset graphite state')
export const selectVersion = createEvent('select version')

export const logs = createStore([])
export const intervals = createStore([])
export const timeouts = createStore([])

export const version = createStore(defaultVersions[0])
export const packageVersions = createStore(defaultVersions)
export const sourceCode = createStore(defaultSourceCode)
export const shareableUrl = combine(sourceCode, version, (code, version) =>
  generateShareableUrl(version, code),
)
export const codeError = createStore({
  isError: false,
  message: null,
  stack: null,
})
export const graphite = createStore({})

export const graphiteCode = graphite.map(e => {
  const result = {}
  for (const key in e) {
    result[key] = traverseGraphite(e[key])
  }
  return JSON.stringify(result, null, 2)
})

export const stats = createStore({
  event: [],
  store: [],
  effect: [],
  domain: [],
})
