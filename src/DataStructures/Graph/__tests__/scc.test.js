//@flow

import {GraphVertex, graphVertexString} from '../GraphVertex'
import {GraphEdge} from '../GraphEdge'
import {Graph} from '../Graph'
import {stronglyConnectedComponents} from '../stronglyConnectedComponents'

describe('stronglyConnectedComponents', () => {
 it('should detect strongly connected components in simple graph', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')

  const edgeAB = new GraphEdge(vertexA, vertexB)
  const edgeBC = new GraphEdge(vertexB, vertexC)
  const edgeCA = new GraphEdge(vertexC, vertexA)
  const edgeCD = new GraphEdge(vertexC, vertexD)

  const graph = new Graph<string>(true)

  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCA)
   .addEdge(edgeCD)

  const components = stronglyConnectedComponents(graph)

  expect(components).toBeDefined()
  expect(components.length).toBe(2)

  expect(components[0][0].toString()).toBe(vertexA.toString())
  expect(components[0][1].toString()).toBe(vertexC.toString())
  expect(components[0][2].toString()).toBe(vertexB.toString())

  expect(components[1][0].toString()).toBe(vertexD.toString())
 })

 it('should detect strongly connected components in graph', () => {
  const vertexA = graphVertexString('A')
  const vertexB = graphVertexString('B')
  const vertexC = graphVertexString('C')
  const vertexD = graphVertexString('D')
  const vertexE = graphVertexString('E')
  const vertexF = graphVertexString('F')
  const vertexG = graphVertexString('G')
  const vertexH = graphVertexString('H')
  const vertexI = graphVertexString('I')
  const vertexJ = graphVertexString('J')
  const vertexK = graphVertexString('K')

  const edgeAB = new GraphEdge(vertexA, vertexB)
  const edgeBC = new GraphEdge(vertexB, vertexC)
  const edgeCA = new GraphEdge(vertexC, vertexA)
  const edgeBD = new GraphEdge(vertexB, vertexD)
  const edgeDE = new GraphEdge(vertexD, vertexE)
  const edgeEF = new GraphEdge(vertexE, vertexF)
  const edgeFD = new GraphEdge(vertexF, vertexD)
  const edgeGF = new GraphEdge(vertexG, vertexF)
  const edgeGH = new GraphEdge(vertexG, vertexH)
  const edgeHI = new GraphEdge(vertexH, vertexI)
  const edgeIJ = new GraphEdge(vertexI, vertexJ)
  const edgeJG = new GraphEdge(vertexJ, vertexG)
  const edgeJK = new GraphEdge(vertexJ, vertexK)

  const graph = new Graph(true)

  graph
   .addEdge(edgeAB)
   .addEdge(edgeBC)
   .addEdge(edgeCA)
   .addEdge(edgeBD)
   .addEdge(edgeDE)
   .addEdge(edgeEF)
   .addEdge(edgeFD)
   .addEdge(edgeGF)
   .addEdge(edgeGH)
   .addEdge(edgeHI)
   .addEdge(edgeIJ)
   .addEdge(edgeJG)
   .addEdge(edgeJK)

  const components = stronglyConnectedComponents(graph)

  expect(components).toBeDefined()
  expect(components.length).toBe(4)

  expect(components[0][0].toString()).toBe(vertexG.toString())
  expect(components[0][1].toString()).toBe(vertexJ.toString())
  expect(components[0][2].toString()).toBe(vertexI.toString())
  expect(components[0][3].toString()).toBe(vertexH.toString())

  expect(components[1][0].toString()).toBe(vertexK.toString())

  expect(components[2][0].toString()).toBe(vertexA.toString())
  expect(components[2][1].toString()).toBe(vertexC.toString())
  expect(components[2][2].toString()).toBe(vertexB.toString())

  expect(components[3][0].toString()).toBe(vertexD.toString())
  expect(components[3][1].toString()).toBe(vertexF.toString())
  expect(components[3][2].toString()).toBe(vertexE.toString())
 })
})
