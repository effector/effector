//@flow

import {cmd} from '../FullDatatype.bs'

import type {Tree} from './index'
const showCmd = cmd.show
export function show(value: Tree): string {
  const cmdStr = showCmd(value.node)
  const id = value.id
  switch (value.childs.size) {
    case 0:
      return `${id} ${cmdStr}`
    case 1: {
      const [inner] = [...value.childs]
      // const inner = value.data
      //  .map((e, n) => move1(`  ${n + 1}. ${move2(show(e))}`))
      //  .join(`,\n`)
      return `${id} ${cmdStr} → ${show(inner)}`
    }
    default: {
      const inner = [...value.childs]
        .map(e => move1(`  *  ${move2(show(e))}`))
        .join(`,\n`)
      return `${id} ${cmdStr} [\n${inner}\n]`
    }
  }
}

const map1 = (s, i) => (i > 0 ? `  ${s}` : s)
const map2 = (s, i, l) => {
  if (i === 0) return s
  if (i === l.length - 1) return s
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
