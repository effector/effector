import type {DOMElement} from 'react'
import {Root, createRoot} from 'react-dom/client'

import {act} from 'react-dom/test-utils'

export {act}

export let container = null as unknown as HTMLDivElement
let dom: typeof globalThis
let root: Root | null
beforeEach(() => {
  if (typeof document === 'undefined') {
    if (!dom) {
      const {JSDOM} = require('jsdom')
      dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
    }
    global.document = dom.window.document
    global.window = dom.window
  }
  container = document.createElement('div')

  document.body.appendChild(container)
})
export const cleanup = async () =>
  act(async () => {
    if (!container && !root) return
    root?.unmount()
    root = null
    container?.remove()
    container = null as unknown as HTMLDivElement
  })
afterEach(cleanup)

export const render = async (node: DOMElement<any, any>) =>
  act(async () => {
    if (!root) {
      root = createRoot(container)
    }
    root.render(node)
  })
export async function renderHTML(node: DOMElement<any, any>) {
  await render(node)
  return container.firstChild
}
