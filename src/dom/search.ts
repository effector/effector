import {DOMElement} from './index.h'

import {
  ElementBlock,
  TextBlock,
  UsingBlock,
  FF,
  FE,
  FL,
  FT,
  LF,
  Block,
  RF,
  FR,
  FTree,
} from './relation.h'

function findParentDOMElementBlock(
  block: Exclude<Block, UsingBlock>,
): UsingBlock | ElementBlock {
  switch (block.type) {
    case 'fragment':
      switch (block.parent.type) {
        case 'EF':
        case 'UF':
          return block.parent.parent
        case 'tree':
          return findParentDOMElementBlock(block.parent.parent.parent)
      }
      return findParentDOMElementBlock(block.parent.parent)
    case 'route':
      return findParentDOMElementBlock(block.parent.parent)
    default:
      return findParentDOMElementBlock(block.parent.parent)
  }
}
export function findParentDOMElement(
  block: Exclude<Block, UsingBlock>,
): DOMElement | null {
  const child = findParentDOMElementBlock(block)
  if (child) return child.value
  return null
}
function findLastVisibleChildBlock(
  block: FF | FE | FL | FT | FR | LF | RF | FTree,
): ElementBlock | TextBlock | null {
  if (!block.visible) return null
  switch (block.type) {
    case 'FE':
    case 'FT':
      return block.child
    case 'FR':
      return findLastVisibleChildBlock(block.child.child)
    case 'LF':
    case 'RF':
    case 'FF': {
      const childs = block.child.child
      for (let i = childs.length - 1; i >= 0; i--) {
        const child = childs[i]
        const visibleChild = findLastVisibleChildBlock(child)
        if (visibleChild) return visibleChild
      }
      return null
    }
    case 'FL': {
      let child = block.child.lastChild
      if (!child) return null
      while (child) {
        const visibleChild = findLastVisibleChildBlock(child)
        if (visibleChild) return visibleChild
        child = child.left
      }
      return null
    }
    case 'FTree': {
      const childs = block.child.child.child
      for (let i = childs.length - 1; i >= 0; i--) {
        const child = childs[i]
        const visibleChild = findLastVisibleChildBlock(child)
        if (visibleChild) return visibleChild
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
  block: Exclude<Block, UsingBlock>,
): TextBlock | ElementBlock | null {
  if (block.type === 'fragment') {
    switch (block.parent.type) {
      case 'EF':
      case 'UF':
        return null
      case 'RF': {
        const parent = block.parent.parent.parent
        const parentFragment = parent.parent
        for (let i = parent.index - 1; i >= 0; i--) {
          const sibling = parentFragment.child[i]
          const visibleChild = findLastVisibleChildBlock(sibling)
          if (visibleChild) return visibleChild
        }
        return findPreviousVisibleSiblingBlock(parentFragment)
      }
      case 'FF': {
        const parent = block.parent
        const parentFragment = parent.parent
        for (let i = parent.index - 1; i >= 0; i--) {
          const sibling = parentFragment.child[i]
          const visibleChild = findLastVisibleChildBlock(sibling)
          if (visibleChild) return visibleChild
        }
        return findPreviousVisibleSiblingBlock(parentFragment)
      }
      case 'LF': {
        let sibling = block.parent.left
        while (sibling) {
          const visibleChild = findLastVisibleChildBlock(sibling)
          if (visibleChild) return visibleChild
          sibling = sibling.left
        }
        return findPreviousVisibleSiblingBlock(block.parent.parent)
      }
      case 'tree': {
        const parent = block.parent.parent
        const parentFragment = parent.parent
        for (let i = parent.index - 1; i >= 0; i--) {
          const sibling = parentFragment.child[i]
          const visibleChild = findLastVisibleChildBlock(sibling)
          if (visibleChild) return visibleChild
        }
        return findPreviousVisibleSiblingBlock(parentFragment)
      }
      default: {
        const _: never = block.parent
        return null
      }
    }
  }
  if (block.type === 'route') {
    const parentFragment = block.parent.parent
    for (let i = block.parent.index - 1; i >= 0; i--) {
      const sibling = parentFragment.child[i]
      if (!sibling) continue
      const visibleChild = findLastVisibleChildBlock(sibling)
      if (visibleChild) return visibleChild
    }
    return findPreviousVisibleSiblingBlock(parentFragment)
  }
  const parentFragment = block.parent.parent
  for (let i = block.parent.index - 1; i >= 0; i--) {
    const sibling = parentFragment.child[i]
    if (!sibling) continue
    const visibleChild = findLastVisibleChildBlock(sibling)
    if (visibleChild) return visibleChild
  }
  return findPreviousVisibleSiblingBlock(parentFragment)
}

export function findPreviousVisibleSibling(
  block: Exclude<Block, UsingBlock>,
): DOMElement | Text | null {
  const child = findPreviousVisibleSiblingBlock(block)
  if (child) return child.value
  return null
}
