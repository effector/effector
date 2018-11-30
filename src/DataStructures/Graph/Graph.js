//@flow
import invariant from 'invariant'
import type {GraphVertex} from './GraphVertex'
import type {GraphEdge} from './GraphEdge'

export class Graph<T> {
  vertices = {}
  edges = {}
  /*::;+*/ isDirected: boolean
  constructor(isDirected: boolean = false) {
    this.isDirected = isDirected
  }

  addVertex(newVertex: GraphVertex<T>): this {
    this.vertices[newVertex.toString()] = newVertex

    return this
  }

  /**
   * @param {string} vertexKey
   * @returns GraphVertex
   */
  getVertexByKey(vertexKey) {
    return this.vertices[vertexKey]
  }

  getNeighbors(vertex: GraphVertex<T>): Array<GraphVertex<T>> {
    return vertex.getNeighbors()
  }

  getAllVertices(): Array<GraphVertex<T>> {
    return Object.values(this.vertices)
  }

  getAllEdges(): Array<GraphEdge<T>> {
    return Object.values(this.edges)
  }

  addEdge(edge: GraphEdge<T>): this {
    // Try to find and end start vertices.
    let startVertex = this.getVertexByKey(edge.startVertex.toString())
    let endVertex = this.getVertexByKey(edge.endVertex.toString())

    // Insert start vertex if it wasn't inserted.
    if (!startVertex) {
      this.addVertex(edge.startVertex)
      startVertex = this.getVertexByKey(edge.startVertex.toString())
    }

    // Insert end vertex if it wasn't inserted.
    if (!endVertex) {
      this.addVertex(edge.endVertex)
      endVertex = this.getVertexByKey(edge.endVertex.toString())
    }

    // Check if edge has been already added.
    if (this.edges[edge.toString()]) {
      throw new Error('Edge has already been added before')
    } else {
      this.edges[edge.toString()] = edge
    }

    // Add edge to the vertices.
    if (this.isDirected) {
      // If graph IS directed then add the edge only to start vertex.
      startVertex.addEdge(edge)
    } else {
      // If graph ISN'T directed then add the edge to both vertices.
      startVertex.addEdge(edge)
      endVertex.addEdge(edge)
    }

    return this
  }

  /**
   * @param {GraphEdge} edge
   */
  deleteEdge(edge: GraphEdge<T>) {
    // Delete edge from the list of edges.
    invariant(this.edges[edge.toString()], 'Edge not found in graph')
    delete this.edges[edge.toString()]

    // Try to find and end start vertices and delete edge from them.
    const startVertex = this.getVertexByKey(edge.startVertex.toString())
    const endVertex = this.getVertexByKey(edge.endVertex.toString())

    startVertex.deleteEdge(edge)
    endVertex.deleteEdge(edge)
  }

  /**
   * @param {GraphVertex} startVertex
   * @param {GraphVertex} endVertex
   * @return {(GraphEdge|null)}
   */
  findEdge(
    startVertex: GraphVertex<T>,
    endVertex: GraphVertex<T>,
  ): GraphEdge<T> | null {
    const vertex = this.getVertexByKey(startVertex.toString())

    if (!vertex) {
      return null
    }

    return vertex.findEdge(endVertex)
  }

  /**
   * @param {string} vertexKey
   * @returns {GraphVertex}
   */
  findVertexByKey(vertexKey) {
    if (this.vertices[vertexKey]) {
      return this.vertices[vertexKey]
    }

    return null
  }

  /**
   * @return {number}
   */
  getWeight() {
    return this.getAllEdges().reduce(
      (weight, graphEdge) => weight + graphEdge.weight,
      0,
    )
  }

  /**
   * Reverse all the edges in directed graph.
   * @return {Graph}
   */
  reverse() {
    /** @param {GraphEdge} edge */
    this.getAllEdges().forEach(edge => {
      // Delete straight edge from graph and from vertices.
      this.deleteEdge(edge)

      // Reverse the edge.
      edge.reverse()

      // Add reversed edge back to the graph and its vertices.
      this.addEdge(edge)
    })

    return this
  }

  /**
   * @return {object}
   */
  getVerticesIndices() {
    const verticesIndices = {}
    this.getAllVertices().forEach((vertex, index) => {
      verticesIndices[vertex.toString()] = index
    })

    return verticesIndices
  }

  /**
   * @return {*[][]}
   */
  getAdjacencyMatrix() {
    const vertices = this.getAllVertices()
    const verticesIndices = this.getVerticesIndices()

    // Init matrix with infinities meaning that there is no ways of
    // getting from one vertex to another yet.
    const adjacencyMatrix = Array(vertices.length)
      .fill(null)
      .map(() => Array(vertices.length).fill(Infinity))

    // Fill the columns.
    vertices.forEach((vertex, vertexIndex) => {
      vertex.getNeighbors().forEach(neighbor => {
        const neighborIndex = verticesIndices[neighbor.toString()]
        adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(
          vertex,
          neighbor,
        ).weight
      })
    })

    return adjacencyMatrix
  }

  /**
   * @return {string}
   */
  toString() {
    return Object.keys(this.vertices).toString()
  }
}
