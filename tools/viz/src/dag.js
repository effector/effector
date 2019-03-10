//@flow

//$todo
import {line as lined3, curveCatmullRom, select, interpolateRainbow} from 'd3'
import {real} from './data'
import {layerings, decrossings, coords, sources, layouts} from './d3dag'

initFull(real, {
  layout: {
    layout: layouts.sugiyama,
    size: {width: 500, height: 500},
    layering: layerings.simplex,
    decross: decrossings.optimal,
    coord: coords.vertical,
  },
  sources: sources.grafo,
  interpolate: interpolateRainbow,
  line: {
    curve: curveCatmullRom,
    x: d => d.x,
    y: d => d.y,
  },
  circle: colorMap => ({
    radius(d) {
      if (d.data.group === 'cmd') return 11
      return 3
    },
    fill(d) {
      return colorMap[d.id]
    },
  }),
  text: {
    text(d) {
      if (d.data.group === 'cmd') return d.id
      return ''
    },
    fontSize: '12px',
    fontWeight: '400',
    fontFamily: 'Helvetica',
    textAnchor: 'middle',
    alignment: 'middle',
    fill: 'black',
  },
  stroke: {
    fill: 'none',
    width: 3,
  },
})

function initLayout({layout, size, layering, decross, coord}) {
  return layout()
    .size([size.width, size.height])
    .layering(layering)
    .decross(decross)
    .coord(coord)
}
function initEdge({curve, x, y}) {
  return lined3()
    .curve(curve)
    .x(x)
    .y(y)
}
function initColorMap({dag, interpolate}) {
  const steps = dag.size()
  const colorMap = {}
  dag.each((node, i) => {
    colorMap[node.id] = interpolate(i / steps)
  })
  return colorMap
}
function initNodes({dag, line, colorMap, stroke}) {
  const svgSelection = select('svg')
  const defs = svgSelection.append('defs') // For gradients

  svgSelection
    .append('g')
    .selectAll('path')
    .data(dag.links())
    .enter()
    .append('path')
    .attr('d', ({data}) => line(data.points))
    .attr('fill', stroke.fill)
    .attr('stroke-width', stroke.width)
    .attr('stroke', ({source, target}) => {
      const gradId = `${source.id}-${target.id}`
      const grad = defs
        .append('linearGradient')
        .attr('id', gradId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', source.x)
        .attr('x2', target.x)
        .attr('y1', source.y)
        .attr('y2', target.y)
      grad
        .append('stop')
        .attr('offset', '0%')
        .attr('stop-color', colorMap[source.id])
      grad
        .append('stop')
        .attr('offset', '100%')
        .attr('stop-color', colorMap[target.id])
      return `url(#${gradId})`
    })

  return svgSelection
    .append('g')
    .selectAll('g')
    .data(dag.descendants())
    .enter()
    .append('g')
    .attr('transform', ({x, y}) => `translate(${x}, ${y})`)
}
function initFull(data, cfg) {
  const layout = initLayout(cfg.layout)
  const dag = cfg.sources(data)
  layout(dag)
  const colorMap = initColorMap({dag, interpolate: cfg.interpolate})
  const line = initEdge(cfg.line)
  const nodes = initNodes({dag, line, colorMap, stroke: cfg.stroke})
  addCircleNode(nodes, cfg.circle(colorMap))
  addTextNode(nodes, cfg.text)
}

function addCircleNode(nodes, {radius, fill}) {
  nodes
    .append('circle')
    .attr('r', radius)
    .attr('fill', fill)
}

function addTextNode(
  nodes,
  {text, fontSize, fontWeight, fontFamily, textAnchor, alignment, fill},
) {
  nodes
    .append('text')
    .text(text)
    .attr('font-weight', fontWeight)
    .attr('font-size', fontSize)
    .attr('font-family', fontFamily)
    .attr('text-anchor', textAnchor)
    .attr('alignment-baseline', alignment)
    .attr('fill', fill)
}
