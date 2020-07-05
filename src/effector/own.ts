import {Graphite} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'

export const own = (ownerUnit: Graphite, links: Graphite[]) => {
  const owner = getGraph(ownerUnit)
  for (let i = 0; i < links.length; i++) {
    const link = getGraph(links[i])
    if (owner.family.type !== 'domain') link.family.type = 'crosslink'
    getOwners(link).push(owner)
    getLinks(owner).push(link)
  }
}
