//@flow

/**
 * real graph, dump of src/store/__tests__/diamond-deps
 * test 'olympic' event 'A'
 */
import raw from './out.json'

export const real = preprocessGraph(raw)

function preprocessGraph(raw) {
  const idMap = {}

  traverse(raw, {parentId: null})
  const result = Object.values(idMap)
  //$todo
  result.sort((a, b) => parseInt(b.id, 36) - parseInt(a.id, 36))
  return result
  function addToMap(normNode) {
    if (normNode.id in idMap) {
      idMap[normNode.id].parentIds.push(...normNode.parentIds)
    } else {
      idMap[normNode.id] = normNode
    }
    return idMap[normNode.id]
  }
  function traverse(node, {parentId}) {
    const normNode = addToMap({
      id: node.id,
      type: node.type,
      group: node.group,
      data: node.data,
      parentIds: [],
    })
    if (parentId) {
      normNode.parentIds.push(parentId)
    }
    let nodeUsed = true
    switch (node.type) {
      case 'single': {
        addToMap({
          id: node.data.id,
          type: node.data.type,
          group: node.data.group,
          data: node.data.data,
          parentIds: [parentId],
        })
        delete idMap[normNode.id]
        return String(node.data.id)
      }
      case 'multi': {
        if (node.data.length === 0) {
          delete idMap[normNode.id]
          nodeUsed = false
          break
        }
        // console.log(node.data)
        for (const child of node.data) {
          traverse(child, {parentId: node.id})
        }
        break
      }
      case 'seq': {
        if (node.data.length === 0) {
          delete idMap[normNode.id]
          nodeUsed = false
          break
        }
        // console.log(node.data)
        let currentID = String(normNode.id)
        let childSaved = false
        let childID = currentID
        for (const child of node.data) {
          const nextID = traverse(child, {parentId: currentID})
          if (typeof nextID === 'string') {
            currentID = nextID
            if (!childSaved) {
              childID = nextID
              childSaved = true
            }
          }
        }
        return childID
      }
      default: {
        throw Error(`unknown type "${String(node.type)}"`)
      }
    }
    if (nodeUsed) return String(node.id)
  }
}
/**
 * example data from d3-dag
 */
export const grafo = [
  {
    id: '0',
    parentIds: ['8'],
  },
  {
    id: '1',
    parentIds: [],
  },
  {
    id: '2',
    parentIds: [],
  },
  {
    id: '3',
    parentIds: ['11'],
  },
  {
    id: '4',
    parentIds: ['12'],
  },
  {
    id: '5',
    parentIds: ['18'],
  },
  {
    id: '6',
    parentIds: ['9', '15', '17'],
  },
  {
    id: '7',
    parentIds: ['3', '17', '20', '21'],
  },
  {
    id: '8',
    parentIds: [],
  },
  {
    id: '9',
    parentIds: ['4'],
  },
  {
    id: '10',
    parentIds: ['16', '21'],
  },
  {
    id: '11',
    parentIds: ['2'],
  },
  {
    id: '12',
    parentIds: ['21'],
  },
  {
    id: '13',
    parentIds: ['4', '12'],
  },
  {
    id: '14',
    parentIds: ['1', '8'],
  },
  {
    id: '15',
    parentIds: [],
  },
  {
    id: '16',
    parentIds: ['0'],
  },
  {
    id: '17',
    parentIds: ['19'],
  },
  {
    id: '18',
    parentIds: ['9'],
  },
  {
    id: '19',
    parentIds: [],
  },
  {
    id: '20',
    parentIds: ['13'],
  },
  {
    id: '21',
    parentIds: [],
  },
]
