import type {CommonUnit, Domain} from './unit.h'
import {is} from './validate'
import {getCompositeName} from './getter'
import {forIn} from './collection'

export function unitObjectName(objOrArr: any, method: string = 'combine') {
  let name = method + '('
  let comma = ''
  let i = 0
  forIn(objOrArr, unit => {
    /* inlined max object names constant */
    if (i < 25) {
      if (unit != null) {
        name += comma
        name += is.unit(unit)
          ? getCompositeName(unit as CommonUnit | Domain).fullName
          : (unit as any).toString()
      }
      i += 1
      comma = ', '
    }
  })
  return name + ')'
}

export type CompositeName = {
  shortName: string
  fullName: string
  path: string[]
}

export function createName(name: string, parent?: Domain): CompositeName {
  let path: string[]
  let fullName
  const shortName = name
  if (!parent) {
    path = name.length === 0 ? [] : [name]
    fullName = name
  } else {
    const composite = getCompositeName(parent)
    if (name.length === 0) {
      path = composite.path
      fullName = composite.fullName
    } else {
      path = composite.path.concat([name])
      fullName =
        composite.fullName.length === 0
          ? name
          : '' + composite.fullName + '/' + name
    }
  }
  return {shortName, fullName, path}
}

export function generateErrorTitle(method: string, metadata: any) {
  if (!metadata) return method
  if (!metadata.name && !metadata.named && !metadata.loc) return method
  let result = `[${method}]`
  const name = metadata.named || metadata.name
  if (name) {
    result += ` unit '${name}'`
  }
  const loc = metadata.loc
  if (!name && loc) {
    result += ` (${loc.file}:${loc.line}:${loc.column})`
  }
  return result
}
