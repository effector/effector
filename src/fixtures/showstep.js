//@flow
import type {TypeDef} from 'effector/stdlib/typedef'

export function show(
  value: TypeDef<*, 'step'>,
  showCmd: (TypeDef<*, 'cmd'>) => string = _ =>
    `${_.type} {${JSON.stringify(_.data, null, 2).replace(/\"/gi, '')}}`,
): string {
  switch (value.type) {
    case 'choose':
      //$todo
      return showCmd(value)
    case 'single':
      return showCmd(value.data)
    case 'multi': {
      if (value.data.length === 0) return '[(empty list)]'
      const inner = [...value.data]
        .map(e => move1(`  *  ${move2(show(e, showCmd))}`))
        .join(`,\n`)
      return `[\n${inner}\n]`
    }
    case 'seq': {
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
