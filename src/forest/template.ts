import {
  Store,
  Event,
  launch,
  step,
  createNode,
  withRegion,
  restore,
  createEvent,
} from 'effector'
import type {Scope} from '../effector/unit.h'
import type {StateRef} from '../effector/index.h'
import type {Stack} from '../effector/kernel'
import type {
  Leaf,
  Actor,
  NSType,
  DOMElement,
  LeafData,
  Template,
  Spawn,
  NodeDraft,
  Root,
} from './index.h'
import type {OpGroup} from './plan/index.h'

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
      mount: Event<Leaf>
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
  isBlock?: boolean
}): Actor<Api>
//@ts-expect-error
export function createTemplate(config: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<Leaf>
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
  isBlock?: boolean
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
  isBlock = false,
}: {
  fn: (
    state: {
      [field: string]: Store<any>
    },
    triggers: {
      mount: Event<Leaf>
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
  isBlock?: boolean
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
      //@ts-expect-error
      fn(upd, scope, stack: Stack) {
        if (!stack.page) {
          if (stack.parent && stack.parent.page) {
            stack.page = stack.parent.page
          } else {
            // console.error('context lost', stack)
            return true
          }
        }
        if (!stack.page.root.activeSpawns.has(stack.page.fullID)) {
          console.count('inactive page upward')
          return false
        }
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
          /**
           * node.meta.nativeTemplate is used in units
           * it represents template in which unit was created (belongs to)
           */
          const targetTemplate: Template | void = node.meta.nativeTemplate
          if (targetTemplate) {
            if (stackTemplates.includes(targetTemplate)) {
              const page = stackPages[stackTemplates.indexOf(targetTemplate)]
              launch({
                //@ts-expect-error
                target: node,
                params: upd,
                defer: true,
                page,
                stack,
                forkPage: stack.forkPage,
              })
            } else {
              console.error('context drift', {stack, node})
            }
          } else {
            launch({
              //@ts-expect-error
              target: node,
              params: upd,
              defer: true,
              page: stack.page,
              stack,
              forkPage: stack.forkPage,
            })
          }
        })
        return false
      },
    }),
    loader: step.filter({
      //@ts-expect-error
      fn(upd, scope, stack: Stack) {
        if (stack.parent) {
          const forkId = stack.forkPage ? stack.forkPage.graphite.id : null
          if (stack.page) {
            if (!stack.page.root.activeSpawns.has(stack.page.fullID)) {
              console.count('inactive page loader')
              return false
            }
            if (stack.page.template === template) {
              return true
            }

            if (stack.page.root.childSpawns[stack.page.fullID][template.id]) {
              const fullID = stack.page!.fullID
              stack.page.root.childSpawns[fullID][template.id].forEach(page => {
                if (forkId) {
                  if (
                    !page.leaf.root.forkPage ||
                    forkId !== page.leaf.root.forkPage.graphite.id
                  )
                    return
                }
                launch({
                  params: upd,
                  //@ts-expect-error
                  target: stack.node,
                  page,
                  defer: true,
                  forkPage: stack.forkPage,
                })
              })
            } else {
              const fullID = stack.page.fullID
              const isRecTemplate = stack.page.template.name === 'rec'

              template.pages.forEach(page => {
                if (forkId) {
                  if (
                    !page.leaf.root.forkPage ||
                    forkId !== page.leaf.root.forkPage.graphite.id
                  )
                    return
                }
                if (
                  page.fullID === fullID ||
                  page.fullID.startsWith(`${fullID}_`)
                ) {
                  let validTarget = true
                  if (isRecTemplate) {
                    const recID = stack.page!.template.id
                    let parentPage = page.parent
                    while (parentPage) {
                      if (parentPage === stack.page) {
                        break
                      }
                      if (parentPage.template.id === recID) {
                        validTarget = false
                        break
                      }
                      parentPage = parentPage.parent
                    }
                  }
                  if (validTarget) {
                    launch({
                      params: upd,
                      //@ts-expect-error
                      target: stack.node,
                      page,
                      defer: true,
                      forkPage: stack.forkPage,
                    })
                  }
                } else {
                  if (fullID.startsWith(`${page.fullID}_`)) {
                    launch({
                      params: upd,
                      //@ts-expect-error
                      target: stack.node,
                      page: stack.page,
                      defer: true,
                      forkPage: stack.forkPage,
                    })
                  } else {
                    // console.count('no page match')
                  }
                }
              })
            }
          } else {
            template.pages.forEach(page => {
              if (forkId) {
                if (
                  !page.leaf.root.forkPage ||
                  forkId !== page.leaf.root.forkPage.graphite.id
                )
                  return
              }
              launch({
                params: upd,
                //@ts-expect-error
                target: stack.node,
                page,
                defer: true,
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
      //@ts-expect-error
      mount: createEvent<Leaf>({named: 'mount'}),
    },
    draft,
    isSvgRoot,
    namespace,
    env,
    isBlock: isBlock || !!(parentActor && parentActor.isBlock),
  })
  if (!defer) {
    withRegion(node, () => {
      const state = restore(values)
      //@ts-expect-error
      actor.api = fn(state, actor.trigger)
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
          //@ts-expect-error
          actor.api = fn(state, actor.trigger)
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
  //@ts-expect-error
  template.actor = actor
  return actor
}

function getCurrent(ref: StateRef, forkPage?: Scope) {
  let result
  if (forkPage) result = forkPage.getState(ref)
  else result = ref.current
  switch (ref.type) {
    case 'list':
      return [...result]
    case 'shape':
      return {...result}
    default:
      return result
  }
}
function findRef(
  ref: StateRef,
  targetLeaf: Leaf | null,
  forkPage?: Scope,
): StateRef {
  let currentLeaf = targetLeaf
  while (currentLeaf && !regRef(currentLeaf.spawn, ref)) {
    currentLeaf = currentLeaf.parentLeaf
  }
  if (!currentLeaf) {
    if (forkPage) {
      forkPage.getState(ref)
      return forkPage.reg[ref.id]
    }
    return ref
  }
  return regRef(currentLeaf.spawn, ref)
}
function findRefValue(
  ref: StateRef,
  targetLeaf: Leaf | null,
  forkPage?: Scope,
) {
  return findRef(ref, targetLeaf, forkPage).current
}
function ensureLeafHasRef(ref: StateRef, leaf: Leaf) {
  if (!regRef(leaf.spawn, ref)) {
    leaf.spawn.reg[ref.id] = findRef(ref, leaf.parentLeaf, leaf.root.forkPage)
  }
}
const regRef = (page: {reg: Record<string, StateRef>}, ref: StateRef) =>
  page.reg[ref.id]
function addMapItems<T>(
  values: T[],
  id: string | number,
  record: Record<string | number, T[]>,
) {
  if (!(id in record)) {
    record[id] = []
  }
  record[id].push(...values)
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
    root,
  }: {
    values?: {[field: string]: any}
    parentLeaf: Leaf | null
    mountNode: DOMElement
    svgRoot: SVGSVGElement | null
    leafData: LeafData
    opGroup: OpGroup
    domSubtree: OpGroup
    hydration: boolean
    root: Root
  },
): Leaf {
  const parentSpawn = parentLeaf ? parentLeaf.spawn : null
  const template = actor.template
  const page = {} as Record<string, StateRef>
  const result: Spawn = {
    id: ++spawnID,
    fullID: '',
    reg: page,
    template,
    parent: parentSpawn,
    leaf: null as unknown as Leaf,
    root,
  }
  template.pages.push(result)
  const leaf: Leaf = {
    actor,
    spawn: result,
    draft: actor.draft,
    svgRoot,
    data: leafData,
    parentLeaf,
    hydration,
    mountNode,
    root,
  }
  const previousSpawn = currentLeaf
  currentLeaf = leaf
  if (parentSpawn) {
    addMapItems([result], template.id, root.childSpawns[parentSpawn.fullID])
  }
  if (parentSpawn) {
    result.fullID = `${parentSpawn.fullID}_${result.id}`
  } else {
    result.fullID = `${result.id}`
  }
  root.childSpawns[result.fullID] = {}
  root.activeSpawns.add(result.fullID)
  root.leafOps[result.fullID] = {group: opGroup, domSubtree}
  for (let i = 0; i < template.closure.length; i++) {
    const ref = template.closure[i]
    let closureRef = ref
    let parent = result.parent
    findClosure: while (parent) {
      if (regRef(parent, ref)) {
        closureRef = regRef(parent, ref)
        break findClosure
      }
      parent = parent.parent
    }
    if (!parent && root.forkPage) {
      root.forkPage.getState(ref)
      closureRef = root.forkPage.reg[ref.id]
    }
    page[ref.id] = closureRef
  }

  for (let i = 0; i < template.plain.length; i++) {
    const ref = template.plain[i]
    const next: StateRef = {
      id: ref.id,
      current: getCurrent(ref, root.forkPage),
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
  function execRef(ref: StateRef) {
    if (ref.before) {
      for (let i = 0; i < ref.before.length; i++) {
        const cmd = ref.before[i]
        switch (cmd.type) {
          case 'map': {
            const from = cmd.from
            if (!cmd.fn && !from) break
            let value
            if (from) {
              ensureLeafHasRef(from, leaf)
              value = page[from.id].current
            }
            page[ref.id].current = cmd.fn ? cmd.fn(value) : value
            break
          }
          case 'field': {
            const from = cmd.from
            ensureLeafHasRef(from, leaf)
            page[ref.id].current[cmd.field] = page[from.id].current
            break
          }
          case 'closure':
            ensureLeafHasRef(cmd.of, leaf)
            break
        }
      }
    }
  }
  template.closure.forEach(execRef)
  template.plain.forEach(execRef)

  function runWatchersFrom(
    list: any[],
    state: {i: number; stop: boolean},
    page: Record<string, StateRef>,
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
            : findRefValue(val.of, leaf.parentLeaf, leaf.root.forkPage),
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
    for (const id in root.childSpawns[result.fullID]) {
      addMapItems(
        root.childSpawns[result.fullID][id],
        id,
        root.childSpawns[parentSpawn.fullID],
      )
    }
  }
  leaf.spawn.leaf = leaf
  if (mountQueue) {
    mountQueue.steps.push({
      target: actor.trigger.mount,
      params: leaf,
      defer: true,
      page: result,
      forkPage: root.forkPage,
    })
  } else {
    mountQueue = {
      parent: mountQueue,
      steps: [
        {
          target: actor.trigger.mount,
          params: leaf,
          defer: true,
          page: result,
          forkPage: root.forkPage,
        },
      ],
    }
    let step: any
    do {
      while ((step = mountQueue.steps.shift())) {
        mountQueue = {
          parent: mountQueue,
          steps: [],
        }
        launch(step)
      }
    } while ((mountQueue = mountQueue.parent))
  }
  currentLeaf = previousSpawn
  return leaf
}

type MountQueue = {
  parent: MountQueue | null
  steps: any[]
}

let mountQueue: MountQueue | null = null
