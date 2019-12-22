import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'effector'
import {useStore} from 'effector-react'

import {workerMessage, ping, failure, domain} from './common'
import {createClient} from './remoteFX/client'

createClient(domain, new Worker('./worker.js'))

const pingTimeout = createStore(-1)
  .on(ping.done, (_, {result}) => result.ping)
  .reset(ping.fail)

ping.finally.watch(() => {
  setTimeout(() => {
    ping({now: Date.now()})
  }, 300)
})

const WorkerPing = () => (
  <>
    <strong>worker ping</strong>: {useStore(pingTimeout).toString()}
  </>
)

const App = () => (
  <>
    <WorkerPing />
  </>
)

ReactDOM.render(<App />, document.getElementById('root'))

setTimeout(async() => {
  console.log('req start')
  const result = await workerMessage('foo bar  baz bam')
  console.log('req result: ', result)
  await ping({now: Date.now()})
  try {
    await failure()
  } catch (error) {
    // console.error(error)
  }
}, 1000)
