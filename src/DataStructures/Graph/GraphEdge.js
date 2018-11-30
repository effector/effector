//@flow

import type {GraphVertex} from './GraphVertex'

export class GraphEdge<T> {
  weight: number
  startVertex: GraphVertex<T>
  endVertex: GraphVertex<T>

  constructor(
    startVertex: GraphVertex<T>,
    endVertex: GraphVertex<T>,
    weight: number = 0,
  ) {
    this.startVertex = startVertex
    this.endVertex = endVertex
    this.weight = weight
  }

  reverse(): this {
    const tmp = this.startVertex
    this.startVertex = this.endVertex
    this.endVertex = tmp

    return this
  }

  toString() {
    const startVertexKey = this.startVertex.toString()
    const endVertexKey = this.endVertex.toString()

    return `${startVertexKey}_${endVertexKey}`
  }
}
