import {createEvent} from './createUnit'
import {createNode} from './createNode'
import {createSampling} from './sample'
import {createLinkNode} from './forward'
import {calc} from './step'
import {assertTarget, is, isObject} from './is'
import {assert} from './throw'
import {processArgsToConfig} from './config'

/** Collect target calls before propagating them through the graph. */
export function perform(rawConfig: any) {
  const [config, metadata] = processArgsToConfig(rawConfig, true)
  const {action, update} = config
  assert(typeof action === 'function', 'perform: action should be a function')
  let {source, target} = config
  const shape = (value: any) =>
    isObject(value) && !is.unit(value) && !Array.isArray(value)
  const merge = (left: any, right: any, field: string) => {
    if (left === undefined) return right
    assert(
      shape(left) && shape(right),
      `perform: ${field} and update should be objects`,
    )
    const result = {...left}
    Object.keys(right).forEach(key => {
      assert(
        !Object.prototype.hasOwnProperty.call(result, key),
        `perform: duplicate ${field} key "${key}"`,
      )
      result[key] = right[key]
    })
    return result
  }
  if (update !== undefined) {
    const stores = is.store(update)
      ? [update]
      : shape(update) && Object.values(update)
    assert(
      stores && stores.every(is.store),
      'perform: update should contain stores',
    )
    stores.forEach((store: any) => assertTarget('perform', store, 'update'))
    source = merge(source, update, 'source')
    target = merge(target, update, 'target')
  }
  assert(
    is.unit(target) || shape(target),
    'perform: target should be a unit or object',
  )
  const singleTarget = is.unit(target)
  const entries = singleTarget ? [['', target]] : Object.entries(target)
  entries.forEach(([, unit]) => {
    assert(is.unit(unit), 'perform: target should contain units')
    assertTarget('perform', unit as any)
  })
  const hasSource = source !== undefined
  if (hasSource && !is.store(source)) {
    assert(
      shape(source),
      'perform: source should be a store or object of stores',
    )
    const normalized = Object.create(null)
    Object.keys(source).forEach(key => {
      assert(is.store(source[key]), 'perform: source should contain stores')
      const name = key[0] === '$' ? key.slice(1) : key
      assert(!(name in normalized), `perform: duplicate source key "${name}"`)
      normalized[name] = source[key]
    })
    source = normalized
  }
  const clock =
    config.clock === undefined
      ? createEvent({name: config.name, sid: config.sid, or: metadata})
      : config.clock
  const units: any[] = []
  const register = (unit: any) => {
    let index = units.indexOf(unit)
    if (index < 0) index = units.push(unit) - 1
    return index
  }
  const targets = entries.map(([key, unit]: any) => ({
    key,
    index: register(unit),
    reset: is.store(unit) ? register(unit.reinit) : -1,
  }))
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
          'perform: target calls are only allowed synchronously inside action',
        )
        if (index in calls)
          console.error(
            'perform: target called more than once; only the last value is used',
          )
        calls[index] = value
        return value
      }
      const callbacks: any = Object.create(null)
      targets.forEach(({key, index, reset}) => {
        const call: any = setter(index)
        if (reset >= 0) call.reinit = setter(reset)
        callbacks[key] = call
      })
      try {
        const callable = singleTarget ? callbacks[''] : callbacks
        if (hasSource) action(callable, value, payload)
        else action(callable, value)
      } finally {
        active = false
      }
      return calls
    },
    config.name,
    metadata,
    config.batch !== false,
    false,
    false,
    undefined,
    perform,
  )
  units.forEach((unit, index) => {
    createLinkNode(
      result,
      unit,
      [calc(calls => index in calls, true), calc(calls => calls[index])],
      'perform',
    )
  })
  if (config.clock === undefined) return clock
}
