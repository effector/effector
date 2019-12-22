import {workerMessage, ping, failure, domain} from './common'
import {createWorker} from './remoteFX/worker'

createWorker(domain)

workerMessage.use(async word => {
  await new Promise(rs => setTimeout(rs, 500))
  return word.split(' ')
})

ping.use(({now}) => ({ping: Date.now() - now}))
failure.use(async() => {
  throw Error('WorkerError example')
})
