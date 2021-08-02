import type {Leaf} from './index.h'
import {pushOpToQueue} from './plan'

export function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
  const {spawn: page} = leaf
  const childSpawns = page.root.childSpawns[page.fullID]
  for (const key in childSpawns) {
    const childs = childSpawns[key]
    for (let i = 0; i < childs.length; i++) {
      const childSpawn = childs[i]
      cb(childSpawn.leaf)
    }
  }
}

export function changeChildLeafsVisible(visible: boolean, leaf: Leaf) {
  const childLeafIterator = (child: Leaf) => {
    const data = child.data
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
