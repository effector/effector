//@flow

import type {Store, Event, Effect} from './unit.h'
import {is} from './is'

export const joinName = (unit: any, tag: string) => '' + unit.shortName + tag

export const mapName = (unit: any, name: ?string) =>
  name == null ? joinName(unit, ' → *') : name

function getDisplayName(unit: {
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

export function unitObjectName(
  objOrArr:
    | $ReadOnlyArray<
        Store<any> | Event<any> | Effect<any, any, any> | any | null,
      >
    | {
        [key: string]:
          | Store<any>
          | Event<any>
          | Effect<any, any, any>
          | any
          | null,
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
    if (unit != null) {
      name += comma
      //$todo
      name += is.unit(unit) ? getDisplayName(unit) : unit.toString()
    }
    i += 1
    /* inlined max object names constant */
    if (i === 25) break
    comma = ', '
  }
  name += ')'
  return name
}

export function setStoreName<State>(store: Store<State>, rawName: string) {
  const compositeName = createName(rawName, store.domainName)
  store.shortName = rawName
  if (!store.compositeName) {
    store.compositeName = compositeName
    return
  }
  //$todo
  store.compositeName.path = compositeName.path
  //$todo
  store.compositeName.shortName = compositeName.shortName
  //$todo
  store.compositeName.fullName = compositeName.fullName
}

export type CompositeName = {
  shortName: string,
  fullName: string,
  path: string[],
}

export function createName(
  name: string,
  parent?: CompositeName,
): CompositeName {
  let path
  let fullName
  const shortName = name
  if (parent === undefined) {
    if (name.length === 0) {
      path = ([]: string[])
    } else {
      path = [name]
    }
    fullName = name
  } else {
    if (name.length === 0) {
      path = parent.path
      fullName = parent.fullName
    } else {
      path = parent.path.concat([name])
      if (parent.fullName.length === 0) {
        fullName = name
      } else {
        fullName = '' + parent.fullName + '/' + name
      }
    }
  }
  return {shortName, fullName, path}
}
