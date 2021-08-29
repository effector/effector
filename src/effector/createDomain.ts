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
import {forEach, forIn} from './collection'
import {getGraph, getParent} from './getter'
import {DOMAIN} from './tag'
import {launch} from './kernel'
import {compute} from './step'

export function createDomain(nameOrConfig: any, maybeConfig?: any): Domain {
  const node = createNode({family: {type: DOMAIN}, regional: true})

  const result: any = {
    history: {},
    graphite: node,
    hooks: {},
  }

  node.meta = initUnit(DOMAIN, result, nameOrConfig, maybeConfig)

  forIn(
    {
      Event: createEvent,
      Effect: createEffect,
      Store: createStore,
      Domain: createDomain,
    },
    (factory: any, tag) => {
      const lowerCaseTag = tag.toLowerCase()

      const trigger = createNamedEvent(`on${tag}`)
      result.hooks[lowerCaseTag] = trigger

      const acc = new Set<any>()
      result.history[`${lowerCaseTag}s`] = acc

      trigger.create = res => {
        launch(trigger, res)
        return res
      }
      getGraph(trigger).seq.push(
        compute({
          fn(upd, _, stack) {
            stack.scope = null
            return upd
          },
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
