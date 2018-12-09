//@flow
import type {Graph} from './Graph'
import type {GraphVertex} from './GraphVertex'
import {Stack} from '../Stack/Stack'
import {depthFirstSearch} from './depthFirstSearch'

/**
 * @param {Graph} graph
 * @return {Stack}
 */
function getVerticesSortedByDfsFinishTime<T>(
  graph: Graph<T>,
): Stack<GraphVertex<T>> {
  // Set of all visited vertices during DFS pass.
  const visitedVerticesSet = {}

  // Stack of vertices by finish time.
  // All vertices in this stack are ordered by finished time in decreasing order.
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByDfsFinishTime = new Stack((a, b) => {
    if (a.id === b.id) return (0: 0)
    if (a.value === b.value) return (0: 0)
    if (a.value > b.value) return (1: 1)
    return (-1: -1)
  })

  // Set of all vertices we're going to visit.
  const notVisitedVerticesSet = {}
  graph.getAllVertices().forEach(vertex => {
    notVisitedVerticesSet[vertex.toString()] = vertex
  })

  // Specify DFS traversal callbacks.
  const dfsCallbacks = {
    enterVertex({currentVertex}) {
      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.toString()] = currentVertex

      // Delete current vertex from not visited set.
      delete notVisitedVerticesSet[currentVertex.toString()]
    },
    leaveVertex({currentVertex}) {
      // Push vertex to the stack when leaving it.
      // This will make stack to be ordered by finish time in decreasing order.
      verticesByDfsFinishTime.push(currentVertex)
    },
    allowTraversal({nextVertex}) {
      // Don't allow to traverse the nodes that have been already visited.
      return !visitedVerticesSet[nextVertex.toString()]
    },
  }

  // Do FIRST DFS PASS traversal for all graph vertices to fill the verticesByFinishTime stack.
  while (Object.values(notVisitedVerticesSet).length) {
    // Peek any vertex to start DFS traversal from.
    const startVertexKey = Object.keys(notVisitedVerticesSet)[0]
    const startVertex = notVisitedVerticesSet[startVertexKey]
    delete notVisitedVerticesSet[startVertexKey]

    depthFirstSearch(graph, startVertex, dfsCallbacks)
  }

  return verticesByDfsFinishTime
}

function getSCCSets<T>(
  graph: Graph<T>,
  verticesByFinishTime: Stack<GraphVertex<T>>,
): Array<Array<T>> {
  // Array of arrays of strongly connected vertices.
  const stronglyConnectedComponentsSets = []

  // Array that will hold all vertices that are being visited during one DFS run.
  let stronglyConnectedComponentsSet = []

  // Visited vertices set.
  const visitedVerticesSet = {}

  // Callbacks for DFS traversal.
  const dfsCallbacks = {
    enterVertex({currentVertex}) {
      // Add current vertex to SCC set of current DFS round.
      stronglyConnectedComponentsSet.push(currentVertex)

      // Add current vertex to visited set.
      visitedVerticesSet[currentVertex.toString()] = currentVertex
    },
    leaveVertex({previousVertex}) {
      // Once DFS traversal is finished push the set of found strongly connected
      // components during current DFS round to overall strongly connected components set.
      // The sign that traversal is about to be finished is that we came back to start vertex
      // which doesn't have parent.
      if (previousVertex === null) {
        stronglyConnectedComponentsSets.push([
          ...stronglyConnectedComponentsSet,
        ])
      }
    },
    allowTraversal({nextVertex}) {
      // Don't allow traversal of already visited vertices.
      return !visitedVerticesSet[nextVertex.toString()]
    },
  }
  let startVertex
  while ((startVertex = verticesByFinishTime.pop())) {
    // Reset the set of strongly connected vertices.
    stronglyConnectedComponentsSet = []

    // Don't do DFS on already visited vertices.
    if (!visitedVerticesSet[startVertex.toString()]) {
      // Do DFS traversal.
      depthFirstSearch(graph, startVertex, dfsCallbacks)
    }
  }

  return stronglyConnectedComponentsSets
}

/**
 * Kosaraju's algorithm.
 *
 * @param {Graph} graph
 * @return {*[]}
 */
export function stronglyConnectedComponents<T>(
  graph: Graph<T>,
): Array<Array<T>> {
  // In this algorithm we will need to do TWO DFS PASSES overt the graph.

  // Get stack of vertices ordered by DFS finish time.
  // All vertices in this stack are ordered by finished time in decreasing order:
  // Vertex that has been finished first will be at the bottom of the stack and
  // vertex that has been finished last will be at the top of the stack.
  const verticesByFinishTime = getVerticesSortedByDfsFinishTime(graph)

  // Reverse the graph.
  graph.reverse()

  // Do DFS once again on reversed graph.
  return getSCCSets(graph, verticesByFinishTime)
}
