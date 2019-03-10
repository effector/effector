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
  return Object.values(idMap)
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
      parentIds: [],
    })
    if (parentId) {
      normNode.parentIds.push(parentId)
    }
    switch (node.type) {
      case 'single': {
        addToMap({
          id: node.data.id,
          type: node.data.type,
          group: node.data.group,
          parentIds: [parentId],
        })
        delete idMap[normNode.id]
        break
      }
      case 'multi':
      case 'seq': {
        // console.log(node.data)
        for (const child of node.data) {
          traverse(child, {parentId: node.id})
        }
        break
      }
      default: {
        throw Error(`unknown type "${String(node.type)}"`)
      }
    }
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
