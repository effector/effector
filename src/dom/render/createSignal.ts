import {step, createNode, clearNode} from 'effector'
import {activeStack} from './stack'
import {Signal, Stack} from './index.h'
import {makeSiblings, setRightSibling, setLeftSibling} from './locality'

const clearSelf = createNode({
  node: [
    step.run({
      fn(self) {
        clearNode(self)
      },
    }),
  ],
})
const clearLocality = step.compute({
  fn(_, scope: {stack: Stack | null; self: Signal}) {
    scope.self.next.push(clearSelf)
    const {stack} = scope
    const {parent} = stack
    const {left, right} = stack.locality.sibling
    if (parent) {
      if (parent.locality.child.last.ref === stack) {
        parent.locality.child.last.ref = left.ref
      }
      if (parent.locality.child.first.ref === stack) {
        parent.locality.child.first.ref = right.ref
      }
    }
    if (
      left.ref &&
      left.ref.locality.sibling.right.ref === stack &&
      right.ref &&
      right.ref.locality.sibling.left.ref === stack
    ) {
      makeSiblings(left.ref, right.ref)
    } else if (left.ref && left.ref.locality.sibling.right.ref === stack) {
      setRightSibling(left.ref, null)
    } else if (right.ref && right.ref.locality.sibling.left.ref === stack) {
      setLeftSibling(right.ref, null)
    }
  },
})
const sendSelf = step.compute({
  fn: (_, {self}) => self,
})
export function createSignal(): Signal {
  const scope = {stack: null} as any
  const parent = activeStack.get()
  const signal = createNode({
    node: [clearLocality, sendSelf],
    //@ts-ignore
    parent: [parent && parent.signal].filter(Boolean),
    meta: {unit: 'signal'},
    scope,
  })
  scope.self = signal
  return signal
}
