import {NodeUnit} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'
import {DOMAIN, CROSSLINK} from './tag'

export const own = (ownerUnit: NodeUnit, links: NodeUnit[]) => {
  const owner = getGraph(ownerUnit)
  for (let i = 0; i < links.length; i++) {
    const link = getGraph(links[i])
    if (owner.family.type !== DOMAIN) link.family.type = CROSSLINK
    getOwners(link).push(owner)
    getLinks(owner).push(link)
  }
}
