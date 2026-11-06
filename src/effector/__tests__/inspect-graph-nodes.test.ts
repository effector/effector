import {
  createEvent,
  createStore,
  createEffect,
  sample,
  combine,
  createNode,
  withRegion,
  clearNode,
} from 'effector'
import {inspectGraph} from 'effector/inspect'
import type {Node} from 'effector'
import {
  captureGraph,
  layoutGraph,
  unitGraph,
} from '../../../examples/graph-visualizer/graph'
import {mountGraph} from '../../../examples/graph-visualizer/view'
import {JSDOM} from 'jsdom'

test('default declaration subscription has no extra fields or replay', () => {
  createEvent({name: 'before capture'})
  const declarations: any[] = []
  const stop = inspectGraph({fn: declaration => declarations.push(declaration)})
  const event = createEvent({name: 'ordinary event'})
  stop()
  createEvent({name: 'after unsubscribe'})
  expect(declarations).toHaveLength(1)
  expect(declarations[0]).toMatchObject({
    type: 'unit',
    kind: 'event',
    name: 'ordinary event',
  })
  expect(declarations[0]).not.toHaveProperty('node')
  expect(declarations[0]).not.toHaveProperty('graph')
  clearNode(event)
})

test('onNode is opt-in, sees the actual node and shares unsubscribe lifecycle', () => {
  const nodes: Node[] = []
  const stop = inspectGraph({fn: () => {}, onNode: node => nodes.push(node)})
  const event = createEvent({name: 'captured event'})
  expect(nodes.some(node => node.meta.name === 'captured event')).toBe(true)
  const size = nodes.length
  stop.unsubscribe()
  createEvent({name: 'not captured'})
  expect(nodes).toHaveLength(size)
  clearNode(event)
})

test('onNode does not receive synthetic region declarations', () => {
  const nodes: Node[] = [],
    declarations: any[] = []
  const region = createNode({meta: {label: 'region root'}})
  const stop = inspectGraph({
    fn: d => declarations.push(d),
    onNode: n => nodes.push(n),
  })
  withRegion(region, () => createEvent({name: 'regional event'}))
  stop()
  expect(declarations.filter(d => d.type === 'region')).toHaveLength(1)
  expect(nodes.some(node => node.meta.name === 'regional event')).toBe(true)
  expect(nodes.some(node => node === region)).toBe(false)
  clearNode(region, {deep: true})
})

test('snapshots read sample relationships completed after declaration, and do not mutate the app', async () => {
  const capture = captureGraph()
  const clock = createEvent({name: 'clock'})
  const source = createStore(2, {name: '$source'}).on(clock, n => n + 1)
  const fx = createEffect({
    name: 'targetFx',
    handler: async (n: number) => n * 2,
  })
  sample({source, clock, target: fx})
  const full = capture.snapshot()
  const id = (name: string) => full.nodes.find(node => node.name === name)!.id
  const sampleNode = full.nodes.find(node => node.kind === 'sample')!
  expect(sampleNode).toBeDefined()
  expect(full.edges).toContainEqual({
    source: id('$source'),
    target: sampleNode.id,
    kind: 'owner',
  })
  const projected = unitGraph(full)
  expect(projected.edges).toContainEqual({
    source: id('clock'),
    target: id('targetFx'),
    kind: 'next',
  })
  expect(projected.edges).toContainEqual({
    source: id('clock'),
    target: id('$source'),
    kind: 'next',
  })
  expect(capture.snapshot()).toEqual(full)
  clock()
  expect(source.getState()).toBe(3)
  expect(await fx(5)).toBe(10)
  capture.dispose()
  clearNode(clock)
  clearNode(source)
  clearNode(fx)
})

test('map and combine form real propagation edges, without duplicate edges', () => {
  const capture = captureGraph()
  const source = createStore(1, {name: '$a'})
  const mapped = source.map(n => n + 1)
  const combined = combine({source, mapped})
  const full = capture.snapshot(),
    graph = unitGraph(full)
  const sourceId = full.nodes.find(node => node.name === '$a')!.id
  const mapNode = graph.nodes.find(
    node =>
      node.kind === 'store' &&
      node.id !== sourceId &&
      graph.edges.some(
        edge => edge.source === sourceId && edge.target === node.id,
      ),
  )
  expect(mapNode).toBeDefined()
  expect(graph.edges.length).toBeGreaterThan(1)
  expect(new Set(full.edges.map(edge => JSON.stringify(edge))).size).toBe(
    full.edges.length,
  )
  capture.dispose()
  clearNode(source)
  clearNode(mapped)
  clearNode(combined)
})

test('disposed capture releases retained roots, ignores new nodes and is idempotent', () => {
  const capture = captureGraph()
  createStore(0, {name: '$retained'})
  expect(capture.snapshot().nodes.length).toBeGreaterThan(0)
  capture.dispose()
  capture.dispose()
  createEvent({name: 'later'})
  expect(capture.snapshot()).toEqual({nodes: [], edges: []})
})

test('cleared links disappear from later snapshots rather than remaining historical edges', () => {
  const capture = captureGraph()
  const event = createEvent({name: 'source'})
  const store = createStore(0, {name: 'destination'}).on(event, n => n + 1)
  const before = unitGraph(capture.snapshot())
  expect(before.edges.length).toBeGreaterThan(0)
  clearNode(store)
  const after = unitGraph(capture.snapshot())
  expect(after.edges.length).toBeLessThan(before.edges.length)
  capture.dispose()
  clearNode(event)
})

test('disconnected preexisting units are explicitly outside capture scope', () => {
  const before = createStore(0, {name: 'not replayed'})
  const capture = captureGraph()
  createEvent({name: 'new unit'})
  expect(
    capture.snapshot().nodes.some(node => node.name === 'not replayed'),
  ).toBe(false)
  capture.dispose()
  clearNode(before)
})

test('cyclic graphs and self paths terminate without recursive overflow', () => {
  const graph = {
    nodes: [
      {id: 'a', name: 'A', kind: 'event', unit: true},
      {id: 'b', name: 'B', kind: 'store', unit: true},
      {id: 'op', name: 'operation', kind: 'sample', unit: false},
    ],
    edges: [
      {source: 'a', target: 'op', kind: 'next' as const},
      {source: 'op', target: 'a', kind: 'next' as const},
      {source: 'a', target: 'b', kind: 'next' as const},
      {source: 'b', target: 'a', kind: 'next' as const},
    ],
  }
  const units = unitGraph(graph)
  expect(units.edges).toContainEqual({source: 'a', target: 'a', kind: 'next'})
  const positions = layoutGraph(units)
  expect(positions.size).toBe(2)
  expect(positions.get('a')!.x).toBe(positions.get('b')!.x)
  expect(positions.get('a')!.y).not.toBe(positions.get('b')!.y)
})

test('large real graphs are captured in full and rendered with a truthful bound and searchable remainder', () => {
  const capture = captureGraph()
  const clock = createEvent({name: 'large-clock'})
  const stores = Array.from({length: 600}, (_, i) =>
    createStore(i, {name: `$large-${i}`}).on(clock, n => n + 1),
  )
  const graph = unitGraph(capture.snapshot())
  expect(graph.nodes.filter(node => node.kind === 'store')).toHaveLength(600)
  expect(graph.edges.length).toBeGreaterThanOrEqual(600)
  const dom = new JSDOM('<main></main>')
  const mount = dom.window.document.querySelector('main')!
  const view = mountGraph(mount as unknown as HTMLElement, capture)
  expect(mount.querySelectorAll('svg g')).toHaveLength(250)
  expect(mount.textContent).toContain('limited to 250')
  const input = mount.querySelector('input[type=search]') as HTMLInputElement
  input.value = '$large-599'
  input.dispatchEvent(new dom.window.Event('input'))
  expect(mount.querySelectorAll('svg g').length).toBeGreaterThan(0)
  expect(mount.querySelector('svg')!.textContent).toContain('$large-599')
  expect(mount.textContent).not.toContain('limited to 250')
  view.dispose()
  capture.dispose()
  clearNode(clock)
  stores.forEach(store => clearNode(store))
  dom.window.close()
})

test('viewer creates actual routed SVG edges, isolates marker IDs, zooms and cleans up', () => {
  const capture = captureGraph()
  const event = createEvent({name: 'visible event'})
  const store = createStore(0, {name: '<unsafe-name>'}).on(event, n => n + 1)
  const dom = new JSDOM('<main></main><aside></aside>')
  const main = dom.window.document.querySelector('main')!,
    aside = dom.window.document.querySelector('aside')!
  const first = mountGraph(main as unknown as HTMLElement, capture)
  const second = mountGraph(aside as unknown as HTMLElement, capture)
  expect(main.querySelectorAll('svg path[marker-end]').length).toBeGreaterThan(
    0,
  )
  expect(main.querySelectorAll('unsafe-name')).toHaveLength(0)
  expect(main.querySelector('svg')!.textContent).toContain('<unsafe-name>')
  expect(main.querySelector('marker')!.id).not.toBe(
    aside.querySelector('marker')!.id,
  )
  const svg = main.querySelector('svg')!,
    width = svg.style.width
  const buttons = Array.from(main.querySelectorAll('button'))
  buttons.find(button => button.textContent === 'Zoom in')!.click()
  expect(svg.style.width).not.toBe(width)
  first.dispose()
  first.refresh()
  second.dispose()
  capture.dispose()
  expect(main.children).toHaveLength(0)
  expect(aside.children).toHaveLength(0)
  clearNode(event)
  clearNode(store)
  dom.window.close()
})
