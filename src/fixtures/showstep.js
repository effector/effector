const SHOW_FUN_SOURCE = false
const printFn = fn => {
  const name = fn.name
  if (name && name !== '' && name !== 'fn') return name
  if (SHOW_FUN_SOURCE) return fn.toString()
  return 'Function'
}
const showCmd = _ => {
  const replacer = (key, val) => {
    if (key === 'meta') return
    if (_.type === 'filter' && key === 'fn') {
      return val.toString()
    }
    if (_.type === 'update' && key === 'store')
      return {
        state: val.current,
      }
    return val
  }
  switch (_.type) {
    case 'mov':
      return `mov: ${_.data.from} ${_.data.to}`
    case 'compute': {
      let tag
      let value
      if (_.order) {
        tag = _.data.fn ? 'run' : 'barrier'
        value = _.order.priority
      } else {
        tag = _.data.filter ? 'filter' : 'compute'
        value = printFn(_.data.fn)
      }
      return `${tag}: ${value}`
    }
  }
  const view = JSON.stringify(_.data, replacer, 2).replace(/\"/gi, '')
  //.replace(/^ /gim, '') // move whole json print one space left
  return `${_.type}: ${view}`
}

const print = {
  multi(value) {
    if (value.length === 0) return 'next: []'
    const inner = [...value].map(e => move1(`  ${move2(show(e))}`)).join(`,\n`)
    return `next: [\n${inner}\n]`
  },
  seq(value) {
    if (value.length === 0) return 'seq: []'
    const inner = value
      .map((e, n) => move1(`  ${move2(showCmd(e))}`))
      .join(`,\n`)
    return `seq: [\n${inner}\n]`
  },
}
export function show(unit) {
  const value = unit.graphite ? unit.graphite : unit
  const seq = addIndent(print.seq(value.seq))
  const next = addIndent(print.multi(value.next))
  if (value.seq.length === 0 && value.next.length === 0)
    return 'Node {seq: [], next: []}'
  return `Node {\n${seq},\n${next}\n}`
}
const addIndent = str => {
  const splitted = str.split(/\n/gi)
  const padded = splitted.map(line => `  ${line}`)
  return padded.join(`\n`)
}
const map1 = (s, i) => (i > 0 ? ` ${s}` : s)
const map2 = (s, i, l) => {
  if (i === 0) return s
  return ` ${s}`
}
const move1 = e => splitJoin(e, map1)
const move2 = e => splitJoin(e, map2)
function splitJoin(e, pad) {
  return e.split(`\n`).map(pad).join(`\n`)
}
