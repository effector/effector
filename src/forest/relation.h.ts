import {DOMElement} from './index.h'

export type ChildBlock =
  | FF
  | ElementBlock
  | ListBlock
  | TextBlock
  | RouteBlock
  | FRecItem
  | FRec

export type Block =
  | FragmentBlock
  | ListBlock
  | UsingBlock
  | TextBlock
  | ElementBlock
  | RouteBlock
  | RecItemBlock
  | RecBlock

export type RouteBlock = {
  type: 'route'
  parent: FragmentBlock
  child: RF
  visible: boolean
  index: number
}

export type FragmentBlock = {
  type: 'fragment'
  parent: FF | UsingBlock | ElementBlock | LF | RF | RecItemF | RecF
  child: ChildBlock[]
}

export type ElementBlock = {
  type: 'element'
  parent: FragmentBlock
  child: FragmentBlock
  value: DOMElement
  visible: boolean
  index: number
}

export type ListBlock = {
  type: 'list'
  parent: FragmentBlock
  child: LF[]
  lastChild: LF | null
  visible: boolean
  index: number
}

export type TextBlock = {
  type: 'text'
  parent: FragmentBlock
  value: Text
  visible: boolean
  index: number
}

export type UsingBlock = {
  type: 'using'
  child: FragmentBlock
  value: DOMElement
}

export type RF = {
  type: 'RF'
  parent: RouteBlock
  child: FragmentBlock
  visible: boolean
  // index: number
}

export type FF = {
  type: 'FF'
  parent: FragmentBlock
  child: FragmentBlock
  visible: boolean
  index: number
}

export type LF = {
  type: 'LF'
  parent: ListBlock
  child: FragmentBlock
  visible: boolean
  childInitialized: boolean
  left: LF | null
  right: LF | null
}

/* rec item blocks */

export type RecItemBlock = {
  type: 'recItem'
  parent: FRecItem
  child: RecItemF
}

export type RecItemF = {
  type: 'RecItemF'
  parent: RecItemBlock
  child: FragmentBlock
}

export type FRecItem = {
  type: 'FRecItem'
  parent: FragmentBlock
  child: RecItemBlock
  visible: boolean
  index: number
}

/* rec blocks */

export type RecBlock = {
  type: 'rec'
  parent: FRec
  child: RecF
}

export type RecF = {
  type: 'RecF'
  parent: RecBlock
  child: FragmentBlock
}

export type FRec = {
  type: 'FRec'
  parent: FragmentBlock
  child: RecBlock
  visible: boolean
  index: number
}
