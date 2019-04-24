//@flow
import type {Graph, Cmd} from 'effector/stdlib'

const showCmdDef = (_: Cmd) =>
  `${_.type} {${JSON.stringify(
    _.data,
    (key, val) => {
      if (key === 'meta') return
      return val
    },
    2,
  ).replace(/\"/gi, '')}}`
export function show(
  value: Graph,
  showCmd: (cmd: Cmd) => string = showCmdDef,
): string {
  const print = {
    multi(value) {
      if (value.length === 0) return '[(empty list)]'
      const inner = [...value]
        .map(e => move1(`  *  ${move2(show(e, showCmd))}`))
        .join(`,\n`)
      return `Next [\n${inner}\n]`
    },
    seq(value) {
      if (value.length === 0) return 'Seq []'
      const inner = value
        .map((e, n) => move1(`  ${n + 1}. ${move2(showCmd(e))}`))
        .join(`,\n`)
      return `Seq [\n${inner}\n]`
    },
  }
  const seq = addIndent(print.seq(value.seq))
  const next = addIndent(print.multi(value.next))
  return `Graph {\n${seq}\n${next}}`
}
const addIndent = str => {
  const splitted = str.split(/\n/gi)
  const padded = splitted.map(line => `  ${line}`)
  return padded.join(`\n`)
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
