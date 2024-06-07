import {
  attach,
  combine,
  createDomain,
  createEffect,
  createEvent,
  createStore,
  createApi,
  merge,
  restore,
  sample,
  split,
} from 'effector'

const korben = attach({effect() {}})
const dallas = combine({}, () => {})
const c = createDomain()
const d = createEffect()
const e = createEvent()
const f = createStore(null)
const g = createApi(f, {})
const j = merge([e])
const k = restore(d, null)
const m = sample({clock: e, source: f})
const n = split(f, {})
