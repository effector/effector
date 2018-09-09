//@flow

import invariant from 'invariant'

import {Graph} from '../Graph'
import {GraphVertex, graphVertexString} from '../GraphVertex'
import {GraphEdge} from '../GraphEdge'

describe('Graph', () => {
 it('should add vertices to graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')

  graph.addVertex(vertexA).addVertex(vertexB)

  expect(graph.toString()).toBe('A,B')
  expect(graph.getVertexByKey(vertexA.toString())).toEqual(vertexA)
  expect(graph.getVertexByKey(vertexB.toString())).toEqual(vertexB)
 })

 it('should add edges to undirected graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)

  graph.addEdge(edgeAB)

  expect(graph.getAllVertices().length).toBe(2)
  expect(graph.getAllVertices()[0]).toEqual(vertexA)
  expect(graph.getAllVertices()[1]).toEqual(vertexB)

  const graphVertexA = graph.findVertexByKey(vertexA.toString())
  const graphVertexB = graph.findVertexByKey(vertexB.toString())

  expect(graph.toString()).toBe('A,B')
  expect(graphVertexA).toBeDefined()
  expect(graphVertexB).toBeDefined()

  expect(graph.findVertexByKey('not existing')).toBeNull()
  invariant(graphVertexA, 'not found')
  expect(graphVertexA.getNeighbors().length).toBe(1)
  expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB)
  expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB)

  invariant(graphVertexB, 'not found')
  expect(graphVertexB.getNeighbors().length).toBe(1)
  expect(graphVertexB.getNeighbors()[0]).toEqual(vertexA)
  expect(graphVertexB.getNeighbors()[0]).toEqual(graphVertexA)
 })

 it('should add edges to directed graph', () => {
  const graph = new Graph<string>(true)

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)

  graph.addEdge(edgeAB)

  const graphVertexA = graph.findVertexByKey(vertexA.toString())
  const graphVertexB = graph.findVertexByKey(vertexB.toString())

  expect(graph.toString()).toBe('A,B')
  expect(graphVertexA).toBeDefined()
  expect(graphVertexB).toBeDefined()

  invariant(graphVertexA, 'not found')
  expect(graphVertexA.getNeighbors().length).toBe(1)
  expect(graphVertexA.getNeighbors()[0]).toEqual(vertexB)
  expect(graphVertexA.getNeighbors()[0]).toEqual(graphVertexB)

  invariant(graphVertexB, 'not found')
  expect(graphVertexB.getNeighbors().length).toBe(0)
 })

 it('should find edge by vertices in undirected graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB, 10)

  graph.addEdge(edgeAB)

  const graphEdgeAB = graph.findEdge(vertexA, vertexB)
  const graphEdgeBA = graph.findEdge(vertexB, vertexA)
  const graphEdgeAC = graph.findEdge(vertexA, vertexC)
  const graphEdgeCA = graph.findEdge(vertexC, vertexA)

  expect(graphEdgeAC).toBeNull()
  expect(graphEdgeCA).toBeNull()
  expect(graphEdgeAB).toEqual(edgeAB)
  expect(graphEdgeBA).toEqual(edgeAB)
  invariant(graphEdgeAB, 'not found')
  expect(graphEdgeAB.weight).toBe(10)
 })

 it('should find edge by vertices in directed graph', () => {
  const graph = new Graph<string>(true)

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB, 10)

  graph.addEdge(edgeAB)

  const graphEdgeAB = graph.findEdge(vertexA, vertexB)
  const graphEdgeBA = graph.findEdge(vertexB, vertexA)
  const graphEdgeAC = graph.findEdge(vertexA, vertexC)
  const graphEdgeCA = graph.findEdge(vertexC, vertexA)

  expect(graphEdgeAC).toBeNull()
  expect(graphEdgeCA).toBeNull()
  expect(graphEdgeBA).toBeNull()
  expect(graphEdgeAB).toEqual(edgeAB)
  expect(graphEdgeAB.weight).toBe(10)
 })

 it('should return vertex neighbors', () => {
  const graph = new Graph<string>(true)

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeAC = new GraphEdge<string>(vertexA, vertexC)

  graph.addEdge(edgeAB).addEdge(edgeAC)

  const neighbors = graph.getNeighbors(vertexA)

  expect(neighbors.length).toBe(2)
  expect(neighbors[0]).toEqual(vertexB)
  expect(neighbors[1]).toEqual(vertexC)
 })

 it('should throw an error when trying to add edge twice', () => {
  function addSameEdgeTwice() {
   const graph = new Graph<string>(true)

   const vertexA = graphVertexString('A')
   const vertexB = graphVertexString('B')

   const edgeAB = new GraphEdge<string>(vertexA, vertexB)

   graph.addEdge(edgeAB).addEdge(edgeAB)
  }

  expect(addSameEdgeTwice).toThrow()
 })

 it('should return the list of all added edges', () => {
  const graph = new Graph<string>(true)

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC)

  graph.addEdge(edgeAB).addEdge(edgeBC)

  const edges = graph.getAllEdges()

  expect(edges.length).toBe(2)
  expect(edges[0]).toEqual(edgeAB)
  expect(edges[1]).toEqual(edgeBC)
 })

 it('should calculate total graph weight for default graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD)
  const edgeAD = new GraphEdge<string>(vertexA, vertexD)

  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCD)
   .addEdge(edgeAD)

  expect(graph.getWeight()).toBe(0)
 })

 it('should calculate total graph weight for weighted graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB, 1)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC, 2)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD, 3)
  const edgeAD = new GraphEdge<string>(vertexA, vertexD, 4)

  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCD)
   .addEdge(edgeAD)

  expect(graph.getWeight()).toBe(10)
 })

 it('should be possible to delete edges from graph', () => {
  const graph = new Graph<string>()

  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC)
  const edgeAC = new GraphEdge<string>(vertexA, vertexC)

  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeAC)

  expect(graph.getAllEdges().length).toBe(3)

  graph.deleteEdge(edgeAB)

  expect(graph.getAllEdges().length).toBe(2)
  expect(graph.getAllEdges()[0].toString()).toBe(edgeBC.toString())
  expect(graph.getAllEdges()[1].toString()).toBe(edgeAC.toString())
 })

 it('should should throw an error when trying to delete not existing edge', () => {
  function deleteNotExistingEdge() {
   const graph = new Graph<string>()

   const vertexA = graphVertexString('A')
   const vertexB = graphVertexString('B')
   const vertexC = graphVertexString('C')

   const edgeAB = new GraphEdge<string>(vertexA, vertexB)
   const edgeBC = new GraphEdge<string>(vertexB, vertexC)

   graph.addEdge(edgeAB)
   graph.deleteEdge(edgeBC)
  }

  expect(deleteNotExistingEdge).toThrowError()
 })

 it('should be possible to reverse graph', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeAC = new GraphEdge<string>(vertexA, vertexC)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD)

  const graph = new Graph<string>(true)
  graph
   .addEdge(edgeAB)
   .addEdge(edgeAC)
   .addEdge(edgeCD)

  expect(graph.toString()).toBe('A,B,C,D')
  expect(graph.getAllEdges().length).toBe(3)
  expect(graph.getNeighbors(vertexA).length).toBe(2)
  expect(graph.getNeighbors(vertexA)[0].toString()).toBe(vertexB.toString())
  expect(graph.getNeighbors(vertexA)[1].toString()).toBe(vertexC.toString())
  expect(graph.getNeighbors(vertexB).length).toBe(0)
  expect(graph.getNeighbors(vertexC).length).toBe(1)
  expect(graph.getNeighbors(vertexC)[0].toString()).toBe(vertexD.toString())
  expect(graph.getNeighbors(vertexD).length).toBe(0)

  graph.reverse()

  expect(graph.toString()).toBe('A,B,C,D')
  expect(graph.getAllEdges().length).toBe(3)
  expect(graph.getNeighbors(vertexA).length).toBe(0)
  expect(graph.getNeighbors(vertexB).length).toBe(1)
  expect(graph.getNeighbors(vertexB)[0].toString()).toBe(vertexA.toString())
  expect(graph.getNeighbors(vertexC).length).toBe(1)
  expect(graph.getNeighbors(vertexC)[0].toString()).toBe(vertexA.toString())
  expect(graph.getNeighbors(vertexD).length).toBe(1)
  expect(graph.getNeighbors(vertexD)[0].toString()).toBe(vertexC.toString())
 })

 it('should return vertices indices', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD)
  const edgeBD = new GraphEdge<string>(vertexB, vertexD)

  const graph = new Graph<string>()
  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCD)
   .addEdge(edgeBD)

  const verticesIndices = graph.getVerticesIndices()
  expect(verticesIndices).toEqual({
   A: 0,
   B: 1,
   C: 2,
   D: 3,
  })
 })

 it('should generate adjacency matrix for undirected graph', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD)
  const edgeBD = new GraphEdge<string>(vertexB, vertexD)

  const graph = new Graph<string>()
  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCD)
   .addEdge(edgeBD)

  const adjacencyMatrix = graph.getAdjacencyMatrix()
  expect(adjacencyMatrix).toEqual([
   [Infinity, 0, Infinity, Infinity],
   [0, Infinity, 0, 0],
   [Infinity, 0, Infinity, 0],
   [Infinity, 0, 0, Infinity],
  ])
 })

 it('should generate adjacency matrix for directed graph', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge<string>(vertexA, vertexB, 2)
  const edgeBC = new GraphEdge<string>(vertexB, vertexC, 1)
  const edgeCD = new GraphEdge<string>(vertexC, vertexD, 5)
  const edgeBD = new GraphEdge<string>(vertexB, vertexD, 7)

  const graph = new Graph<string>(true)
  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCD)
   .addEdge(edgeBD)

  const adjacencyMatrix = graph.getAdjacencyMatrix()
  expect(adjacencyMatrix).toEqual([
   [Infinity, 2, Infinity, Infinity],
   [Infinity, Infinity, 1, 7],
   [Infinity, Infinity, Infinity, 5],
   [Infinity, Infinity, Infinity, Infinity],
  ])
 })
})
