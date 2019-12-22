//@flow

import {createEvent, clearNode, Effect, Domain} from 'effector'
let nextID = 0

class Defer {
  id = ++nextID
  rs: (data: any) => void
  rj: (error: any) => void
  req: Promise<any>
  constructor() {
    reqMap.set(this.id, this)
    const req = new Promise((rs, rj) => {
      this.rs = rs
      this.rj = rj
    })
    req
      .finally(() => {
        reqMap.delete(this.id)
      })
      .catch(() => {})
    this.req = req
  }
}

const reqMap = new Map<number, Defer>()

export function createClient(domain: Domain, worker: Worker) {
  const onMessage = createEvent<MessageEvent>()
  worker.onmessage = onMessage

  onMessage.watch(({data}) => {
    if (Object(data) !== data) return
    if (!data.sid) return
    if (!data.id) return
    const req = reqMap.get(data.id)
    if (!req) return
    if (data.status === 'done') {
      req.rs(data.result)
    } else {
      if ('raw' in data.error) {
        req.rj(data.error.raw)
        return
      }
      const error = Error('')
      if ('name' in data.error) error.name = data.error.name
      if ('message' in data.error) error.message = data.error.message
      if ('stack' in data.error) error.stack = data.error.stack
      if ('code' in data.error) (error: any).code = data.error.code
      req.rj(error)
    }
  })

  domain.onCreateEffect((fx: Effect<any, any, any>) => {
    fx.use(params => {
      const defer = new Defer()
      worker.postMessage({
        id: defer.id,
        sid: fx.sid || fx.shortName,
        params,
      })
      return defer.req
    })
  })
}
