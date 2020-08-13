import {Leaf} from './index.h'

export function iterateChildLeafs(leaf: Leaf, cb: (child: Leaf) => void) {
  const {spawn: page} = leaf
  for (const key in page.childSpawns) {
    const childs = page.childSpawns[key]
    for (let i = 0; i < childs.length; i++) {
      const childSpawn = childs[i]
      //@ts-ignore
      cb(childSpawn.leaf)
    }
  }
}
