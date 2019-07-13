//@flow

import {Defer} from './effect/defer'
import {createEffect} from './effect'
import {createEvent} from './event'
import {sample} from './sample'
import {createStoreObject} from './store'
import {launch} from './kernel'
import {step, bind, is} from './stdlib'

export function createTask({
  handler,
  store: shape,
  fn = (params, store) => ({params, store}),
}: *) {
  const store = is.store(shape) ? shape : createStoreObject(shape)
  const effect = createEffect({handler})
  //$off
  const trigger = createEvent()
  //$off
  trigger.create = (params, fullName, args) => {
    const req: any = new Defer()
    launch(trigger, {ɔ: {params, req}})
    return req.req
  }
  //$off
  trigger.done = effect.done
  //$off
  trigger.fail = effect.fail
  //$off
  trigger.use = effect.use
  trigger.graphite.seq.push(
    step.compute({
      fn(params, scope) {
        if (typeof params === 'object' && params !== null) {
          if ('ɔ' in params) return params.ɔ
        }
        return {
          params,
          req: {
            rs(data) {},
            rj(data) {},
          },
        }
      },
    }),
  )
  //$off
  sample({
    source: store,
    clock: trigger,
    target: effect,
    fn: bind(transformBy, fn),
  })
  return trigger
}

const transformBy = (fn, store, {params, req}) => ({
  ɔ: {req, params: fn(params, store)},
})
