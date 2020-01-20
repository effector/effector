import {step, withRegion} from 'effector'
import {nodeStack, activeStack} from './stack'
import {DOMElement, NSType, Stack} from './index.h'
import {createSignal} from './createSignal'
import {document} from './documentResolver'

export function using(node: DOMElement, cb: () => any): void {
  const namespaceURI = node.namespaceURI
  const tag = node.tagName.toLowerCase()
  const ns: NSType =
    namespaceURI === 'http://www.w3.org/2000/svg'
      ? 'svg'
      : tag === 'foreignObject'
      ? 'foreignObject'
      : 'html'
  const parentStack = activeStack.get()
  const stack: Stack = {
    parent: parentStack,
    signal:
      parentStack && parentStack.signal ? parentStack.signal : createSignal(),
    namespace: ns,
    targetElement: node,
    svgRoot:
      tag === 'svg' ? (node as any) : parentStack ? parentStack.svgRoot : null,
    child: [],
    locality: {
      sibling: {
        left: {ref: null},
        right: {ref: null},
      },
      child: {
        first: {ref: null},
        last: {ref: null},
      },
    },
    node: {
      type: 'using',
      pure: false,
      attr: [],
      data: [],
      visible: [],
      text: [],
      styleVar: [],
      styleProp: [],
      handler: [],
      transform: [],
      focus: [],
      blur: [],
    },
    mountStatus: 'initial',
    visible: true,
  }
  // if (!parentStack || !parentStack.signal) {
  //   stack.signal.scope.stack = stack
  // }
  activeStack.replace(stack)
  nodeStack.push({node, append: [], reverse: false})
  try {
    withRegion(stack.signal, cb)
  } finally {
    appendBatch(nodeStack.pop())
    activeStack.replace(parentStack)
  }
}
export function appendBatch({node, append, reverse = false}) {
  if (append.length === 0) return
  const frag = document.createDocumentFragment()
  if (!reverse) {
    for (let i = 0; i < append.length; i++) {
      frag.appendChild(append[i])
    }
    node.appendChild(frag)
  } else {
    for (let i = append.length - 1; i >= 0; i--) {
      frag.appendChild(append[i])
    }
    node.prepend(frag)
  }
}

export function forwardStacks(parent: Stack, child: Stack) {
  child.parent = parent
  child.signal.seq.push(removeFromParent)
  child.signal.scope.stack = child
  parent.child.push(child)
}

const removeFromParent = step.compute({
  fn(upd, scope: {stack: Stack}) {
    if (!scope.stack) return upd
    const {stack} = scope
    scope.stack = null
    const index = stack.parent.child.indexOf(stack)
    if (index !== -1) {
      stack.parent.child.splice(index, 1)
    }
    stack.parent = null
    return upd
  },
})
