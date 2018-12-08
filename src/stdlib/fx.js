//@flow

import {Step, Cmd} from 'effector/graphite/typedef'

export default function createElement(tag: *, props: *, ...childrens: *) {
  let current
  let result
  if (tag in Cmd) {
    result = Cmd[tag](props)
    return result
  }
  switch (tag) {
    case 'single':
      result = Step.single(childrens[0])
      return result
    case 'multi':
      result = Step.multi(childrens)
      return result
    case 'seq':
      current = childrens.filter(Boolean)
      result = Step.seq(current)
      return result
  }
  console.error('unknown node "%s"', tag)
  return null
}
