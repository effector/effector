//@flow

import type {CompositeName} from './compositeName'
import {isStore, isEvent, isEffect} from 'effector/stdlib'
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

export function unitObjectArrayName(
  arr: $ReadOnlyArray<Store<any> | Event<any> | Effect<any, any, any> | any>,
) {
  let i = 0
  const max = unitObjectMaxNames - 1
  const maxLength = arr.length - 1
  let name = 'combine('
  for (const unit of arr) {
    const comma = i === max || maxLength === i ? '' : ', '
    if (isStore(unit) || isEvent(unit) || isEffect(unit)) {
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

export function unitObjectName(obj: {
  [key: string]: Store<any> | Event<any> | Effect<any, any, any> | any,
}) {
  let i = 0
  const keys = Object.keys(obj)
  const max = unitObjectMaxNames - 1
  const maxLength = keys.length - 1
  let name = 'combine('
  for (const key in obj) {
    const comma = i === max || maxLength === i ? '' : ', '
    const unit = obj[key]
    if (isStore(unit) || isEvent(unit) || isEffect(unit)) {
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
