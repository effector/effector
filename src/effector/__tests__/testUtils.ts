import {getGraph, getLinks} from '../getter'
import {traverse} from '../collection'
import type {Node} from '../index.h'

export function activateAllDownstream(units: any[]) {
  units.forEach(unit => {
    traverse(getGraph(unit), (node: Node, visit) => {
      if (node.lazy) {
        node.lazy.alwaysActive = true
        node.lazy.activate.forEach(visit)
      }
      node.next.forEach(visit)
      getLinks(node).forEach(visit)
    })
  })
}
