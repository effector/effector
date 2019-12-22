import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'
import {fork, hydrate} from 'effector-react/ssr'
import {App, app, location$, startClient} from './app'

hydrate(app, {
  values: (window as any).__initialState__,
})

const history = createBrowserHistory()

location$.updates.watch(location => {
  if (history.location !== location) {
    history.push(location)
  }
})

render()

async function render() {
  const scope = await fork(app, {
    start: startClient,
    ctx: history,
  })
  ReactDOM.hydrate(<App root={scope} />, document.getElementById('root'))
}
