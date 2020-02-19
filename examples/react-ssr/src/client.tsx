import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import {fork, hydrate, allSettled} from 'effector/fork'
import {App, app, location$, startClient} from './app'

const history = createBrowserHistory()

location$.updates.watch(location => {
  if (history.location !== location) {
    history.push(location)
  }
})

hydrate(app, {
  values: window.__initialState__,
})

const clientScope = fork(app)

allSettled(startClient, {
  scope: clientScope,
  params: history,
}).then(() => {
  ReactDOM.hydrate(<App root={clientScope} />, document.getElementById('root'))
})
