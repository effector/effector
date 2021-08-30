import type {NodeUnit} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'
import {DOMAIN, CROSSLINK} from './tag'
import {add, forEach} from './collection'

export const own = (ownerUnit: NodeUnit, links: NodeUnit[]) => {
  const owner = getGraph(ownerUnit)
  forEach(links, _link => {
    const link = getGraph(_link)
    if (owner.family.type !== DOMAIN) link.family.type = CROSSLINK
    add(getOwners(link), owner)
    add(getLinks(owner), link)
  })
}
