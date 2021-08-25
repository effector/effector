import type {Store, Event, Step, Filter} from 'effector'
import type {Scope} from '../effector/unit.h'
import type {StateRef, Node, Cmd} from '../effector/index.h'

import type {
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
import type {Op, OpGroup, AsyncValue} from './plan/index.h'

export type Template = {
  id: number
  name: string
  plain: StateRef[]
  closure: StateRef[]
  watch: any[]
  nameMap: Record<string, any>
  pages: Leaf[]
  childTemplates: Template[]
  loader: Filter
  upward: Filter
  parent: Template | null

  node: Step
  // template: Template
  draft: NodeDraft
  api: Record<string, Event<any>>
  trigger: {
    mount: Event<Leaf>
  }
  isSvgRoot: boolean
  namespace: NSType
  env: Env
  deferredInit?: (() => void) | null
  isBlock: boolean
  handlers: TemplateHandlers
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

export type OperationDef =
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

/** operation family for things represented as <el "thing"="value" /> */
export type PropertyOperationDef = Extract<
  OperationDef,
  {type: PropertyOperationKind}
>
export type PropertyOperationKind = 'attr' | 'data' | 'style' | 'styleVar'

export type Env = {
  document: Document
}

export type LeafDataRoute = {
  type: 'route'
  block: RouteBlock
  ops: {
    // visible: Op
  }
  initialized: boolean
  pendingInit: {value: any} | null
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
  listDraft: ListType
}

export type LeafDataList = {
  type: 'list'
  draft: ListType
  block: ListBlock
  records: ListItemType[]
  pendingUpdate: any[] | null
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
  parent: Leaf | null
  draft: NodeDraft
  data: LeafData
  svgRoot: SVGSVGElement | null
  hydration: boolean
  root: Root
  mountNode: DOMElement

  id: number
  fullID: string
  reg: {[id: string]: StateRef}
  template: Template
}

export type Root = {
  forkPage?: Scope
  env: Env
  activeSpawns: Set<string>
  childSpawns: Record<string, {[id: string]: Leaf[]}>
  leafOps: Record<
    string,
    {
      group: OpGroup
      domSubtree: OpGroup
    }
  >
}

export type BindingsDraft = {
  childTemplates: Template[]
  childCount: number
  inParentIndex: number
}

export type BlockDraft = {
  type: 'block'
  childTemplates: Template[]
  childCount: number
  inParentIndex: 0
}

export type BlockItemDraft = BindingsDraft & {
  type: 'blockItem'
  itemOf: Template
}

export type RecDraft = {
  type: 'rec'
  childTemplates: Template[]
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
  style: StylePropertyMap[]
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

export type TemplateHandlers = {
  storeBase(template: Template, plainState: StateRef): void
  storeOnMap(
    template: Template,
    plainState: StateRef,
    seq: (Cmd | void)[],
    fromRef: StateRef | false,
  ): void
  storeMap(template: Template, plainState: StateRef, linkNode: Node): void
  storeWatch(
    template: Template,
    plainState: StateRef,
    fn: (value: unknown) => unknown,
  ): true
  eventPrepend(template: Template, contramapped: Node): void
  combineBase(template: Template, rawShape: StateRef, isFresh: StateRef): void
  combineField(template: Template, childRef: StateRef, linkNode: Node): void
  splitBase(template: Template, lastValues: StateRef): void
  splitMatchStore(template: Template, storeRef: StateRef, linkNode: Node): void
  sampleStoreSource(template: Template, sourceRef: StateRef): void
  sampleNonStoreSource(
    template: Template,
    hasSource: StateRef,
    sourceState: StateRef,
    clockState: StateRef,
  ): void
  sampleTarget(template: Template, target: Node): void
  sampleSourceLoader(template: Template): Filter
  sampleSourceUpward(template: Template, isUpward: boolean): Filter | false
}
