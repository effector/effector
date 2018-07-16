//@flow

import {Vertex, VertexRef} from './Vertex'

export class Graph<T> {
 verticles: Array<Vertex<T>> = []
 rings = 0
 values: Array<T>
 active = false
 changed = false
 decompose() {
  if (this.active) {
   decomposeGraph(this)
  } else {
   this.changed = true
  }
 }
 addNode<S>(data: S): Vertex<S> {
  const vert = new Vertex<S>(data)
  this.verticles.push(vert)
  this.decompose()
  return vert
 }
 dependsOn(dependent: Vertex<T>, dependency: Vertex<T>) {
  dependent.dependsOn(dependency)
  this.decompose()
 }
 breakDependency(dependent: Vertex<T>, dependency: Vertex<T>) {
  const index = dependent.connections.indexOf(dependency)
  if (index === -1) return
  dependent.connections.splice(index, 1)
  this.decompose()
 }
 activate() {
  this.active = true
  if (!this.changed) return
  this.changed = false
  decomposeGraph(this)
 }
}
let i = 0
class TarjanContext<T> {
 vertices: Array<Vertex<T>>
 values: Array<T>
 vertIDs: Array<number>
 vertRefs: Array<VertexRef>
 +id: number = ++i
 scc: Array<Array<T>> = []
 index = 0
 refStack: Array<VertexRef> = []
 connections: Array<Array<number>>
}

function strongconnect<T>(ctx: TarjanContext<T>, vertex: VertexRef) {
 // Set the depth index for v to the smallest unused index
 vertex.index = ctx.index
 vertex.lowlink = ctx.index
 ctx.index = ctx.index + 1
 ctx.refStack.push(vertex)

 // Consider successors of v
 // aka... consider each vertex in vertex.connections
 const connects = ctx.connections[vertex.valueIndex]
 for (let w, i = 0; i < connects.length; i++) {
  w = ctx.vertRefs[connects[i]]
  if (w.index < 0) {
   // Successor w has not yet been visited; recurse on it
   strongconnect(ctx, w)
   vertex.lowlink = Math.min(vertex.lowlink, w.lowlink)
  } else if (ctx.refStack.indexOf(w) !== -1) {
   // Successor w is in stack S and hence in the current SCC
   vertex.lowlink = Math.min(vertex.lowlink, w.index)
  }
 }

 // If v is a root node, pop the stack and generate an SCC
 if (vertex.lowlink !== vertex.index) return
 // start a new strongly connected component
 const currentScc = []
 let ww
 if (ctx.refStack.length > 0) {
  do {
   ww = ctx.refStack.pop()
   // add ww to current strongly connected component
   currentScc.push(ctx.values[ww.valueIndex])
  } while (vertex.valueIndex !== ww.valueIndex)
 }
 // output the current strongly connected component
 // ... i'm going to push the results to a member scc array variable
 if (currentScc.length > 0) {
  ctx.scc.push(currentScc)
 }
}
function comparator<T>(a: Vertex<T>, b: Vertex<T>) {
 if (a.id === b.id) return 0
 if (a.id > b.id) return -1
 return 1
}
export function decomposeGraph<T>(graph: Graph<T>) {
 //$todo wtf
 const blocks: Array<Array<T>> = tarjan(graph.verticles)
 const result: Array<T> = []
 for (let i = 0; i < blocks.length; i++) {
  result.push(...blocks[i])
 }
 graph.values = result
 graph.rings = blocks.length
 return result
}
export function tarjan<T>(nodes: Array<Vertex<T>>) {
 // const nodes = nodes_.sort(comparator)
 const ctx = new TarjanContext<T>()
 ctx.vertices = nodes
 const values = new Array(nodes.length)
 const vertIDs = new Array(nodes.length)
 const vertRefs = new Array(nodes.length)
 const connections = new Array(nodes.length)
 ctx.values = values
 ctx.vertIDs = vertIDs
 ctx.vertRefs = vertRefs
 ctx.connections = connections
 for (let i = 0; i < nodes.length; i++) {
  const vert = nodes[i]

  values[i] = vert.name
  vertIDs[i] = vert.id
  vertRefs[i] = new VertexRef(i)
 }
 for (let i = 0; i < nodes.length; i++) {
  const vert = nodes[i]
  connections[i] = vert.connections.map(con => vertIDs.indexOf(con.id))
  // console.log(connections)
 }
 for (const vert of vertRefs) {
  if (vert.index < 0) {
   strongconnect(ctx, vert)
  }
 }
 return ctx.scc
}
