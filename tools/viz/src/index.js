//@flow

import {html, render} from 'lit-html'
import {createStoreObject} from 'effector'

import dag from './dag'
import {View, dagConfig} from './control'
console.log('reloaded')
const app = document.getElementById('app')
const svg = document.getElementById('view')
createStoreObject({view: View, config: dagConfig}).watch(({view, config}) => {
  render(view, app)
  if (!svg) return
  svg.innerHTML = ''
  dag({width: 600, height: 600, rmax: 21, config})
})
