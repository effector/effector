import {DOMElement} from './index.h'

import {
  ElementBlock,
  TextBlock,
  UsingBlock,
  ListBlock,
  FF,
  LF,
  Block,
  RF,
  RouteBlock,
  FragmentBlock,
  RecBlock,
  RecItemBlock,
  BlockBlock,
  BlockItemBlock,
} from './relation.h'

export function getParentBlock(block: Exclude<Block, UsingBlock>) {
  switch (block.type) {
    case 'text':
    case 'element':
    case 'list':
    case 'route':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      return block.parent
    case 'fragment':
    default:
      const _: 'fragment' = block.type
      switch (block.parent.type) {
        case 'using':
        case 'block':
          return block.parent
        default:
          return block.parent.parent
      }
  }
}

function findParentDOMElementBlock(block: Block): UsingBlock | ElementBlock {
  switch (block.type) {
    case 'using':
      return block
    case 'fragment':
      switch (block.parent.type) {
        case 'element':
        case 'using':
          return block.parent
      }
    default:
      const _ = block.type
      return findParentDOMElementBlock(getParentBlock(block))
  }
}
export function findParentDOMElement(
  block: Exclude<Block, UsingBlock | BlockBlock>,
): DOMElement | null {
  const child = findParentDOMElementBlock(block)
  if (child) return child.value
  return null
}
function findLastVisibleChildBlock(
  block:
    | FF
    | ElementBlock
    | ListBlock
    | TextBlock
    | RouteBlock
    | LF
    | RF
    | RecItemBlock
    | RecBlock
    | BlockBlock
    | BlockItemBlock,
): ElementBlock | TextBlock | null {
  if (!block.visible) return null
  switch (block.type) {
    case 'text':
    case 'element':
      return block
    case 'route':
      return findLastVisibleChildBlock(block.child)
    case 'LF':
    case 'RF':
    case 'FF':
    case 'rec':
    case 'recItem':
    case 'block':
    case 'blockItem':
      return findLastVisibleFragmentChild(block.child)
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
function findLastVisibleFragmentChild(fragment: FragmentBlock) {
  const childs = fragment.child
  for (let i = childs.length - 1; i >= 0; i--) {
    const child = childs[i]
    const visibleChild = findLastVisibleChildBlock(child)
    if (visibleChild) return visibleChild
  }
  return null
}
export function findPreviousVisibleSiblingBlock(
  block: Exclude<Block, UsingBlock>,
): TextBlock | ElementBlock | null {
  switch (block.type) {
    case 'fragment':
      switch (block.parent.type) {
        case 'element':
        case 'using':
          return null
        case 'RF': {
          const parent = block.parent.parent
          const parentFragment = parent.parent
          for (let i = parent.index - 1; i >= 0; i--) {
            const sibling = parentFragment.child[i]
            const visibleChild = findLastVisibleChildBlock(sibling)
            if (visibleChild) return visibleChild
          }
          return findPreviousVisibleSiblingBlock(parentFragment)
        }
        case 'rec':
        case 'recItem':
        case 'block':
        case 'blockItem':
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
        default: {
          const _: never = block.parent
          return null
        }
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
