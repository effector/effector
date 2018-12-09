//@flow
import invariant from 'invariant'
import {LinkedList} from '../LinkedList/LinkedList'

import type {GraphEdge} from './GraphEdge'

let id = 0

export class GraphVertex<T> {
  /*::+*/ id = ++id
  value: T
  edges: LinkedList<GraphEdge<T>>
  constructor(
    value: T,
    edgeComparator: (a: GraphEdge<T>, b: GraphEdge<T>) => -1 | 0 | 1,
  ) {
    invariant(value !== undefined, 'no value')

    // Normally you would store string value like vertex name.
    // But generally it may be any object as well
    this.value = value
    this.edges = new LinkedList(edgeComparator)
  }

  addEdge(edge: GraphEdge<T>): this {
    this.edges.append(edge)

    return this
  }

  deleteEdge(edge: GraphEdge<T>) {
    this.edges.delete(edge)
  }

  /**
   * @returns {GraphVertex[]}
   */
  getNeighbors() {
    const edges = this.edges.toArray()

    /** @param {LinkedListNode} node */
    const neighborsConverter = node =>
      node.value.startVertex === this
        ? node.value.endVertex
        : node.value.startVertex

    // Return either start or end vertex.
    // For undirected graphs it is possible that current vertex will be the end one.
    return edges.map(neighborsConverter)
  }

  getEdges(): Array<GraphEdge<T>> {
    return this.edges.toArray().map(linkedListNode => linkedListNode.value)
  }

  /**
   * @return {number}
   */
  getDegree() {
    return this.edges.toArray().length
  }

  /**
   * @param {GraphEdge} requiredEdge
   * @returns {boolean}
   */
  hasEdge(requiredEdge: GraphEdge<T>) {
    const edgeNode = this.edges.findCompare(edge => edge === requiredEdge)

    return !!edgeNode
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {boolean}
   */
  hasNeighbor(vertex: GraphVertex<T>) {
    const vertexNode = this.edges.findCompare(
      edge => edge.startVertex === vertex || edge.endVertex === vertex,
    )

    return !!vertexNode
  }

  /**
   * @param {GraphVertex} vertex
   * @returns {(GraphEdge|null)}
   */
  findEdge(vertex: GraphVertex<T>): GraphEdge<T> | null {
    const edge = this.edges.findCompare(
      edge => edge.startVertex === vertex || edge.endVertex === vertex,
    )

    return edge ? edge.value : null
  }

  deleteAllEdges(): this {
    for (const edge of this.getEdges()) {
      this.deleteEdge(edge)
    }
    return this
  }

  /**
   * @param {function} [callback]
   * @returns {string}
   */
  toString(callback?: (value: T) => string): string {
    return callback ? callback(this.value) : String(this.value)
  }
}
const stringComparator = (a: GraphEdge<string>, b: GraphEdge<string>) => {
  if (a === b) return (0: 0)
  const as = a.toString()
  const bs = b.toString()
  if (as === bs) return (0: 0)
  if (as > bs) return (1: 1)
  return (-1: -1)
}

export function graphVertexString(value: string): GraphVertex<string> {
  return new GraphVertex(value, stringComparator)
}
