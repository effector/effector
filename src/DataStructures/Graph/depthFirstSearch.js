//@flow
import type {Graph} from './Graph'
import type {GraphVertex} from './GraphVertex'
export type Callbacks = {
  allowTraversal?: (arg0: any, arg1: any) => boolean,
  enterVertex?: (arg0: any, arg1: any) => any,
  leaveVertex?: (arg0: any, arg1: any) => any,
}
type CallbacksFull = {
  allowTraversal: (arg0: any, arg1: any) => boolean,
  enterVertex: (arg0: any, arg1: any) => any,
  leaveVertex: (arg0: any, arg1: any) => any,
}
/**
 * @typedef {Object} Callbacks
 *
 * @property {function(vertices: Object): boolean} [allowTraversal] -
 *  Determines whether DFS should traverse from the vertex to its neighbor
 *  (along the edge). By default prohibits visiting the same vertex again.
 *
 * @property {function(vertices: Object)} [enterVertex] - Called when DFS enters the vertex.
 *
 * @property {function(vertices: Object)} [leaveVertex] - Called when DFS leaves the vertex.
 */

/**
 * @param {Callbacks} [callbacks]
 * @returns {Callbacks}
 */
function initCallbacks(callbacks: Callbacks = {}): CallbacksFull {
  const initiatedCallback: $Shape<CallbacksFull> = callbacks

  const stubCallback = () => {}

  const allowTraversalCallback = (() => {
    const seen = {}
    return ({nextVertex}) => {
      if (!seen[nextVertex.toString()]) {
        seen[nextVertex.toString()] = true
        return true
      }
      return false
    }
  })()

  initiatedCallback.allowTraversal =
    callbacks.allowTraversal || allowTraversalCallback
  initiatedCallback.enterVertex = callbacks.enterVertex || stubCallback
  initiatedCallback.leaveVertex = callbacks.leaveVertex || stubCallback

  return initiatedCallback
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} currentVertex
 * @param {GraphVertex} previousVertex
 * @param {Callbacks} callbacks
 */
function depthFirstSearchRecursive<T>(
  graph: Graph<T>,
  currentVertex: GraphVertex<T>,
  previousVertex: GraphVertex<T> | null,
  callbacks,
) {
  callbacks.enterVertex({currentVertex, previousVertex})

  graph.getNeighbors(currentVertex).forEach(nextVertex => {
    if (callbacks.allowTraversal({previousVertex, currentVertex, nextVertex})) {
      depthFirstSearchRecursive(graph, nextVertex, currentVertex, callbacks)
    }
  })

  callbacks.leaveVertex({currentVertex, previousVertex})
}

/**
 * @param {Graph} graph
 * @param {GraphVertex} startVertex
 * @param {Callbacks} [callbacks]
 */
export function depthFirstSearch<T>(
  graph: Graph<T>,
  startVertex: GraphVertex<T>,
  callbacks?: Callbacks,
) {
  const previousVertex = null
  depthFirstSearchRecursive(
    graph,
    startVertex,
    previousVertex,
    initCallbacks(callbacks),
  )
}
