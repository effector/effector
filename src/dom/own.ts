export function own(ownerUnit, ownedUnits) {
  const owner = getGraph(ownerUnit)
  for (let i = 0; i < ownedUnits.length; i++) {
    const link = getGraph(ownedUnits[i])
    link.family.type = 'crosslink'
    const owners = getOwners(link)
    const links = getLinks(owner)
    if (!owners.includes(owner)) owners.push(owner)
    if (!links.includes(link)) links.push(link)
  }
}

const getGraph = unit => unit.graphite || unit
const getOwners = node => node.family.owners
const getLinks = node => node.family.links
