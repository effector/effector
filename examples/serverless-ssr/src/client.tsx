import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import {fork, hydrate, allSettled} from 'effector/fork'
import {App, location$, startClient} from './app'
import {app} from './domain'

const history = createBrowserHistory()

location$.updates.watch(location => {
  if (history.location !== location) {
    history.push(location)
  }
})

hydrate(app, {
  values: (window as any).__initialState__,
})

const scope = fork(app)

allSettled(startClient, {
  scope,
  params: history,
}).then(() => {
  ReactDOM.hydrate(<App root={scope} />, document.getElementById('root'))
})
