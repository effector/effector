import type {Leaf} from './index.h'

import {pushOpToQueue} from './plan'
import {iterateChildLeafs} from './iterateChildLeafs'

function unmountChildLeafsNoEvent(leaf: Leaf) {
  leaf.root.activeSpawns.delete(leaf.fullID)
  iterateChildLeafs(leaf, unmountLeafTree)
}

function unmountOwnSpawn(leaf: Leaf) {
  removeItem(leaf, leaf.root.childSpawns[leaf.parent!.fullID][leaf.template.id])
  removeItem(leaf, leaf.template.pages)
}

export function unmountLeafTree(leaf: Leaf) {
  const {data, root} = leaf
  switch (data.type) {
    case 'element': {
      removeItem(leaf, root.childSpawns[leaf.parent!.fullID][leaf.template.id])
      function halt(leaf: Leaf) {
        root.activeSpawns.delete(leaf.fullID)
        const childSpawns = root.childSpawns[leaf.fullID]
        delete root.childSpawns[leaf.fullID]
        delete root.leafOps[leaf.fullID]
        removeItem(leaf, leaf.template.pages)
        for (const id in childSpawns) {
          childSpawns[id].forEach(halt)
        }
      }
      halt(leaf)

      const visibleOp = data.ops.visible
      pushOpToQueue(false, visibleOp)
      break
    }
    case 'list': {
      data.records.forEach(item => {
        if (item.instance) {
          unmountLeafTree(item.instance)
        }
        item.active = false
      })
      leaf.root.activeSpawns.delete(leaf.fullID)
      unmountOwnSpawn(leaf)
      break
    }
    case 'listItem': {
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
    case 'blockItem':
    case 'rec':
    case 'recItem':
      unmountChildLeafsNoEvent(leaf)
      break
    case 'using':
      break
    default: {
      const _: never = data
    }
  }
  delete root.childSpawns[leaf.fullID]
  delete root.leafOps[leaf.fullID]
}

function removeItem<T>(item: T, list?: T[]) {
  if (!list) return
  const index = list.indexOf(item)
  if (index !== -1) {
    list.splice(index, 1)
  }
}
