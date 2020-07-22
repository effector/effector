import {
  Store,
  Event,
  launch,
  step,
  createNode,
  withRegion,
  restore,
  Step,
  createEvent,
  StateRef,
  Fork,
} from 'effector'
import {
  Leaf,
  Actor,
  ElementDraft,
  ListType,
  ListItemType,
  UsingDraft,
  RouteType,
  NSType,
  DOMElement,
  LeafData,
  OpGroup,
  Template,
  Spawn,
  LeafMountParams,
  NodeDraft,
} from './index.h'

let templateID = 0
let spawnID = 0
export let currentTemplate: Template | null = null
export let currentLeaf: Leaf | null = null
export let currentActor: Actor<any> | null = null

export function createTemplate<Api extends {[method: string]: any}>(config: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<LeafMountParams>
      unmount: Event<void>
    },
  ) => {[K in keyof Api]: Event<Api[K]>}
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
}): Actor<Api>
//@ts-ignore
export function createTemplate(config: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<LeafMountParams>
      unmount: Event<void>
    },
  ) => void
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
}): Actor<any>
export function createTemplate<Api extends {[method: string]: any}>({
  fn,
  state: values = {},
  defer = false,
  name = '',
  draft,
  isSvgRoot,
  namespace,
  env,
}: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<LeafMountParams>
      unmount: Event<void>
    },
  ) => {[K in keyof Api]: Event<Api[K]>}
  state?: {[field: string]: any}
  defer?: boolean
  name: string
  isSvgRoot: boolean
  draft: NodeDraft
  namespace: NSType
  env: {
    document: Document
  }
}): Actor<Api> {
  const parentActor = currentActor
  const parent = currentTemplate
  const template: Template = {
    id: ++templateID,
    name,
    plain: [],
    watch: [],
    nameMap: {},
    pages: [],
    closure: [],
    childTemplates: [],
    upward: step.filter({
      //@ts-ignore
      fn(upd, scope, stack) {
        if (!stack.page) {
          if (stack.parent && stack.parent.page) {
            stack.page = stack.parent.page
          } else {
            // console.error('context lost', stack)
            return true
          }
        }
        if (!stack.page.active) return false
        const stackTemplates = [stack.page.template]
        const stackPages = [stack.page]
        {
          let currentStackPage = stack.page.parent
          while (currentStackPage) {
            stackPages.push(currentStackPage)
            stackTemplates.push(currentStackPage.template)
            currentStackPage = currentStackPage.parent
          }
        }
        stack.node.next.forEach((node: Step) => {
          const targetTemplate = node.meta.nativeTemplate
          if (targetTemplate) {
            if (stackTemplates.includes(targetTemplate)) {
              launch({
                target: getForkedUnit(node, stack.forkPage),
                params: upd,
                defer: true,
                page: stackPages[stackTemplates.indexOf(targetTemplate)],
                //@ts-ignore
                stack,
                //@ts-ignore
                forkPage: stack.forkPage,
              })
            } else {
              console.error('context drift', {stack, node})
            }
          } else {
            launch({
              target: getForkedUnit(node, stack.forkPage),
              params: upd,
              defer: true,
              page: null,
              //@ts-ignore
              stack,
              //@ts-ignore
              forkPage: stack.forkPage,
            })
          }
        })
        return false
      },
    }),
    loader: step.filter({
      //@ts-ignore
      fn(upd, scope, stack) {
        if (stack.parent) {
          const forkId = stack.forkPage ? stack.forkPage.graphite.id : null
          if (stack.page) {
            if (!stack.page.active) return false
            if (stack.page.template === template) return true
            if (stack.page.childSpawns[template.id]) {
              stack.page.childSpawns[template.id].forEach((page: Spawn) => {
                if (forkId) {
                  if (
                    !((page as any).leaf as Leaf).forkPage ||
                    forkId !== (page as any).leaf.forkPage.graphite.id
                  )
                    return
                }
                launch({
                  params: upd,
                  target: getForkedUnit(stack.node, stack.forkPage),
                  page,
                  defer: true,
                  //@ts-ignore
                  forkPage: stack.forkPage,
                })
              })
            } else {
              if (scope.targetTemplate) {
                const stackPages = [stack.page]
                {
                  let currentStackPage = stack.page.parent
                  while (currentStackPage) {
                    stackPages.push(currentStackPage)
                    currentStackPage = currentStackPage.parent
                  }
                }
                const targetPageIndex = stackPages.findIndex(
                  stackPage => scope.targetTemplate === stackPage.template,
                )
                if (targetPageIndex === -1) {
                  launch({
                    params: upd,
                    target: getForkedUnit(stack.node, stack.forkPage),
                    page: null,
                    defer: true,
                    //@ts-ignore
                    forkPage: stack.forkPage,
                  })
                } else {
                  launch({
                    params: upd,
                    target: getForkedUnit(stack.node, stack.forkPage),
                    page: stackPages[targetPageIndex],
                    defer: true,
                    //@ts-ignore
                    forkPage: stack.forkPage,
                  })
                }
              } else {
                template.pages.forEach(page => {
                  if (forkId) {
                    if (
                      !((page as any).leaf as Leaf).forkPage ||
                      forkId !== (page as any).leaf.forkPage.graphite.id
                    )
                      return
                  }
                  if (page.fullID.startsWith(stack.page.fullID)) {
                    launch({
                      params: upd,
                      target: getForkedUnit(stack.node, stack.forkPage),
                      page,
                      defer: true,
                      //@ts-ignore
                      forkPage: stack.forkPage,
                    })
                  } else {
                    // console.count('no page match')
                  }
                })
              }
            }
          } else {
            template.pages.forEach(page => {
              if (forkId) {
                if (
                  !((page as any).leaf as Leaf).forkPage ||
                  forkId !== (page as any).leaf.forkPage.graphite.id
                )
                  return
              }
              launch({
                params: upd,
                target: getForkedUnit(stack.node, stack.forkPage),
                page,
                defer: true,
                //@ts-ignore
                forkPage: stack.forkPage,
              })
            })
          }

          return false
        }
        return true
      },
    }),
    parent,
  }
  if (parent) {
    parent.childTemplates.push(template)
  }
  const node = createNode({
    meta: {
      template,
    },
  })
  currentTemplate = template
  const actor: Actor<Api> = (currentActor = {
    template,
    node,
    api: null as any,
    trigger: {
      mount: createEvent<LeafMountParams>(),
      unmount: createEvent(),
    },
    draft,
    isSvgRoot,
    namespace,
    env,
  })
  if (!defer) {
    withRegion(node, () => {
      const state = restore(values)
      actor.api = fn(state, actor.trigger) as any
      template.nameMap = state
    })
  } else {
    actor.deferredInit = () => {
      const prevActor = currentActor
      const prevTemplate = currentTemplate
      currentActor = actor
      currentTemplate = template
      actor.deferredInit = null
      try {
        withRegion(node, () => {
          const state = restore(values)
          actor.api = fn(state, actor.trigger) as any
          template.nameMap = state
        })
      } finally {
        currentActor = prevActor
        currentTemplate = prevTemplate
      }
    }
  }
  currentActor = parentActor
  currentTemplate = parent
  //@ts-ignore
  template.actor = actor
  return actor
}

export function getForkedUnit(unit: any, forkPage?: Fork) {
  if (!forkPage) return unit
  unit = unit.graphite || unit
  //@ts-ignore
  return forkPage.nodeMap[unit.id] || unit
}

function getCurrent(
  ref: {type?: string; current: any; id: string},
  forkPage?: Fork,
) {
  let usedRef = ref
  //@ts-ignore
  if (forkPage && forkPage.reg[ref.id]) usedRef = forkPage.reg[ref.id]
  switch (ref.type) {
    case 'list':
      return [...usedRef.current]
    case 'shape':
      return {...usedRef.current}
    default:
      return usedRef.current
  }
}
function findRefValue(
  ref: {current: any; id: string},
  targetLeaf: Leaf | null,
  forkPage?: Fork,
) {
  let currentLeaf = targetLeaf
  while (currentLeaf && !currentLeaf.spawn.reg[ref.id]) {
    currentLeaf = currentLeaf.parentLeaf
  }
  if (!currentLeaf) {
    //@ts-ignore
    if (forkPage && forkPage.reg[ref.id]) {
      //@ts-ignore
      return forkPage.reg[ref.id].current
    }
    return ref.current
  }
  return currentLeaf.spawn.reg[ref.id].current
}
export function spawn(
  actor: Actor<any>,
  {
    values = {},
    parentLeaf,
    mountNode,
    svgRoot,
    leafData,
    opGroup,
    domSubtree,
    hydration,
    refMap,
    forkPage,
  }: {
    values?: {[field: string]: any}
    parentLeaf: Leaf | null
    mountNode: DOMElement
    svgRoot: SVGSVGElement | null
    leafData: LeafData
    opGroup: OpGroup
    domSubtree: OpGroup
    hydration: boolean
    refMap?: Record<string, StateRef>
    forkPage?: Fork
  },
): Leaf {
  const parentSpawn = parentLeaf ? parentLeaf.spawn : null
  const template = actor.template
  const page = (refMap ? {...refMap} : {}) as Record<string, any>
  const result: Spawn = {
    id: ++spawnID,
    fullID: '',
    reg: page,
    template,
    parent: parentSpawn,
    childSpawns: {},
    active: true,
  }
  template.pages.push(result)
  const api = {} as any
  const leaf: Leaf = {
    spawn: result,
    api,
    draft: actor.draft,
    ops: {
      group: opGroup,
      domSubtree,
    },
    svgRoot,
    data: leafData,
    parentLeaf,
    hydration,
    forkPage,
  }
  const previousSpawn = currentLeaf
  currentLeaf = leaf
  if (parentSpawn) {
    if (!parentSpawn.childSpawns[template.id]) {
      parentSpawn.childSpawns[template.id] = []
    }
    parentSpawn.childSpawns[template.id].push(result)
  }
  if (parentSpawn) {
    result.fullID = `${parentSpawn.fullID}_${result.id}`
  } else {
    result.fullID = `${result.id}`
  }
  if (parentSpawn) {
    Object.assign(page, parentSpawn.reg)
  }
  for (const ref of template.closure) {
    let closureRef = ref
    let parent = result.parent
    findClosure: while (parent) {
      if (ref.id in parent.reg) {
        closureRef = parent.reg[ref.id]
        break findClosure
      }
      parent = parent.parent
    }
    //@ts-ignore
    if (!parent && forkPage && forkPage.reg[ref.id]) {
      //@ts-ignore
      closureRef = forkPage.reg[ref.id]
    }
    page[ref.id] = closureRef
  }

  for (const ref of template.plain) {
    const next = {
      id: ref.id,
      current: getCurrent(ref, forkPage),
    }
    page[ref.id] = next
  }
  for (const name in values) {
    const id = template.nameMap[name].stateRef.id
    page[id] = {
      id,
      current: values[name],
    }
  }
  function execRef(ref: any) {
    if (ref.before) {
      for (const cmd of ref.before) {
        switch (cmd.type) {
          case 'map': {
            const from = cmd.from
            if (!page[from.id]) {
              page[from.id] = from
            }
            page[ref.id].current = cmd.fn(page[from.id].current)
            break
          }
          case 'field': {
            const from = cmd.from
            if (!page[from.id]) {
              page[from.id] = from
            }
            page[ref.id].current[cmd.field] = page[from.id].current
            break
          }
          case 'closure':
            if (!page[cmd.of.id]) {
              page[cmd.of.id] = cmd.of
            }
            break
        }
      }
    }
    if (!ref.after) return
    const value = page[ref.id].current
    for (const cmd of ref.after) {
      const to = cmd.to
      if (!page[to.id]) {
        page[to.id] = {
          id: to.id,
          current: to.current,
        }
      }
      switch (cmd.type) {
        case 'copy':
          page[to.id].current = value
          break
        case 'map':
          page[to.id].current = cmd.fn(value)
          break
      }
    }
  }
  for (const ref of template.closure) {
    execRef(ref)
  }
  for (const ref of template.plain) {
    execRef(ref)
  }

  function runWatchersFrom(
    list: any[],
    state: {i: number; stop: boolean},
    page: Record<string, any>,
  ) {
    state.stop = true
    let val
    try {
      while (state.i < list.length) {
        val = list[state.i]
        state.i++
        val.fn(
          page[val.of.id]
            ? page[val.of.id].current
            : findRefValue(val.of, leaf.parentLeaf, forkPage),
        )
      }
    } catch (err) {
      console.error(err)
      state.stop = false
    }
  }
  const state = {i: 0, stop: false}
  while (!state.stop) {
    runWatchersFrom(template.watch, state, page)
  }
  if (parentSpawn) {
    for (const id in result.childSpawns) {
      if (!(id in parentSpawn.childSpawns)) {
        parentSpawn.childSpawns[id] = []
      }
      parentSpawn.childSpawns[id].push(...result.childSpawns[id])
    }
  }
  api.mount = (params: any, defer = true) =>
    launch({
      target: actor.trigger.mount,
      params,
      defer,
      page: result,
      //@ts-ignore
      forkPage,
    })
  api.unmount = (params: any, defer = true) =>
    launch({
      target: actor.trigger.unmount,
      params,
      defer,
      page: result,
      //@ts-ignore
      forkPage,
    })
  if (actor.api) {
    for (const key in actor.api) {
      api[key] = (params: any, defer = true) =>
        launch({
          target: actor.api[key],
          params,
          defer,
          page: result,
          //@ts-ignore
          forkPage,
        })
    }
  }
  //@ts-ignore
  leaf.spawn.api = api
  //@ts-ignore
  leaf.spawn.leaf = leaf
  leaf.api.mount({
    node: mountNode,
    leaf,
  })
  currentLeaf = previousSpawn
  return leaf
}
