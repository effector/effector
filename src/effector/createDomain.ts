import type {Domain} from './unit.h'
import {own} from './own'
import {createNode} from './createNode'
import type {Config, NodeUnit} from './index.h'
import {
  createEvent,
  createStore,
  createNamedEvent,
  initUnit,
} from './createUnit'
import {createEffect} from './createEffect'
import {createLinkNode} from './forward'
import {add, forEach, forIn} from './collection'
import {getGraph, getParent} from './getter'
import {DOMAIN} from './tag'
import {launch} from './kernel'
import {calc} from './step'

export function createDomain(nameOrConfig: any, maybeConfig?: any): Domain {
  const node = createNode({family: {type: DOMAIN}, regional: true})

  const result = {
    history: {},
    graphite: node,
    hooks: {},
  } as Domain

  node.meta = initUnit(DOMAIN, result, nameOrConfig, maybeConfig)

  forIn(
    {
      Event: createEvent,
      Effect: createEffect,
      Store: createStore,
      Domain: createDomain,
    },
    (factory, tag) => {
      const lowerCaseTag = tag.toLowerCase() as
        | 'event'
        | 'effect'
        | 'store'
        | 'domain'

      const trigger = createNamedEvent(`on${tag}`)
      result.hooks[lowerCaseTag] = trigger

      const acc = new Set<any>()
      result.history[`${lowerCaseTag}s`] = acc

      trigger.create = res => {
        launch(trigger, res)
        return res
      }
      add(
        getGraph(trigger).seq,
        calc((upd, _, stack) => {
          stack.scope = null
          return upd
        }),
      )
      trigger.watch(data => {
        own(result, [data])
        acc.add(data)
        if (!data.ownerSet) data.ownerSet = acc
        if (!getParent(data)) data.parent = result
      })
      own(result, [trigger])

      result[`onCreate${tag}`] = (hook: (data: any) => any) => {
        forEach(acc, hook)
        return trigger.watch(hook)
      }
      result[`create${tag}`] = result[lowerCaseTag] = (
        nameOrConfig: any,
        config?: Config,
        // @ts-expect-error complicated factory type
      ) => trigger(factory(nameOrConfig, {parent: result, or: config}))
    },
  )

  const parent = getParent(result)
  if (parent) {
    forIn(result.hooks, (from: NodeUnit, key) =>
      createLinkNode(from, parent.hooks[key]),
    )
  }
  return result
}
