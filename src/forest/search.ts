import type {DOMElement} from './index.h'
import {printTree} from './printTree'

import type {
  ElementBlock,
  TextBlock,
  UsingBlock,
  Block,
  BlockBlock,
  ChildBlock,
} from './relation.h'

export function findParentDOMElement(
  block: Exclude<Block, UsingBlock | BlockBlock>,
): DOMElement | null {
  let parent = block.parent
  while (parent.type !== 'element' && parent.type !== 'using') {
    parent = parent.parent
  }
  if (parent) return parent.value
  return null
}
function findLastVisibleChildBlock(
  block: Exclude<Block, UsingBlock>,
): ElementBlock | TextBlock | null {
  if (!block.visible) return null
  switch (block.type) {
    case 'text':
    case 'element':
      return block
    case 'LF':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem': {
      for (let i = block.child.length - 1; i >= 0; i--) {
        const child = block.child[i]
        const visibleChild = findLastVisibleChildBlock(child)
        if (visibleChild) return visibleChild
      }
      return null
    }
    case 'list': {
      let child = block.lastChild
      if (!child) return null
      while (child) {
        const visibleChild = findLastVisibleChildBlock(child)
        if (visibleChild) return visibleChild
        child = child.left
      }
      return null
    }
    default: {
      const _: never = block
      return null
    }
  }
}

export function findPreviousVisibleSiblingBlock(
  block: Block,
): TextBlock | ElementBlock | null {
  switch (block.type) {
    case 'using':
      return null
    case 'LF': {
      let sibling = block.left
      while (sibling) {
        const visibleChild = findLastVisibleChildBlock(sibling)
        if (visibleChild) return visibleChild
        sibling = sibling.left
      }
      return findPreviousVisibleSiblingBlock(block.parent)
    }
    case 'element':
    case 'text':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
    case 'list': {
      const parentFragment = block.parent
      for (let i = block.index - 1; i >= 0; i--) {
        const sibling = parentFragment.child[i]
        if (!sibling) continue
        const visibleChild = findLastVisibleChildBlock(sibling)
        if (visibleChild) return visibleChild
      }
      switch (parentFragment.type) {
        case 'element':
        case 'using':
          return null
      }
      return findPreviousVisibleSiblingBlock(parentFragment)
    }
    default: {
      const _: never = block
      return null
    }
  }
}

export function findPreviousVisibleSibling(
  block: Exclude<Block, UsingBlock>,
): DOMElement | Text | null {
  const child = findPreviousVisibleSiblingBlock(block)
  if (child) return child.value
  return null
}
