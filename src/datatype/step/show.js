//@flow

import * as Name from './type'
import type {Step} from './Step.bs'

import {show as showCmd} from '../cmd/Cmd.bs'

export function show(value: Step): string {
 switch (value.type) {
  case Name.SINGLE:
   return `Single ${showCmd(value.data)}`
  case Name.MULTI: {
   if (value.data.size === 0) return 'Multi []'
   const inner = [...value.data]
    .map(e => move1(`  *  ${move2(show(e))}`))
    .join(`,\n`)
   return `Multi [\n${inner}\n]`
  }
  case Name.SEQ: {
   if (value.data.length === 0) return 'Seq []'
   const inner = value.data
    .map((e, n) => move1(`  ${n + 1}. ${move2(show(e))}`))
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
