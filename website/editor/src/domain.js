//@flow

import {
  createEvent,
  createEffect,
  createStore,
  combine,
  restoreEffect,
  combine as combineFn,
  createDomain,
  createApi,
  forward,
} from 'effector'

import defaultSourceCode from './defaultSourceCode'
import defaultVersions from './versions.json'
import {compress, decompress} from './compression'
import type {StackFrame} from './evaluator/stackframe/stack-frame'

export const generateShareableUrl = (version: string, code: string) => {
  const result =
    window.location.origin +
    window.location.pathname +
    '?version=' +
    version +
    '&code=' +
    compress(code)

  return result
}

export function getUrlParameter(name: string) {
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
  if (localStorage.getItem('code-compressed')) {
    return decompress(localStorage.getItem('code-compressed'))
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

export const realmClearNode = createEvent('realm clear node')
export const realmEvent = createEvent('realm event created')
export const realmStore = createEvent('realm store created')
export const realmEffect = createEvent('realm effect created')
export const realmDomain = createEvent('realm domain created')
export const realmComponent = createEvent('realm component created')
export const realmInvoke = createEvent('realm invoke')
export const realmStatus = createEvent('realm status update')

export const realmInterval = createEvent('realm setInterval call')
export const realmTimeout = createEvent('realm setTimeout call')

export const evalEffect = createEffect('eval realm code')

export const performLint = createEvent<void>('perform lint')
export const changeSources = createEvent('change sources')

export const selectVersion = createEvent('select version')

export const intervals = createStore<number[]>([])
export const timeouts = createStore<number[]>([])

export const version = createStore(defaultVersions[0])
export const packageVersions = createStore(defaultVersions)
export const sourceCode = createStore<string>(defaultSourceCode)
export const compiledCode = createStore<string>('')

export const codeSetCursor = createEvent()
export const codeCursorActivity = createEvent()
export const codeMarkLine = createEffect()

export const codeError = createStore<
  | {|
      isError: true,
      error: Error,
      stackFrames: StackFrame[],
    |}
  | {|
      isError: false,
      error: null,
      stackFrames: StackFrame[],
    |},
>({
  isError: false,
  error: null,
  stackFrames: [],
})

export const stats = createStore({
  event: [],
  store: [],
  effect: [],
  domain: [],
  component: [],
})
