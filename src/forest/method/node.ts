import type {DOMElement} from '../index.h'

import {currentActor} from '../template'

import {assertClosure} from '../assert'

export function node(cb: (node: DOMElement) => (() => void) | void) {
  assertClosure(currentActor, 'node')
  const draft = currentActor.draft
  switch (draft.type) {
    case 'list':
    case 'listItem':
    case 'using':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      console.error('node() hook supported only in h() nodes')
      return
  }
  draft.node.push(cb)
}
