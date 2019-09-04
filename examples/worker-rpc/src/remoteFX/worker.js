//@flow

import {type Effect, type Domain, createEvent, clearNode} from 'effector'

export function createWorker(domain: Domain) {
  const fxMap = new Map<string, Effect<any, any, any>>()
  const onMessage = createEvent<MessageEvent>()
  onmessage = onMessage

  onMessage.watch(async({data}) => {
    if (Object(data) !== data) return
    if (!data.sid) return
    if (!data.id) return
    const fx = fxMap.get(data.sid)
    if (!fx) {
      //@ts-ignore
      postMessage({
        id: data.id,
        sid: data.sid,
        status: 'fail',
        error: {
          name: 'RemoteFXError',
          message: `Unknown sid "${data.sid}"`,
        },
      })
      return
    }

    await fx(data.params)
      .then(result => {
        //@ts-ignore
        postMessage({
          id: data.id,
          sid: data.sid,
          status: 'done',
          result,
        })
      })
      .catch(error => {
        const serialized: {
          raw?: any,
          name?: any,
          code?: any,
          message?: any,
          stack?: any,
        } = {}
        if (error instanceof Error) {
          serialized.name = (error: any).name
          if ('code' in error) serialized.code = (error: any).code
          if ('message' in error) serialized.message = (error: any).message
          if ('stack' in error) serialized.stack = (error: any).stack
        } else {
          serialized.raw = error
        }
        //@ts-ignore
        postMessage({
          id: data.id,
          sid: data.sid,
          status: 'fail',
          error: serialized,
        })
      })
  })
  domain.onCreateEffect((fx: Effect<any, any, any>) => {
    fxMap.set(fx.sid || fx.shortName, fx)
  })
}
