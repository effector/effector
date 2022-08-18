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
import {flattenConfig} from './config'

export function createDomain(nameOrConfig: any, maybeConfig?: any): Domain {
  const node = createNode({family: {type: DOMAIN}, regional: true})

  const domain = {
    history: {},
    graphite: node,
    hooks: {},
  } as Domain

  const config = flattenConfig({
    or: maybeConfig,
    and: typeof nameOrConfig === 'string' ? {name: nameOrConfig} : nameOrConfig,
  }) as any
  node.meta = initUnit(DOMAIN, domain, config)

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

      const onCreateUnit = createNamedEvent(`on${tag}`)
      domain.hooks[lowerCaseTag] = onCreateUnit

      const history = new Set<any>()
      domain.history[`${lowerCaseTag}s`] = history

      onCreateUnit.create = unit => {
        launch(onCreateUnit, unit)
        return unit
      }
      add(
        getGraph(onCreateUnit).seq,
        calc((upd, _, stack) => {
          stack.scope = null
          return upd
        }),
      )
      onCreateUnit.watch(unit => {
        own(domain, [unit])
        history.add(unit)
        if (!unit.ownerSet) unit.ownerSet = history
        if (!getParent(unit)) unit.parent = domain
      })
      own(domain, [onCreateUnit])

      domain[`onCreate${tag}`] = (hook: (unit: any) => any) => {
        forEach(history, hook)
        return onCreateUnit.watch(hook)
      }
      domain[`create${tag}`] = domain[lowerCaseTag] = (
        nameOrConfig: any,
        config?: Config,
        // @ts-expect-error complicated factory type
      ) => onCreateUnit(factory(nameOrConfig, {parent: domain, or: config}))
    },
  )

  const parent = getParent(domain)
  if (parent) {
    forIn(domain.hooks, (from: NodeUnit, key) =>
      createLinkNode(from, parent.hooks[key]),
    )
  }
  return domain
}
