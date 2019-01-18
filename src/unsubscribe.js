//@flow

import type {TypeDef, GraphiteMeta} from 'effector/stdlib/typedef'
import type {Subscription} from './effector/index.h'

const noopIndexOf = () => -1
const noopSplice = (i: number, n: number) => []

function unsubscriber() {
  const i = this.indexOf()
  if (i === -1) return
  this.splice(i, 1)
  this.indexOf = noopIndexOf
  this.splice = noopSplice
}
const initUnsubscribe = (obj): Subscription => {
  const result = unsubscriber.bind(obj)
  result.unsubscribe = result
  return (result: $todo)
}
export const createUnsubscribe = (opts: {
  child: TypeDef<*, 'cmd' | 'step'>,
  parent: GraphiteMeta,
}): Subscription => {
  const subscribers = opts.parent.next.data
  return initUnsubscribe({
    indexOf: subscribers.indexOf.bind(subscribers, opts.child),
    splice: subscribers.splice.bind(subscribers),
  })
}
