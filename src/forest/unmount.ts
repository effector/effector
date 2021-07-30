import {Leaf, Spawn} from './index.h'

import {pushOpToQueue} from './plan'
import {iterateChildLeafs} from './iterateChildLeafs'

function unmountChildLeafsNoEvent(leaf: Leaf) {
  leaf.root.activeSpawns.delete(leaf.spawn.fullID)
  iterateChildLeafs(leaf, unmountLeafTree)
}

function unmountOwnSpawn({spawn}: Leaf) {
  removeItem(
    spawn,
    spawn.root.childSpawns[spawn.parent!.fullID][spawn.template.id],
  )
  removeItem(spawn, spawn.template.pages)
}

export function unmountLeafTree(leaf: Leaf) {
  const {spawn, data, root} = leaf
  switch (data.type) {
    case 'element': {
      removeItem(
        spawn,
        root.childSpawns[spawn.parent!.fullID][spawn.template.id],
      )
      function halt(spawn: Spawn) {
        root.activeSpawns.delete(spawn.fullID)
        const childSpawns = root.childSpawns[spawn.fullID]
        delete root.childSpawns[spawn.fullID]
        removeItem(spawn, spawn.template.pages)
        for (const id in childSpawns) {
          childSpawns[id].forEach(halt)
        }
      }
      halt(spawn)

      const visibleOp = data.ops.visible
      pushOpToQueue(false, visibleOp)
      break
    }
    case 'list': {
      const records = data.records
      for (let i = 0; i < records.length; i++) {
        const item = records[i]

        if (item.instance) {
          unmountLeafTree(item.instance)
        }
        item.active = false
      }
      leaf.root.activeSpawns.delete(leaf.spawn.fullID)
      unmountOwnSpawn(leaf)
      break
    }
    case 'list item': {
      const listItemBlock = data.block
      removeItem(listItemBlock, listItemBlock.parent.child)
      const leftBlock = listItemBlock.left
      const rightBlock = listItemBlock.right
      if (leftBlock) {
        leftBlock.right = rightBlock
        if (!rightBlock && listItemBlock.parent.lastChild === listItemBlock) {
          listItemBlock.parent.lastChild = leftBlock
        }
      }
      if (rightBlock) {
        rightBlock.left = leftBlock
      }
      if (
        !leftBlock &&
        !rightBlock &&
        listItemBlock.parent.lastChild === listItemBlock
      ) {
        listItemBlock.parent.lastChild = null
      }
      listItemBlock.left = null
      listItemBlock.right = null
      unmountChildLeafsNoEvent(leaf)
      unmountOwnSpawn(leaf)
      break
    }
    // including route item
    case 'route':
      unmountChildLeafsNoEvent(leaf)
      unmountOwnSpawn(leaf)
      break
    case 'block':
    case 'block item':
    case 'rec':
    case 'rec item':
      unmountChildLeafsNoEvent(leaf)
      break
    case 'using':
      break
    default: {
      const _: never = data
    }
  }
  delete root.childSpawns[spawn.fullID]
}

function removeItem<T>(item: T, list?: T[]) {
  if (!list) return
  const index = list.indexOf(item)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
