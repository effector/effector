//@flow

import type {TypeDef, Graph} from 'effector/stdlib'
import type {Watcher} from './index.h'

const noopIndexOf = () => -1
//eslint-disable-next-line no-unused-vars
const noopSplice = (i: number, n: number) => []

function disposer() {
  const i = this.indexOf()
  if (i === -1) return
  this.splice(i, 1)
  this.indexOf = noopIndexOf
  this.splice = noopSplice
}

export const createWatcher = (opts: {child: Graph, parent: Graph}): Watcher => {
  const subscribers = opts.parent.next
  const instance = {
    indexOf: subscribers.indexOf.bind(subscribers, opts.child),
    splice: subscribers.splice.bind(subscribers),
  }
  const result = disposer.bind(instance)
  result.unsubscribe = disposer.bind(instance)
  return (result: $todo)
}
