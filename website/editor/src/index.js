import ReactDOM from 'react-dom'

import {loadLayoutSettings} from './layout-settings'
import './init'
import './graphite/dynamic'
import App from './view'
import React from 'react'

const root = document.getElementById('try-wrapper')
if (!root) throw Error('no body')

loadLayoutSettings()

window.addEventListener(
  'touchmove',
  event => {
    event.preventDefault()
  },
  {passive: false},
)
root.addEventListener(
  'touchmove',
  (event: Event) => {
    event.stopPropagation()
  },
  false,
)
ReactDOM.render(<App />, root)
