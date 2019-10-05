//@flow

import type {Graphite} from './index.h'
import {getGraph, getOwners, getLinks} from './getter'

export const addLinkToOwner = (ownerUnit: Graphite, linkUnit: Graphite) => {
  const owner = getGraph(ownerUnit)
  const link = getGraph(linkUnit)
  if (owner.family.type !== 'domain') link.family.type = 'crosslink'
  getOwners(link).push(owner)
  getLinks(owner).push(link)
}
