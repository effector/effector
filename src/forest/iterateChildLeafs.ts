import {launch} from 'effector'
import type {Leaf} from './index.h'
import {pushOpToQueue} from './plan'

export function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
  const childSpawns = leaf.root.childSpawns[leaf.fullID]
  for (const key in childSpawns) {
    const childs = childSpawns[key]
    childs.forEach(cb)
  }
}

export function changeChildLeafsVisible(visible: boolean, leaf: Leaf) {
  const childLeafIterator = (child: Leaf) => {
    const data = child.data
    if (visible && data.type === 'list' && data.pendingUpdate) {
      const update = data.pendingUpdate
      data.pendingUpdate = null
      launch({
        target: child.template.api.pendingUpdate,
        params: update,
        defer: true,
        page: child,
        //@ts-expect-error
        scope: child.root.scope,
      })
    }
    if (visible && data.type === 'route') {
      if (data.pendingInit) {
        const update = data.pendingInit.value
        data.pendingInit = null
        launch({
          target: child.template.api.pendingInit,
          params: update,
          defer: true,
          page: child,
          //@ts-expect-error
          scope: child.root.scope,
        })
      } else if (!data.block.visible) return
    }
    switch (data.type) {
      case 'element':
        pushOpToQueue(visible, data.ops.visible)
        break
      case 'route':
      case 'list':
      case 'list item':
        iterateChildLeafs(child, childLeafIterator)
        break
      default:
        console.log('unsupported type', data.type)
    }
  }
  iterateChildLeafs(leaf, childLeafIterator)
}
