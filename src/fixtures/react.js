//@flow

import * as React from 'react'
import {render as renderDom, unmountComponentAtNode} from 'react-dom'
import {act} from 'react-dom/test-utils'

export {act}

//$off
export let container: HTMLDivElement = null
beforeEach(() => {
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
