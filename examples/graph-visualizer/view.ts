import {captureGraph, Graph, layoutGraph, unitGraph} from './graph'

const SVG = 'http://www.w3.org/2000/svg'

/** Mount into an existing element; no network, popup, app mutation or timer is used. */
export function mountGraph(
  container: HTMLElement,
  capture: ReturnType<typeof captureGraph>,
) {
  const document = container.ownerDocument
  const panel = document.createElement('section')
  panel.className = 'effector-graph'
  const heading = document.createElement('h2')
  heading.textContent = 'Effector graph'
  const controls = document.createElement('div')
  controls.className = 'graph-controls'
  const search = document.createElement('input')
  search.type = 'search'
  search.placeholder = 'Find a unit by name or ID'
  search.setAttribute('aria-label', 'Find a unit by name or ID')
  const showInternal = document.createElement('input')
  showInternal.type = 'checkbox'
  const label = document.createElement('label')
  label.append(showInternal, ' Show internal nodes and ownership')
  const refresh = document.createElement('button')
  refresh.textContent = 'Refresh graph'
  const status = document.createElement('p')
  status.setAttribute('aria-live', 'polite')
  const legend = document.createElement('p')
  legend.textContent =
    'Solid arrows: propagation paths. Dashed: ownership. Dotted: family links. Search shows matches and their direct neighbours.'
  const viewport = document.createElement('div')
  viewport.className = 'graph-viewport'
  const svg = document.createElementNS(SVG, 'svg')
  svg.setAttribute('role', 'img')
  svg.setAttribute('aria-label', 'Directed Effector unit relationships')
  viewport.append(svg)
  controls.append(search, label, refresh)
  panel.append(heading, controls, status, legend, viewport)
  container.append(panel)
  let disposed = false
  let zoom = 1
  const zoomOut = document.createElement('button')
  zoomOut.textContent = 'Zoom out'
  const zoomIn = document.createElement('button')
  zoomIn.textContent = 'Zoom in'
  controls.append(zoomOut, zoomIn)
  function render() {
    if (disposed) return
    const complete = capture.snapshot()
    const graph = showInternal.checked ? complete : unitGraph(complete)
    const query = search.value.trim().toLowerCase()
    const matches = new Set(
      graph.nodes
        .filter(node =>
          (node.name + ' ' + node.id).toLowerCase().includes(query),
        )
        .map(node => node.id),
    )
    const selected = new Set(matches)
    if (query)
      graph.edges.forEach(edge => {
        if (matches.has(edge.source) || matches.has(edge.target)) {
          selected.add(edge.source)
          selected.add(edge.target)
        }
      })
    const filtered = graph.nodes.filter(node => !query || selected.has(node.id))
    // Bound DOM size, explicitly report truncation; search across the full captured graph.
    const nodes = filtered.slice(0, 250)
    const ids = new Set(nodes.map(node => node.id))
    const shown: Graph = {
      nodes,
      edges: graph.edges.filter(
        edge => ids.has(edge.source) && ids.has(edge.target),
      ),
    }
    const positions = layoutGraph(shown)
    const width = Math.max(
      560,
      ...Array.from(positions.values(), p => p.x + 232),
    )
    const height = Math.max(
      220,
      ...Array.from(positions.values(), p => p.y + 100),
    )
    svg.replaceChildren()
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`)
    svg.style.width = `${width * zoom}px`
    svg.style.height = `${height * zoom}px`
    const defs = document.createElementNS(SVG, 'defs')
    const marker = document.createElementNS(SVG, 'marker')
    // Unique marker per panel avoids collisions when more than one viewer is mounted.
    const markerId = 'graph-arrow-' + Math.random().toString(36).slice(2)
    marker.setAttribute('id', markerId)
    marker.setAttribute('viewBox', '0 0 10 10')
    marker.setAttribute('refX', '9')
    marker.setAttribute('refY', '5')
    marker.setAttribute('markerWidth', '7')
    marker.setAttribute('markerHeight', '7')
    marker.setAttribute('orient', 'auto-start-reverse')
    const triangle = document.createElementNS(SVG, 'path')
    triangle.setAttribute('d', 'M 0 0 L 10 5 L 0 10 z')
    triangle.setAttribute('fill', '#596b86')
    marker.append(triangle)
    defs.append(marker)
    svg.append(defs)
    shown.edges.forEach((edge, index) => {
      const source = positions.get(edge.source)!,
        target = positions.get(edge.target)!
      const x1 = source.x + 190,
        y1 = source.y + 31,
        x2 = target.x,
        y2 = target.y + 31
      const route = document.createElementNS(SVG, 'path')
      const lane = 22 + (index % 9) * 7
      const d =
        x2 > x1
          ? `M${x1},${y1} C${x1 + 32},${y1} ${x2 - 32},${y2} ${x2},${y2}`
          : `M${x1},${y1} L${x1 + lane},${y1} L${x1 + lane},${Math.min(y1, y2) - lane - 35} L${x2 - lane},${Math.min(y1, y2) - lane - 35} L${x2 - lane},${y2} L${x2},${y2}`
      route.setAttribute('d', d)
      route.setAttribute('fill', 'none')
      route.setAttribute('stroke', '#596b86')
      if (edge.kind !== 'next')
        route.setAttribute(
          'stroke-dasharray',
          edge.kind === 'owner' ? '8 5' : '2 4',
        )
      route.setAttribute('marker-end', `url(#${markerId})`)
      const title = document.createElementNS(SVG, 'title')
      title.textContent = `${edge.kind}: ${edge.source} → ${edge.target}`
      route.append(title)
      svg.append(route)
    })
    shown.nodes.forEach(node => {
      const position = positions.get(node.id)!
      const group = document.createElementNS(SVG, 'g')
      group.setAttribute('transform', `translate(${position.x},${position.y})`)
      const rect = document.createElementNS(SVG, 'rect')
      rect.setAttribute('width', '190')
      rect.setAttribute('height', '62')
      rect.setAttribute('rx', '8')
      rect.setAttribute(
        'fill',
        node.kind === 'store'
          ? '#e6f4ef'
          : node.kind === 'event'
            ? '#e8eefc'
            : node.kind === 'effect'
              ? '#fff0d9'
              : '#f0f1f3',
      )
      rect.setAttribute('stroke', '#7b8ba0')
      const name = document.createElementNS(SVG, 'text')
      name.setAttribute('x', '12')
      name.setAttribute('y', '25')
      name.textContent =
        node.name.length > 23 ? node.name.slice(0, 22) + '…' : node.name
      const detail = document.createElementNS(SVG, 'text')
      detail.setAttribute('x', '12')
      detail.setAttribute('y', '46')
      detail.setAttribute('font-size', '12')
      detail.textContent = `${node.kind} · ${node.id}`
      const title = document.createElementNS(SVG, 'title')
      title.textContent = `${node.name} (${node.kind}, ${node.id})`
      group.append(rect, name, detail, title)
      svg.append(group)
    })
    status.textContent = `${shown.nodes.length} of ${graph.nodes.length} nodes · ${shown.edges.length} visible relationships${filtered.length > 250 ? ' · limited to 250: search to focus the graph' : ''}${query && matches.size === 0 ? ' · no matches' : ''}`
  }
  search.addEventListener('input', render)
  showInternal.addEventListener('change', render)
  refresh.addEventListener('click', render)
  const out = () => {
    zoom = Math.max(0.3, zoom / 1.25)
    render()
  }
  const into = () => {
    zoom = Math.min(3, zoom * 1.25)
    render()
  }
  zoomOut.addEventListener('click', out)
  zoomIn.addEventListener('click', into)
  render()
  return {
    refresh: render,
    dispose() {
      disposed = true
      search.removeEventListener('input', render)
      showInternal.removeEventListener('change', render)
      refresh.removeEventListener('click', render)
      zoomOut.removeEventListener('click', out)
      zoomIn.removeEventListener('click', into)
      panel.remove()
    },
  }
}
