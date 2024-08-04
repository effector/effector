import type {Domain} from './unit.h'
import {own} from './own'
import {createNode, createLinkNode} from './createNode'
import type {Config, NodeUnit} from './index.h'
import {
  createEvent,
  createNamedEvent,
  createStore,
  initUnit,
} from './createUnit'
import {createEffect} from './createEffect'
import {add, forEach, forIn} from './collection'
import {getGraph, getParent} from './getter'
import {DOMAIN} from './tag'
import {launch} from './kernel'
import {calc} from './step'
import {flattenConfig} from './config'

export function createDomain(nameOrConfig: any, maybeConfig?: any): Domain {
  const config = flattenConfig({
    or: maybeConfig,
    and: typeof nameOrConfig === 'string' ? {name: nameOrConfig} : nameOrConfig,
  }) as any

  const node = createNode({
    family: {type: DOMAIN},
    regional: true,
    parent: config?.domain || config?.parent,
  })

  const domain = {
    history: {},
    graphite: node,
    hooks: {},
  } as Domain

  node.meta = initUnit(DOMAIN, domain, {
    parent: config?.domain || config?.parent,
    or: {...config, derived: true},
  })

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
        rawConfig?: Config,
      ) => {
        const config = flattenConfig({and: rawConfig, or: nameOrConfig})
        if (config?.domain) {
          // @ts-expect-error complicated factory type
          return factory(nameOrConfig, rawConfig)
        }
        // @ts-expect-error complicated factory type
        return onCreateUnit(factory(nameOrConfig, {parent: domain, or: config}))
      }
    },
  )

  const parent = getParent(domain)
  if (parent) {
    forIn(domain.hooks, (from: NodeUnit, key) =>
      createLinkNode(from, parent.hooks[key]),
    )
  }
  if (config?.domain) {
    config.domain.hooks.domain(domain)
  }
  return domain
}
