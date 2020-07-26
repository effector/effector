import {Store, Domain} from './unit.h'
import {is} from './is'
import {getParent} from './getter'

export const joinName = (unit: any, tag: string) => '' + unit.shortName + tag

export const mapName = (unit: any, name?: string) =>
  name == null ? joinName(unit, ' → *') : name

export function unitObjectName(objOrArr: any, method: string = 'combine') {
  let name = method + '('
  let comma = ''
  let i = 0
  //@ts-ignore
  for (const key in objOrArr) {
    //@ts-ignore
    const unit = objOrArr[key]
    if (unit != null) {
      name += comma
      //@ts-ignore
      name += is.unit(unit) ? unit.compositeName.fullName : unit.toString()
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
  const compositeName = createName(rawName, getParent(store))
  store.shortName = rawName
  if (!store.compositeName) {
    store.compositeName = compositeName
    return
  }
  const currentComposite = store.compositeName
  currentComposite.path = compositeName.path
  currentComposite.shortName = compositeName.shortName
  currentComposite.fullName = compositeName.fullName
}

export type CompositeName = {
  shortName: string
  fullName: string
  path: string[]
}

export function createName(name: string, parent?: Domain): CompositeName {
  let path: string[]
  let fullName
  let composite
  const shortName = name
  if (!parent) {
    if (name.length === 0) {
      path = []
    } else {
      path = [name]
    }
    fullName = name
  } else {
    composite = parent.compositeName
    if (name.length === 0) {
      path = composite.path
      fullName = composite.fullName
    } else {
      path = composite.path.concat([name])
      if (composite.fullName.length === 0) {
        fullName = name
      } else {
        fullName = '' + composite.fullName + '/' + name
      }
    }
  }
  return {shortName, fullName, path}
}
