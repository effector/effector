import {performance, PerformanceObserver} from 'perf_hooks'
//@ts-ignore
globalThis.performance = performance
//@ts-ignore
globalThis.PerformanceObserver = PerformanceObserver
//@ts-ignore
globalThis.requestAnimationFrame = cb => setTimeout(cb, 0)
//@ts-ignore
globalThis.cancelAnimationFrame = clearTimeout

import {useCustomDocument} from './documentResolver'
useCustomDocument()
export * from '../h'
export * from '../storeField'
export * from '../op'
export {render, body, createDocumentFragment} from './document'
import {createDocumentFragment, render} from './document'
import {using} from './using'

export function renderStatic(cb: () => void) {
  const node = createDocumentFragment()
  using(node, cb)
  return new Promise(rs => setTimeout(rs, 800)).then(() => render(node))
}
