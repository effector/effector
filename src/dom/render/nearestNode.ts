import {Stack} from './index.h'

function findLastVisibleNode(
  stack: Stack,
  fromIndex: number = stack.child.length - 1,
): Stack | null {
  for (let i = fromIndex; i >= 0; i--) {
    const item = stack.child[i]
    switch (item.node.type) {
      case 'element':
      case 'using':
        if (!item.visible) continue
        return item
    }
    const visibleChild = findLastVisibleNode(item)
    if (visibleChild) return visibleChild
  }
  return null
}
export function findNearestVisibleNode(stack: Stack) {
  if (!stack.parent) return null
  switch (stack.parent.node.type) {
    case 'element':
    case 'using': {
      const found = findLastVisibleNode(
        stack.parent,
        stack.parent.child.indexOf(stack) - 1,
      )
      if (found) return found
      break
    }
    case 'list':
    case 'listItem': {
      let child = stack
      let target: Stack | null = stack.parent
      while (target) {
        const found = findLastVisibleNode(
          target,
          target.child.indexOf(child) - 1,
        )
        if (found) return found
        child = target
        target = target.parent
      }
      break
    }
  }
  return null
}
