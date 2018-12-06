//@flow

import type {Step} from './stept'
import type {Cmd} from './cmdt'

const SINGLE = 'single'
const MULTI = 'multi'
const SEQ = 'seq'

export function show(
  value: Step,
  showCmd: Cmd => string = _ =>
    `${_.type} {${JSON.stringify(_.data, null, 2)}}`,
): string {
  switch (value.type) {
    case SINGLE:
      return showCmd(value.data)
    case MULTI: {
      if (value.data.length === 0) return '[(empty list)]'
      const inner = [...value.data]
        .map(e => move1(`  *  ${move2(show(e, showCmd))}`))
        .join(`,\n`)
      return `[\n${inner}\n]`
    }
    case SEQ: {
      if (value.data.length === 0) return 'Seq []'
      const inner = value.data
        .map((e, n) => move1(`  ${n + 1}. ${move2(show(e, showCmd))}`))
        .join(`,\n`)
      return `Seq [\n${inner}\n]`
    }
    default:
      /*::(value.type: empty)*/
      throw new Error('impossible type')
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
