//@flow
let i = 0
export class Vertex<T> {
  /*::;+*/ id = ++i
  name: T
  connections: Array<Vertex<T>> = []
  constructor(name: T) {
    this.name = name
  }

  dependsOn(vertex: Vertex<T>) {
    this.connections.push(vertex)
  }
  createChild<S>(_: S): Vertex<S> {
    const vertex = new Vertex<S>(_)
    vertex.connections.push(this)
    return vertex
  }
}

export class VertexRef {
  /*::;+*/ valueIndex: number
  // used in tarjan algorithm
  // went ahead and explicity initalized them
  index = -1
  lowlink = -1
  constructor(valueIndex: number) {
    this.valueIndex = valueIndex
  }
}
