//@flow

import {fx} from 'effector/stdlib'
import {forward} from './forward'
import type {Event} from './index.h'
import type {Subscription} from '../effector/index.h'

export function relayShape<
  E,
  O: {+[string]: Event<any>},
  F: $ObjMap<O, <T>(_: Event<T>) => T>,
>(opts: {+from: Event<E>, +shape: O, query(data: E): $Shape<F>}): Subscription {
  const query = opts.query
  const map = opts.shape
  const from = opts.from

  const shape = {}
  for (const key in map) {
    shape[key] = map[key].graphite.seq
  }

  const unsub = forward({
    from,
    to: {
      graphite: {
        seq: fx(
          'seq',
          null,
          fx('query', {
            mode: 'shape',
            shape,
            fn: query,
          }),
        ),
      },
    },
  })
  return unsub
}
//eslint-disable-next-line no-unused-vars
declare export function relay<E, F>(
  from: Event<E>,
  query: (data: E) => {+arg: F, +list: Array<Event<F>>},
): Subscription
declare export function relay<E, F>(opts: {
  +from: Event<E>,
  query(data: E): {+arg: F, +list: Array<Event<F>>},
}): Subscription
export function relay(opts, queryFn) {
  if (typeof queryFn === 'function')
    return relayRaw({
      from: opts,
      query: queryFn,
    })
  return relayRaw(opts)
}

function relayRaw<E, F>(opts: {
  +from: Event<E>,
  query(data: E): {+arg: F, +list: Array<Event<F>>},
}): Subscription {
  const query = opts.query
  const from = opts.from
  const fn = queryFn.bind(query)

  const unsub = forward({
    from,
    to: {
      graphite: {
        seq: fx(
          'seq',
          null,
          fx('query', {
            mode: 'some',
            fn,
          }),
        ),
      },
    },
  })
  return unsub

  function queryFn(arg, ctx: any, meta) {
    const query = this
    const queryResult = query(arg)
    const queryList = queryResult.list
    const resultList = []
    for (let i = 0; i < queryList.length; i++) {
      const item = queryList[i]
      if (Boolean(item)) resultList.push(item.graphite.seq)
    }
    const result = {}
    result.arg = queryResult.arg
    result.list = resultList
    return result
  }
}
