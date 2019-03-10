//@flow
//$todo
import {html, render} from 'lit-html'

import './dag'
console.log('reloaded')

render(
  html`
    <header>
      <h1>Hello</h1>
    </header>
  `,
  document.getElementById('app'),
)
