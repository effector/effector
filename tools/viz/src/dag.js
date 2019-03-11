//@flow

//$todo
import {line as lined3, curveCatmullRom, select, interpolateRainbow} from 'd3'
import {real} from './data'
import {layerings, decrossings, coords, sources, layouts} from './d3dag'
function isCmd(d) {
  return d.data.group === 'cmd'
}
export default ({
  width,
  height,
  rmax,
  config,
}: {
  width: number,
  height: number,
  rmax: number,
  config: *,
}) =>
  initFull(real, {
    layout: {
      layout: layouts[config.layout],
      size: {width: width - rmax, height: height - rmax},
      layering: layerings[config.layering],
      decross: decrossings[config.decrossing],
      coord: coords[config.coords],
    },
    sources: sources.grafo,
    interpolate: interpolateRainbow,
    line: {
      curve: curveCatmullRom,
      x: d => d.x,
      y: d => d.y,
    },
    nodeBackground: colorMap => ({
      height: d => (isCmd(d) ? 8 : 2) * 2,
      width(d) {
        const text = nodeTextSwitch(d.data.type)
        const symbols = text.length
        return symbols * 4 + 8
      },
      fill(d) {
        return colorMap[d.id]
      },
      x(d) {
        const width = (() => {
          const text = nodeTextSwitch(d.data.type)
          const symbols = text.length
          return symbols * 4 + 8
        })()
        return -width / 2
      },
      y: -8,
    }),
    text: {
      text(d) {
        if (isCmd(d)) return nodeTextSwitch(d.data.type)
        return ''
      },
      fontSize: '10px',
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
function nodeTextSwitch(type) {
  switch (type) {
    case 'update':
      return 'upd'
    case 'compute':
      return 'f(x)'
    default:
      return type
  }
}
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
  addNodeBackground(nodes, cfg.nodeBackground(colorMap))
  addTextNode(nodes, cfg.text)
}

function addNodeBackground(nodes, {width, height, fill, x, y}) {
  nodes
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', fill)
    .attr('x', x)
    .attr('y', y)
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
