//@flow
import type {Cmd} from '../effector/stdlib'
import {blocks} from '../effector'

const SHOW_FUN_SOURCE = false
const printFn = (fn: Function) => {
  const name = fn.name
  if (name && name !== '' && name !== 'fn') return name
  if (SHOW_FUN_SOURCE) return fn.toString()
  return 'Function'
}
const showCmd = (_: Cmd) => {
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
    case 'check':
      switch (_.data.type) {
        case 'defined':
          return `check: defined`
        case 'changed':
          return `check: changed`
      }
      return `check: ?`
    case 'filter':
      switch (_.data.fn.toString()) {
        default:
          return `filter: ${printFn(_.data.fn)}`
      }
    case 'compute':
      switch (_.data.fn.toString()) {
        case noop:
          return `compute: x => x`
        default:
          return `compute: ${printFn(_.data.fn)}`
      }
    case 'run':
      return `run: watcher`
  }
  const view = JSON.stringify(_.data, replacer, 2).replace(/\"/gi, '')
  //.replace(/^ /gim, '') // move whole json print one space left
  return `${_.type}: ${view}`
}

const noop = blocks.noop.data.fn.toString()
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
export function show(unit: any): string {
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
  return e
    .split(`\n`)
    .map(pad)
    .join(`\n`)
}
