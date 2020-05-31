//@flow

import {attach, createEffect} from 'effector'

const effect = createEffect()

const foo1 = attach({
  effect,
  mapParams: _ => _,
})

attach({
  effect,
  mapParams: _ => _,
})

const config = {
  effect,
  mapParams: _ => _,
}

const foo2 = attach(config)

const f = () =>
  attach({
    effect,
    mapParams: _ => _,
  })
