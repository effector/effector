import {createEvent} from './createUnit'
import {createNode} from './createNode'
import {createSampling} from './sample'
import {createLinkNode} from './forward'
import {calc} from './step'
import {assertTarget, is, isFunction, isObject, isVoid} from './is'
import {generateErrorTitle} from './naming'
import {assert} from './throw'
import {processArgsToConfig} from './config'
import {forEach} from './collection'

/** Collect target calls before propagating them through the graph. */
export function perform(rawConfig: any) {
  const [config, metadata] = processArgsToConfig(rawConfig, true)
  const errorTitle = generateErrorTitle('perform', metadata)
  const {action, target, name, sid, batch = true} = config
  let {source, clock} = config
  const singleTarget = is.unit(target)
  const hasSource = !isVoid(source)
  const hasClock = !isVoid(clock)
  assert(isFunction(action), 'action should be a function', errorTitle)
  assert(
    singleTarget || isShape(target),
    'target should be a unit or object',
    errorTitle,
  )
  if (hasSource && !is.store(source)) {
    assert(
      isShape(source),
      'source should be a store or object of stores',
      errorTitle,
    )
    const normalized = Object.create(null)
    Object.keys(source).forEach(key => {
      const keyName = key.startsWith('$') ? key.slice(1) : key
      assert(
        is.store(source[key]),
        `source should contain store in key "${key}"`,
        errorTitle,
      )
      assert(
        !(keyName in normalized),
        `duplicate source key "${keyName}"`,
        errorTitle,
      )
      normalized[keyName] = source[key]
    })
    source = normalized
  }
  const units: any[] = []
  const register = (unit: any) => {
    let index = units.indexOf(unit)
    if (index === -1) {
      index = units.push(unit) - 1
    }
    return index
  }
  const targets = Object.entries(singleTarget ? {'': target} : target).map(
    ([key, unit]: [string, any]) => {
      assert(is.unit(unit), 'target should contain units', errorTitle)
      assertTarget(errorTitle, unit)
      return {
        key,
        index: register(unit),
        reset: is.store(unit) ? register(unit.reinit) : -1,
      }
    },
  )
  if (!hasClock) {
    clock = createEvent({name, sid, or: metadata})
  }
  const result = createNode({regional: true, meta: {op: 'perform'}})
  createSampling(
    'perform',
    clock,
    source,
    undefined,
    result,
    (value: any, payload: any) => {
      const calls: any[] = []
      let active = true
      const setter = (index: number) => (value: any) => {
        assert(
          active,
          'target calls are only allowed synchronously inside action',
          errorTitle,
        )
        if (index in calls) {
          console.error(
            'perform: target called more than once; only the last value is used',
          )
        }
        calls[index] = value
        return value
      }
      const callbacks: any = Object.create(null)
      forEach(targets, ({key, index, reset}) => {
        const call: any = setter(index)
        if (reset >= 0) {
          call.reinit = setter(reset)
        }
        callbacks[key] = call
      })
      try {
        const callable = singleTarget ? callbacks[''] : callbacks
        if (hasSource) {
          action(callable, value, payload)
        } else {
          action(callable, value)
        }
      } finally {
        active = false
      }
      return calls
    },
    name,
    metadata,
    batch,
    false,
    false,
    undefined,
    perform,
  )
  forEach(units, (unit, index) => {
    createLinkNode(
      result,
      unit,
      [calc(calls => index in calls, true), calc(calls => calls[index])],
      'perform',
    )
  })
  if (!hasClock) {
    return clock
  }
}

const isShape = (value: unknown) =>
  isObject(value) && !is.unit(value) && !Array.isArray(value)
