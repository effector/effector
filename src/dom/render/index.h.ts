import {Store, Event, Step} from 'effector'

export type Platform = {
  requestAnimationFrame: (cb: () => any) => NodeJS.Timeout | number
  cancelAnimationFrame: (id: NodeJS.Timeout | number) => void
  performance: {
    mark(name: string): void
    measure(measureName: string, startMark?: string, endMark?: string): void
    clearMarks(markName?: string): void
    clearMeasures(measureName?: string): void
  }
}

export type Signal = Step
export type DOMProperty = string | number | null | boolean
export type PropertyMap = {[field: string]: StoreOrData<DOMProperty>}
export type StylePropertyMap = Partial<
  {
    [K in keyof CSSStyleDeclaration]: StoreOrData<DOMProperty>
  }
>
export type NSType = 'html' | 'svg' | 'foreignObject'
export type StackRecord = {
  node: DOMElement
  append: DOMElement[]
  reverse: boolean
}

export type DOMElement = HTMLElement | SVGElement

export type StoreOrData<T> = Store<T> | T
export type TransformMap = {
  translate:
    | Store<{
        x?: number
        y?: number
      }>
    | {
        x?: StoreOrData<number>
        y?: StoreOrData<number>
      }
  scale:
    | Store<{
        x?: number
        y?: number
      }>
    | {
        x?: StoreOrData<number>
        y?: StoreOrData<number>
      }
  rotate: StoreOrData<
    | {
        angle?: number
        x?: number
        y?: number
      }
    | number
  >
  skewX: StoreOrData<number>
  skewY: StoreOrData<number>
}

export type HandlerRecord = {
  options: {passive: boolean; capture: boolean}
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}

type ListType = {
  type: 'list'
  pure: boolean
  reverse: boolean
  key: {type: 'index'} | {type: 'key'; key: string}
  store: Store<any[]>
  cb: (opts: {
    store: Store<any>
    index: number
    key: string
    signal: Signal
  }) => void
  // previousVisibleNode: Store<Stack | null>
  // lastOwnVisibleNode: Store<Stack | null>
}

export type ListItemType = {
  type: 'listItem'
  pure: boolean
  key: string
  index: number
  store: Store<any>
  active: boolean
  signal: Signal
  nodes: DOMElement[]
  fields: Store<any>[] | null
  visible: Array<Store<boolean>>
}

export type MergedBindings = {
  attr: PropertyMap
  data: PropertyMap
  visible: Store<boolean> | null
  text: StoreOrData<DOMProperty>
  styleVar: PropertyMap
  styleProp: StylePropertyMap
  handler: HandlerRecord[]
  transform: Partial<TransformMap>[]
  focus: Event<any>[]
  blur: Event<any>[]
}

export type BindingsDraft = {
  pure: boolean
  attr: PropertyMap[]
  data: PropertyMap[]
  visible: Array<Store<boolean>>
  text: Array<StoreOrData<DOMProperty>>
  styleVar: PropertyMap[]
  styleProp: StylePropertyMap[]
  handler: HandlerRecord[]
  transform: Partial<TransformMap>[]
  focus: Event<any>[]
  blur: Event<any>[]
}

export type ElementDraft = BindingsDraft & {
  type: 'element'
  tag: string
}

export type UsingDraft = BindingsDraft & {
  type: 'using'
}

type NoopType = {
  type: 'noop'
  pure: boolean
}
export type NodeType =
  | ElementDraft
  | UsingDraft
  | ListType
  | ListItemType
  | NoopType

export type MountStatus =
  | 'initial'
  | 'mount pending'
  | 'mounted'
  | 'remove pending'
  | 'removed'

export type Stack = {
  parent: Stack | null
  signal: Signal
  namespace: NSType
  targetElement: DOMElement
  svgRoot: SVGSVGElement | null
  child: Stack[]
  locality: {
    sibling: {
      left: {ref: Stack | null}
      right: {ref: Stack | null}
    }
    child: {
      first: {ref: Stack | null}
      last: {ref: Stack | null}
    }
  }
  node: NodeType
  mountStatus: MountStatus
  visible: boolean
}
