import {DOMElement} from './index.h'

/*


       │
  parent F  L  U  T  E
─child─┼────────────────▶
     F │ FF LF UF -  EF
     L │ FL -  -  -  -
     U │ -  -  -  -  -
     T │ FT -  -  -  -
     E │ FE -  -  -  -
       ▼


       │
  parent F  U  E  L
─child─┼─────────────▶
     F │ FF UF EF LF
     E │ FE -  -  -
     L │ FL -  -  -
     T │ FT -  -  -
       ▼


*/

export type ChildBlock = FF | FE | FL | FT | FR

export type Block =
  | FragmentBlock
  | ListBlock
  | UsingBlock
  | TextBlock
  | ElementBlock
  | RouteBlock

export type RouteBlock = {
  type: 'route'
  parent: FR
  child: RF
}

export type FragmentBlock = {
  type: 'fragment'
  parent: FF | UF | EF | LF | RF
  child: ChildBlock[]
}

export type ElementBlock = {
  type: 'element'
  parent: FE
  child: EF
  value: DOMElement
}

export type ListBlock = {
  type: 'list'
  parent: FL
  child: LF[]
  lastChild: LF | null
}

export type TextBlock = {
  type: 'text'
  parent: FT
  value: Text
}

export type UsingBlock = {
  type: 'using'
  child: UF
  value: DOMElement
}

export type RF = {
  type: 'RF'
  parent: RouteBlock
  child: FragmentBlock
  visible: boolean
  // index: number
}

export type FR = {
  type: 'FR'
  parent: FragmentBlock
  child: RouteBlock
  visible: boolean
  index: number
}

export type FF = {
  type: 'FF'
  parent: FragmentBlock
  child: FragmentBlock
  visible: boolean
  index: number
}

export type FE = {
  type: 'FE'
  parent: FragmentBlock
  child: ElementBlock
  visible: boolean
  index: number
}

export type FL = {
  type: 'FL'
  parent: FragmentBlock
  child: ListBlock
  visible: boolean
  index: number
}

export type FT = {
  type: 'FT'
  parent: FragmentBlock
  child: TextBlock
  visible: boolean
  index: number
}

export type UF = {
  type: 'UF'
  parent: UsingBlock
  child: FragmentBlock
}

export type EF = {
  type: 'EF'
  parent: ElementBlock
  child: FragmentBlock
}

export type LF = {
  type: 'LF'
  parent: ListBlock
  child: FragmentBlock
  visible: boolean
  left: LF | null
  right: LF | null
}
