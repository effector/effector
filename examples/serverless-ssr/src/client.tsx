import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import {fork, hydrate, waitAll} from 'effector/fork'
import {App, location$, startClient} from './app'
import {app} from './domain'

hydrate(app, {
  values: (window as any).__initialState__,
})

const history = createBrowserHistory()

location$.updates.watch(location => {
  if (history.location !== location) {
    history.push(location)
  }
})

const scope = fork(app, {
  start: startClient,
  ctx: history,
})
waitAll(startClient, {
  scope,
  params: history,
})
ReactDOM.hydrate(<App root={scope} />, document.getElementById('root'))
