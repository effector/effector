import {
  Store,
  Event,
  launch,
  step,
  createNode,
  withRegion,
  restore,
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
} from './index.h'

let templateID = 0
let spawnID = 0
export let currentTemplate: Template | null = null
export let currentLeaf: Leaf | null = null
export let currentActor: Actor<any> | null = null

export function createTemplate<Api extends {[method: string]: any}>({
  fn,
  state: values = {},
  name = '',
  draft,
  isSvgRoot,
  namespace,
  env,
}: {
  fn: (state: {
    [field: string]: Store<any>
  }) => {[K in keyof Api]: Event<Api[K]>}
  state?: {[field: string]: any}
  name: string
  isSvgRoot: boolean
  draft: ElementDraft | ListType | ListItemType | UsingDraft | RouteType
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
      fn(upd, scope, stack) {
        if (!stack.page) {
          console.error('context lost', stack)
          return false
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
        stack.node.next.forEach(node => {
          const targetTemplate = node.meta.nativeTemplate
          if (targetTemplate) {
            if (stackTemplates.includes(targetTemplate)) {
              launch({
                target: node,
                params: upd,
                defer: true,
                page: stackPages[stackTemplates.indexOf(targetTemplate)],
                stack,
              })
            } else {
              console.error('context drift', {stack, node})
            }
          } else {
            launch({
              target: node,
              params: upd,
              defer: true,
              page: null,
              stack,
            })
          }
        })
        return false
      },
    }),
    loader: step.filter({
      fn(upd, scope, stack) {
        if (stack.parent) {
          if (stack.page) {
            if (!stack.page.active) return false
            if (stack.page.template === template) return true
            if (stack.page.childSpawns[template.id]) {
              stack.page.childSpawns[template.id].forEach(page => {
                launch({
                  params: upd,
                  target: stack.node,
                  page,
                  defer: true,
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
                    target: stack.node,
                    page: null,
                    defer: true,
                  })
                } else {
                  launch({
                    params: upd,
                    target: stack.node,
                    page: stackPages[targetPageIndex],
                    defer: true,
                  })
                }
              } else {
                template.pages.forEach(page => {
                  if (page.fullID.startsWith(stack.page.fullID)) {
                    launch({
                      params: upd,
                      target: stack.node,
                      page,
                      defer: true,
                    })
                  } else {
                    // console.count('no page match')
                  }
                })
              }
            }
          } else {
            template.pages.forEach(page => {
              launch({
                params: upd,
                target: stack.node,
                page,
                defer: true,
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
    api: null,
    draft,
    isSvgRoot,
    namespace,
    env,
  })
  withRegion(node, () => {
    const state = restore(values)
    actor.api = fn(state) as any
    template.nameMap = state
  })
  currentActor = parentActor
  currentTemplate = parent
  //@ts-ignore
  template.actor = actor
  return actor
}

function getCurrent(ref) {
  switch (ref.type) {
    case 'list':
      return [...ref.current]
    case 'shape':
      return {...ref.current}
    default:
      return ref.current
  }
}

export function spawn(
  actor: Actor<any>,
  {
    values = {},
    parentSpawn,
    parentLeaf,
    mountNode,
    svgRoot,
    leafData,
    opGroup,
    domSubtree,
    hydration,
  }: {
    values?: {[field: string]: any}
    parentSpawn: Spawn | null
    parentLeaf: Leaf | null
    mountNode: DOMElement
    svgRoot: SVGSVGElement | null
    leafData: LeafData
    opGroup: OpGroup
    domSubtree: OpGroup
    hydration: boolean
  },
): Leaf {
  const template = actor.template
  const page = {}
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
    page[ref.id] = closureRef
  }

  for (const ref of template.plain) {
    const next = {
      id: ref.id,
      current: getCurrent(ref),
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
  function execRef(ref) {
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

  function runWatchersFrom(list, state, page) {
    state.stop = true
    let val
    try {
      while (state.i < list.length) {
        val = list[state.i]
        state.i++
        val.fn(page[val.of.id].current)
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
  if (actor.api) {
    for (const key in actor.api) {
      api[key] = (params, defer = true) =>
        launch({
          target: actor.api[key],
          params,
          defer,
          page: result,
        })
    }
    //@ts-ignore
    leaf.spawn.api = api
  }
  //@ts-ignore
  leaf.spawn.leaf = leaf
  leaf.api.mount({
    node: mountNode,
    leaf,
  })
  currentLeaf = previousSpawn
  return leaf
}
