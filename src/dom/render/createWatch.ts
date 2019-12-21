import {step, createNode} from 'effector'
import {Signal} from './index.h'

const runner = step.run({
  fn(upd, {fn}) {
    fn(upd)
  },
})

export function createWatch(parent: Signal, fn) {
  return createNode({
    node: [runner],
    //@ts-ignore
    parent,
    meta: {op: 'watch'},
    scope: {fn},
    family: {
      type: 'crosslink',
      owners: [parent],
    },
  })
}
