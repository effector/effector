import {Store, Event, Step, StateRef, Filter, Fork} from 'effector'

import {
  ElementBlock,
  ListBlock,
  UsingBlock,
  LF,
  RouteBlock,
  RecItemBlock,
  RecBlock,
  BlockBlock,
  BlockItemBlock,
} from './relation.h'

export type Template = {
  id: number
  name: string
  plain: any[]
  closure: any[]
  watch: any[]
  nameMap: Record<string, any>
  pages: Spawn[]
  childTemplates: Template[]
  loader: Filter
  upward: Filter
  parent: Template | null
}

export type Spawn = {
  id: number
  fullID: string
  reg: {[id: string]: StateRef}
  template: Template
  parent: Spawn | null
  childSpawns: {[id: string]: Spawn[]}
  active: boolean
}

export type DOMProperty = string | number | null | boolean
export type PropertyMap = {[field: string]: StoreOrData<DOMProperty>}
export type StylePropertyMap = Partial<
  {
    [K in keyof CSSStyleDeclaration]: StoreOrData<DOMProperty>
  }
>
export type NSType = 'html' | 'svg' | 'foreignObject'

export type DOMElement = HTMLElement | SVGElement

export type StoreOrData<T> = Store<T> | T

export type HandlerRecord = {
  options: {
    prevent: boolean
    stop: boolean
  }
  domConfig: {
    passive: boolean
    capture: boolean
  }
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}
export type StaticOperationDef =
  | {
      type: 'attr'
      field: string
      value: DOMProperty
    }
  | {
      type: 'data'
      field: string
      value: DOMProperty
    }
  | {
      type: 'style'
      field: string
      value: DOMProperty
    }
  | {
      type: 'styleVar'
      field: string
      value: DOMProperty
    }
type OperationDef =
  | {
      type: 'visible'
      value: Store<boolean>
    }
  | {
      type: 'attr'
      field: string
      value: Store<DOMProperty>
    }
  | {
      type: 'data'
      field: string
      value: Store<DOMProperty>
    }
  | {
      type: 'style'
      field: string
      value: Store<DOMProperty>
    }
  | {
      type: 'styleVar'
      field: string
      value: Store<DOMProperty>
    }
  | {
      type: 'staticText'
      value: string
      childIndex: number
    }
  | {
      type: 'dynamicText'
      value: Store<DOMProperty>
      childIndex: number
    }
  | {
      type: 'handler'
      for: string
      handler: Event<any>
      options: {
        prevent: boolean
        stop: boolean
      }
      domConfig: {
        passive: boolean
        capture: boolean
      }
    }

export type Env = {
  document: Document
}

export type Actor<Api extends {[method: string]: (params: any) => any}> = {
  node: Step
  template: Template
  draft: NodeDraft
  api: Api
  trigger: {
    mount: Event<Leaf>
  }
  isSvgRoot: boolean
  namespace: NSType
  env: Env
  deferredInit?: (() => void) | null
  isBlock: boolean
}

export type AsyncValue = {
  /** Init, Active, Terminated and async transitions between them */
  status: 'I' | 'A' | 'T' | 'IA' | 'AA' | 'AT'
  value: {
    active: any
    pending: any
  }
  hooks: {
    onTerminate: (wasActive: boolean) => void
  }
  ops: {
    init: Op
    change: Op
    terminate: Op
  }
}

export type Op = {
  value: {
    active: any
    pending: any
  }
  runOp: (value: any) => void
  status: 'active' | 'pending' | 'suspend'
  priority: 'props' | 'tree' | 'data'
  group: OpGroup
  cursor: {
    prev: Op | null
    next: Op | null
  }
}

export type OpPriorityQueue = {
  props: OpPlainQueue
  tree: OpPlainQueue
  data: OpPlainQueue
  rafID: number | null
  execQueue: () => void
  onDrain?: (() => void) | null
}

type OpPlainQueue = {
  first: OpGroup | null
  last: OpGroup | null
}

export type OpGroup = {
  ops: Op[]
  queue: OpPriorityQueue
  activeChilds: {
    props: {
      first: Op | null
      last: Op | null
    }
    tree: {
      first: Op | null
      last: Op | null
    }
    data: {
      first: Op | null
      last: Op | null
    }
  }
  cursor: {
    props: {
      prev: OpGroup | null
      next: OpGroup | null
    }
    tree: {
      prev: OpGroup | null
      next: OpGroup | null
    }
    data: {
      prev: OpGroup | null
      next: OpGroup | null
    }
  }
}

export type LeafDataRoute = {
  type: 'route'
  block: RouteBlock
  ops: {
    // visible: Op
  }
  initialized: boolean
}

export type LeafDataElement = {
  type: 'element'
  block: ElementBlock
  ops: {
    visible: Op
  }
  needToCallNode: boolean
}

export type LeafDataBlock = {
  type: 'block'
  block: BlockBlock
}

export type LeafDataBlockItem = {
  type: 'block item'
  block: BlockItemBlock
}

export type LeafDataRec = {
  type: 'rec'
  block: RecBlock
}

export type LeafDataRecItem = {
  type: 'rec item'
  block: RecItemBlock
}

export type LeafDataListItem = {
  type: 'list item'
  block: LF
}

export type LeafDataList = {
  type: 'list'
  draft: ListType
  block: ListBlock
  records: ListItemType[]
}

export type LeafDataUsing = {
  type: 'using'
  draft: UsingDraft
  element: DOMElement
  block: UsingBlock
}

export type LeafData =
  | LeafDataUsing
  | LeafDataElement
  | LeafDataList
  | LeafDataListItem
  | LeafDataRoute
  | LeafDataRec
  | LeafDataRecItem
  | LeafDataBlock
  | LeafDataBlockItem

export type Leaf = {
  actor: Actor<any>
  spawn: Spawn
  parentLeaf: Leaf | null
  draft: NodeDraft
  data: LeafData
  ops: {
    group: OpGroup
    domSubtree: OpGroup
  }
  api: {
    mount(data: Leaf): void
    itemUpdater(update: any): void
  }
  svgRoot: SVGSVGElement | null
  hydration: boolean
  forkPage?: Fork
  env: Env
  mountNode: DOMElement
}

export type BindingsDraft = {
  childTemplates: Actor<any>[]
  childCount: number
  inParentIndex: number
}

export type BlockDraft = {
  type: 'block'
  childTemplates: Actor<any>[]
  childCount: number
  inParentIndex: 0
}

export type BlockItemDraft = BindingsDraft & {
  type: 'blockItem'
  itemOf: Actor<any>
}

export type RecDraft = {
  type: 'rec'
  childTemplates: Actor<any>[]
  childCount: number
  inParentIndex: 0
}

export type RecItemDraft = BindingsDraft & {
  type: 'recItem'
}

export type RouteDraft = BindingsDraft & {
  type: 'route'
}

export type ListType = BindingsDraft & {
  type: 'list'
  key: {type: 'index'} | {type: 'key'; key: string}
  itemVisible?: Store<boolean>
}

export type ListItemType = {
  type: 'listItem'
  key: string
  index: number
  active: boolean
  asyncValue: AsyncValue
  leafData: LeafDataListItem
  instance?: Leaf
}

export type MergedBindings = {
  attr: PropertyMap
  data: PropertyMap
  text: Array<{
    index: number
    value: StoreOrData<DOMProperty>
  }>
  styleProp: StylePropertyMap
  styleVar: PropertyMap
  visible: Store<boolean> | null
  handler: HandlerRecord[]
}

export type ElementDraft = BindingsDraft & {
  type: 'element'
  tag: string
  stencil: DOMElement
  seq: OperationDef[]
  staticSeq: StaticOperationDef[]
  attr: PropertyMap[]
  data: PropertyMap[]
  text: Array<{
    index: number
    value: StoreOrData<DOMProperty>
  }>
  styleProp: StylePropertyMap[]
  styleVar: PropertyMap[]
  visible?: Store<boolean>
  node: Array<(node: DOMElement) => (() => void) | void>
  handler: HandlerRecord[]
  opsAmount: number
}

export type UsingDraft = BindingsDraft & {
  type: 'using'
}

export type NodeDraft =
  | ElementDraft
  | UsingDraft
  | ListType
  | ListItemType
  | RouteDraft
  | RecDraft
  | RecItemDraft
  | BlockDraft
  | BlockItemDraft
