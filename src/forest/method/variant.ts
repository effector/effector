import {Store, is} from 'effector'

import {currentTemplate} from '../engine/createTemplate'
import {assert, assertClosure} from '../assert'

import {route} from './route'

export function variant<T, K extends keyof T>({
  source,
  cases,
  key,
}: {
  source: Store<T>
  key: K
  cases: T[K] extends string
    ? Record<T[K], (config: {store: Store<T>}) => void>
    : {
        [caseName: string]: (config: {store: Store<T>}) => void
        __: (config: {store: Store<T>}) => void
      }
}) {
  assertClosure(currentTemplate, 'variant')
  assert(is.unit(source), 'variant({source}) should be unit')
  let keyReader: (value: any) => any

  if (typeof key === 'function') keyReader = key
  else if (key == null) keyReader = (value: any) => String(value)
  else keyReader = (value: any) => String(value[key])

  let defaultCase = false

  for (const caseName in cases) {
    if (caseName === '__') {
      defaultCase = true
      continue
    }
    route({
      source,
      visible: value => keyReader(value) === caseName,
      fn: cases[caseName],
    })
  }
  if (defaultCase) {
    const nonDefaultCases = Object.keys(cases)
    route({
      source,
      visible: value => !nonDefaultCases.includes(keyReader(value)),
      //@ts-expect-error
      fn: cases.__,
    })
  }
}
