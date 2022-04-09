import type {DOMElement} from 'react-17'
import {render as renderDom, unmountComponentAtNode} from 'react-dom-17'
import {act} from 'react-dom-17/test-utils'

export {act}

export let container = null as unknown as HTMLDivElement
let dom: typeof globalThis
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
    if (!container) return
    unmountComponentAtNode(container)
    container.remove()
    container = null as unknown as HTMLDivElement
  })
afterEach(cleanup)

export const render = async (node: DOMElement<any, any>) =>
  act(async () => {
    renderDom(node, container)
  })
export async function renderHTML(node: DOMElement<any, any>) {
  await render(node)
  return container.firstChild
}
