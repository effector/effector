import {Leaf} from './index.h'

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
