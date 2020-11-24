import {Store, Event, Scope} from 'effector'

export type StoreOrData<T> = Store<T> | T
export type DOMProperty = string | number | null | boolean
export type PropertyMap = {[field: string]: DOMProperty | AttributeStoreInput}
export type StylePropertyMap = Partial<
  {
    [K in keyof CSSStyleDeclaration]: DOMProperty | AttributeStoreInput
  }
>

export type HandlerMap =
  | Partial<{[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}>
  | {
      config?: {
        passive?: boolean
        capture?: boolean
        prevent?: boolean
        stop?: boolean
      }
      on: Partial<
        {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
      >
    }

export type DOMTag = keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap
export type DOMElement = HTMLElement | SVGElement
export type AttributeStore = Store<string | number | boolean | null>

type AttributeStoreInput = Omit<
  AttributeStore,
  'updates' | 'reset' | 'on' | 'off' | 'thru'
>

type Tuple<T = unknown> = [T] | T[]
type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
type GetCombinedValue<T> = {
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}

export function using(node: DOMElement, cb: () => any): void
export function using(
  node: DOMElement,
  opts: {
    fn: () => void
    hydrate?: boolean
    env?: {
      document: Document
    }
    onComplete?: () => void
    scope?: Scope
  },
): void

export function spec(spec: {
  attr?: PropertyMap
  data?: PropertyMap
  text?:
    | DOMProperty
    | AttributeStoreInput
    | Array<DOMProperty | AttributeStoreInput>
  visible?: Store<boolean>
  style?: StylePropertyMap
  styleVar?: PropertyMap
  handler?: HandlerMap
}): void
export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {
    passive?: boolean
    capture?: boolean
    stop?: boolean
    prevent?: boolean
  },
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void

export function h(
  tag: DOMTag,
  spec: {
    attr?: PropertyMap
    data?: PropertyMap
    text?:
      | DOMProperty
      | AttributeStoreInput
      | Array<DOMProperty | AttributeStoreInput>
    visible?: Store<boolean>
    style?: StylePropertyMap
    styleVar?: PropertyMap
    handler?: HandlerMap
    fn?: () => void
  },
): void
export function h(tag: DOMTag, cb: () => void): void
export function variant<T, K extends keyof T>(config: {
  source: Store<T>
  key: K
  cases: T[K] extends string
    ? Partial<
        {
          [F in T[K]]: (config: {
            store: Store<Extract<T, {[P in K]: F}>>
          }) => void
        } & {
          __: (config: {store: Store<T>}) => void
        }
      >
    : {
        [caseName: string]: (config: {store: Store<T>}) => void
        __: (config: {store: Store<T>}) => void
      }
}): void
// export function variant<Case extends string>(
//   key: Store<Case>,
//   cases: Partial<{[K in Case]: () => void}>,
// ): void
export function list<T>(
  source: Store<T[]>,
  cb: (opts: {store: Store<T>; key: Store<number>}) => void,
): void
export function list<
  T,
  K extends keyof T,
  Query extends [keyof T] | ReadonlyArray<keyof T> | (keyof T)[]
>(
  opts: {
    key: T[K] extends string | number ? K : never
    source: Store<T[]>
    visible?: (state: T) => boolean
    fields: Query
    fn?: (opts: {
      store: Store<T>
      fields: {
        [K in keyof Query]: Query[K] extends keyof T
          ? Store<T[Query[K]]>
          : never
      }
      key: Store<T[K]>
    }) => void
  },
  cb?: (opts: {
    store: Store<T>
    fields: {
      [K in keyof Query]: Query[K] extends keyof T ? Store<T[Query[K]]> : never
    }
    key: Store<T[K]>
  }) => void,
): void
export function list<T, K extends keyof T>(
  opts: {
    key: T[K] extends string | number | symbol ? K : never
    source: Store<T[]>
    visible?: (state: T) => boolean
    fn?: (opts: {store: Store<T>; key: Store<T[K]>}) => void
  },
  cb?: (opts: {store: Store<T>; key: Store<T[K]>}) => void,
): void

export function tree<
  T,
  ChildField extends keyof T
  // KeyField extends keyof T
>(config: {
  source: Store<T[]>
  // key: T[KeyField] extends string ? KeyField : never
  child: T[ChildField] extends T[] ? ChildField : never
  fn: (config: {store: Store<T>; child: () => void}) => void
}): void

export function rec<T>(config: {
  fn(config: {store: Store<T>}): void
}): (opts: {store: Store<T>}) => void
export function rec<T>(
  fn: (config: {store: Store<T>}) => void,
): (opts: {store: Store<T>}) => void

export function route<T>(config: {
  source: Store<T>
  visible: (value: T) => boolean
  fn: (config: {store: Store<T>}) => void
}): void
export function route<T, S extends T>(config: {
  source: Store<T>
  visible: (value: T) => value is S
  fn: (config: {store: Store<S>}) => void
}): void
export function route<T>(config: {
  source: Store<T>
  visible: Store<boolean>
  fn: (config: {store: Store<T>}) => void
}): void

export function block(config: {fn: () => void}): () => void

export function node(fn: (node: DOMElement) => void): void

export function text(
  words: TemplateStringsArray,
  ...values: Array<DOMProperty | AttributeStoreInput>
): void

export function remap<T extends Record<string, any>, Key extends keyof T>(
  store: Store<T>,
  key: Key,
): Store<T[Key]>
export function remap<
  T extends Record<string, any>,
  Names extends Array<keyof T>
>(
  store: Store<T>,
  names: [...Names],
): {
  [Key in keyof Names]: Names[Key] extends keyof T
    ? Store<T[Names[Key]]>
    : never
}
export function remap<
  T extends Record<string, any>,
  Shape extends {[field: number]: keyof T} | {[field: string]: keyof T}
>(
  store: Store<T>,
  shape: Shape,
): {
  [Key in keyof Shape]: Shape[Key] extends keyof T
    ? Store<T[Shape[Key]]>
    : never
}

export function val(
  words: TemplateStringsArray,
  ...values: Array<string | number>
): string
export function val(
  words: TemplateStringsArray,
  ...values: Array<DOMProperty | AttributeStoreInput>
): Store<string>
