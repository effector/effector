//@flow

import type {CompositeName} from './compositeName'
import {is} from './stdlib'
import type {Store} from './store'
import type {Event} from './event'
import type {Effect} from './effect'

export function getDisplayName(unit: {
  compositeName?: CompositeName,
  domainName?: CompositeName,
  /*::+*/ id: string,
  /*::...*/
}) {
  if (unit.compositeName) {
    return unit.compositeName.fullName
  }
  if (unit.domainName) {
    return unit.domainName.fullName
  }
  return unit.id
}

const unitObjectMaxNames = 25

export function unitObjectName(
  objOrArr:
    | $ReadOnlyArray<Store<any> | Event<any> | Effect<any, any, any> | any | null>
    | {
        [key: string]: Store<any> | Event<any> | Effect<any, any, any> | any | null,
        ...,
      },
  method: string = 'combine',
) {
  let name = method + '('
  let comma = ''
  let i = 0
  //$todo
  for (const key in objOrArr) {
    //$todo
    const unit = objOrArr[key]
    name += comma
    //$todo
    name += is.unit(unit) ? getDisplayName(unit) : unit?.toString()
    i += 1
    if (i === unitObjectMaxNames) break
    comma = ', '
  }
  name += ')'
  return name
}
