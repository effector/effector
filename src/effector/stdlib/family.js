//@flow

import type {Graphite} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'

export const createCrosslink = (owners: Graphite[], links?: Graphite[]) => ({
  type: ('crosslink': 'crosslink'),
  owners,
  links,
})

export const addLinkToOwner = (ownerUnit: Graphite, linkUnit: Graphite) => {
  const owner = getGraph(ownerUnit)
  const link = getGraph(linkUnit)
  link.family.type = 'crosslink'
  getOwners(link).push(owner)
  getLinks(owner).push(link)
}
