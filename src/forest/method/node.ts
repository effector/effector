import type {DOMElement} from '../index.h'

import {currentTemplate} from '../engine/createTemplate'

import {assertClosure} from '../assert'

export function node(cb: (node: DOMElement) => (() => void) | void) {
  assertClosure(currentTemplate, 'node')
  const draft = currentTemplate.draft
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
