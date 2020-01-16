import {performance} from 'perf_hooks'
const globalVariable =
  (typeof globalThis !== undefined && globalThis) ||
  (typeof global !== undefined && global) ||
  (typeof window !== undefined && window)
if (globalVariable) {
  //@ts-ignore
  if (!globalVariable.performance)
    //@ts-ignore
    globalVariable.performance = performance
  //@ts-ignore
  if (!globalVariable.requestAnimationFrame) {
    //@ts-ignore
    globalVariable.requestAnimationFrame = cb => setTimeout(cb, 0)
    //@ts-ignore
    globalVariable.cancelAnimationFrame = clearTimeout
  }
}
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
