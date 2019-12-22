import {is, createNode, step, launch} from 'effector'
import {Signal} from './index.h'
import {createWatch} from './createWatch'
import {dynamicQueueFlat} from '../batch'

function noDebounceRaf<T>(signal: Signal, source: any, cb: (data: T) => any) {
  createWatch(signal, source.watch(cb))
}

const toDomOp = step.run({
  fn: (data, {handler}) => ({data, handler}),
})
export function debounceRaf<T>(
  signal: Signal,
  source: any,
  cb: (data: T) => any,
) {
  createNode({
    node: [toDomOp],
    //@ts-ignore
    parent: source,
    child: [domOp],
    //@ts-ignore
    family: {
      type: 'crosslink',
      owners: signal,
    },
    scope: {handler: cb},
    meta: {op: 'debounceRaf'},
  })
  if (is.store(source)) {
    //@ts-ignore
    launch(domOp, {data: source.getState(), handler: cb}, true)
  }
}

const {trigger: domOp} = dynamicQueueFlat<{
  data: any
  handler: (data: any) => void
}>({
  priority: 'high',
  mark: 'domOperation',
  fn({handler, data}) {
    handler(data)
  },
})

export function domOperation(
  immediate: boolean,
  signal: Signal,
  data: any,
  handler: (data: any) => void,
) {
  if (is.unit(data)) {
    ;(immediate ? noDebounceRaf : debounceRaf)(signal, data, handler)
  } else {
    handler(data)
  }
}
