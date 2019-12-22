//@flow

import * as React from 'react'
import {render as renderDom, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'

export {act}

//$off
export let container: HTMLDivElement = null
let dom
beforeEach(() => {
  if (typeof document === 'undefined') {
    if (!dom) {
      //$off
      const {JSDOM} = require('jsdom')
      dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
    }
    global.document = dom.window.document
    global.window = dom.window
  }
  container = document.createElement('div')
  //$off
  document.body.appendChild(container)
})
export const cleanup = async() =>
  act(async() => {
    if (!container) return
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })
afterEach(cleanup)

export const render = async(node: React.Node) =>
  act(async() => {
    //$off
    renderDom(node, container)
  })
export async function renderHTML(node: React.Node) {
  await render(node)
  return container.firstChild
}
