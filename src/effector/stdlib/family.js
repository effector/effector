//@flow

import type {Graphite} from './index.h'
import {getGraph} from './graph'

export const createCrosslink = (...owners: Graphite[]) => ({
  type: ('crosslink': 'crosslink'),
  owners,
})

export const addLinkToOwner = (ownerUnit: Graphite, linkUnit: Graphite) => {
  const owner = getGraph(ownerUnit)
  const link = getGraph(linkUnit)
  link.family.type = 'crosslink'
  link.family.owners.push(owner)
  owner.family.links.push(link)
}
