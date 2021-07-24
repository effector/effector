import type {DOMElement} from './index.h'

export type ChildBlock =
  | ElementBlock
  | ListBlock
  | TextBlock
  | RouteBlock
  | RecItemBlock
  | RecBlock
  | BlockBlock
  | BlockItemBlock

export type Block =
  | LF
  | ListBlock
  | UsingBlock
  | TextBlock
  | ElementBlock
  | RouteBlock
  | RecItemBlock
  | RecBlock
  | BlockBlock
  | BlockItemBlock

export type FragmentParent =
  | LF
  | UsingBlock
  | ElementBlock
  | RouteBlock
  | RecItemBlock
  | RecBlock
  | BlockBlock
  | BlockItemBlock

export type RouteBlock = {
  type: 'route'
  parent: FragmentParent
  child: ChildBlock[]
  visible: boolean
  index: number
}

export type ElementBlock = {
  type: 'element'
  parent: FragmentParent
  child: ChildBlock[]
  value: DOMElement
  visible: boolean
  index: number
}

export type ListBlock = {
  type: 'list'
  parent: FragmentParent
  child: LF[]
  lastChild: LF | null
  visible: boolean
  index: number
}

export type TextBlock = {
  type: 'text'
  parent: ElementBlock
  value: Text
  visible: boolean
  index: number
}

export type UsingBlock = {
  type: 'using'
  child: ChildBlock[]
  value: DOMElement
}

export type LF = {
  type: 'LF'
  parent: ListBlock
  child: ChildBlock[]
  visible: boolean
  childInitialized: boolean
  left: LF | null
  right: LF | null
}

export type RecItemBlock = {
  type: 'recItem'
  parent: FragmentParent
  child: ChildBlock[]
  visible: boolean
  index: number
}

export type RecBlock = {
  type: 'rec'
  parent: FragmentParent
  child: ChildBlock[]
  visible: boolean
  index: number
}

export type BlockBlock = {
  type: 'block'
  parent: FragmentParent
  child: ChildBlock[]
  visible: boolean
  index: number
}

export type BlockItemBlock = {
  type: 'blockItem'
  parent: FragmentParent
  child: ChildBlock[]
  visible: boolean
  index: number
}
