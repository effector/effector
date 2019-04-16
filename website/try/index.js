//@flow

import ReactDOM from 'react-dom'

import './dynamic'
import './flow/dynamic'
import './logs/dynamic'
import view from './view'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceworker.js', {
      scope: '/try',
    })
    .then(
      registration => {
        // Registration was successful
        console.log(
          'ServiceWorker registration successful with scope: ',
          registration.scope,
        )
      },
      err => {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err)
      },
    )
}

ReactDOM.render(view, document.getElementById('try-wrapper'))
