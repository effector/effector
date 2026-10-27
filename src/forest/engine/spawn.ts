import {launch} from 'effector'
import type {Scope} from '../../effector/unit.h'
import type {StateRef} from '../../effector/index.h'
import type {Leaf, DOMElement, LeafData, Template, Root} from '../index.h'
import type {OpGroup} from '../plan/index.h'

let spawnID = 0
export let currentLeaf: Leaf | null = null

type MountQueue = {
  parent: MountQueue | null
  steps: any[]
}

let mountQueue: MountQueue | null = null

export function spawn(
  template: Template,
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
  const page = {} as Record<string, StateRef>

  const leaf: Leaf = {
    draft: template.draft,
    svgRoot,
    data: leafData,
    parent: parentLeaf,
    hydration,
    mountNode,
    root,
    id: ++spawnID,
    fullID: '',
    reg: page,
    template,
  }
  template.pages.push(leaf)
  const previousSpawn = currentLeaf
  currentLeaf = leaf
  if (parentLeaf) {
    addMapItems([leaf], template.id, root.childSpawns[parentLeaf.fullID])
  }
  if (parentLeaf) {
    leaf.fullID = `${parentLeaf.fullID}_${leaf.id}`
  } else {
    leaf.fullID = `${leaf.id}`
  }
  root.childSpawns[leaf.fullID] = {}
  root.activeSpawns.add(leaf.fullID)
  root.leafOps[leaf.fullID] = {group: opGroup, domSubtree}
  template.closure.forEach(ref => {
    let closureRef = ref
    let parent = leaf.parent
    findClosure: while (parent) {
      if (regRef(parent, ref)) {
        closureRef = regRef(parent, ref)
        break findClosure
      }
      parent = parent.parent
    }
    if (!parent && root.scope) {
      root.scope.getState(ref)
      closureRef = root.scope.reg[ref.id]
    }
    page[ref.id] = closureRef
  })
  template.plain.forEach(ref => {
    const next: StateRef = {
      id: ref.id,
      current: getCurrent(ref, root.scope),
    }
    page[ref.id] = next
  })
  for (const name in values) {
    const id = template.nameMap[name].stateRef.id
    page[id] = {
      id,
      current: values[name],
    }
  }
  function execRef(ref: StateRef) {
    if (!ref.before) return
    ref.before.forEach(cmd => {
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
    })
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
            : findRefValue(val.of, leaf.parent, leaf.root.scope),
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
  if (parentLeaf) {
    for (const id in root.childSpawns[leaf.fullID]) {
      addMapItems(
        root.childSpawns[leaf.fullID][id],
        id,
        root.childSpawns[parentLeaf.fullID],
      )
    }
  }
  if (mountQueue) {
    mountQueue.steps.push({
      target: template.trigger.mount,
      params: leaf,
      defer: true,
      page: leaf,
      scope: root.scope,
    })
  } else {
    mountQueue = {
      parent: mountQueue,
      steps: [
        {
          target: template.trigger.mount,
          params: leaf,
          defer: true,
          page: leaf,
          scope: root.scope,
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
  while (currentLeaf && !regRef(currentLeaf, ref)) {
    currentLeaf = currentLeaf.parent
  }
  if (!currentLeaf) {
    if (forkPage) {
      forkPage.getState(ref)
      return forkPage.reg[ref.id]
    }
    return ref
  }
  return regRef(currentLeaf, ref)
}
function findRefValue(
  ref: StateRef,
  targetLeaf: Leaf | null,
  forkPage?: Scope,
) {
  return findRef(ref, targetLeaf, forkPage).current
}
function ensureLeafHasRef(ref: StateRef, leaf: Leaf) {
  if (!regRef(leaf, ref)) {
    leaf.reg[ref.id] = findRef(ref, leaf.parent, leaf.root.scope)
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
