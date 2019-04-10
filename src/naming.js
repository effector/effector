//@flow

import type {CompositeName} from './compositeName'
import {is} from 'effector/validate'
import type {Store} from 'effector/store'
import type {Event} from 'effector/event'
import type {Effect} from 'effector/effect'

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
    | $ReadOnlyArray<Store<any> | Event<any> | Effect<any, any, any> | any>
    | {
        [key: string]: Store<any> | Event<any> | Effect<any, any, any> | any,
      },
) {
  let i = 0
  const arr: Array<any> = Object.values(objOrArr)
  const max = unitObjectMaxNames - 1
  const maxLength = arr.length - 1
  let name = 'combine('
  for (const unit of arr) {
    const comma = i === max || maxLength === i ? '' : ', '
    if (is.store(unit) || is.event(unit) || is.effect(unit)) {
      name += getDisplayName(unit) + comma
    } else {
      name += unit.toString() + comma
    }
    i += 1
    if (comma === '') break
  }
  name += ')'
  return name
}
