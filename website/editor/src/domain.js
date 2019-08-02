//@flow

import {
  createEvent,
  createEffect,
  createStore,
  type Unit,
  type Event,
  type Store,
  type Effect,
  type Domain,
} from 'effector'
import type {StoreView} from 'effector-react'

import defaultSourceCode from './defaultSourceCode'
import defaultVersions from './versions.json'
import {compress, decompress} from './compression'
import type {StackFrame} from './evaluator/stackframe/stack-frame'

export function generateShareableUrl(version: string, code: string): string {
  const result =
    window.location.origin +
    window.location.pathname +
    '?version=' +
    version +
    '&code=' +
    compress(code)

  return result
}

export function getUrlParameter(name: string): string {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
  const results = regex.exec(location.search)
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

export function retrieveCode(): string {
  if (/https\:\/\/(.+\.)?effector\.dev/.test(location.origin)) {
    if ('__code__' in window) {
      const preloaded: {
        code: string,
        description: string,
        tags: string[],
      } = (window: any).__code__
      return preloaded.code
    }
  }
  const code = getUrlParameter('code')
  if (code) {
    return decompress(code)
  }
  const storageCode = localStorage.getItem('code-compressed')
  if (storageCode != null) {
    return decompress(storageCode)
  }
  return defaultSourceCode
}

export function retrieveVersion(): string {
  const version = getUrlParameter('version')
  if (version) {
    return version
  }
  return defaultVersions[0]
}

export const realmComponent = createEvent<StoreView<any, any>>(
  'realm component created',
)

export const realmStatus = createEvent<{|
  active: boolean,
  throwError: boolean,
|}>('realm status update')

export const realmInterval = createEvent<IntervalID>('realm setInterval call')
export const realmTimeout = createEvent<TimeoutID>('realm setTimeout call')

export const evalEffect = createEffect<string, any, any>('eval realm code')

export const performLint = createEvent<void>('perform lint')
export const changeSources = createEvent<string>('change sources')

export const selectVersion = createEvent<string>('select version')

export const intervals = createStore<IntervalID[]>([])
export const timeouts = createStore<TimeoutID[]>([])

export const version = createStore<string>(defaultVersions[0])
export const packageVersions = createStore<string[]>(defaultVersions)
export const sourceCode = createStore<string>(retrieveCode())
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

export const stats = createStore<{|
  event: Event<any>[],
  store: Store<any>[],
  effect: Effect<any, any, any>[],
  domain: Domain[],
  component: StoreView<any, any>[],
|}>({
  event: [],
  store: [],
  effect: [],
  domain: [],
  component: [],
})
