import {Store, Event, Step} from 'effector'

export type Signal = Step
export type StoreOrData<T> = Store<T> | T
export type DOMProperty = string | number | null | boolean
export type PropertyMap = {[field: string]: StoreOrData<DOMProperty>}
export type StylePropertyMap = Partial<
  {
    [K in keyof CSSStyleDeclaration]: StoreOrData<DOMProperty>
  }
>
export type TransformMap = {
  translate: StoreOrData<{
    x?: number
    y?: number
  }>
  scale: StoreOrData<{
    x?: number
    y?: number
  }>
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

export type DOMElement = HTMLElement | SVGElement

type Tuple<T = unknown> = [T] | T[]
type Combinable = {[key: string]: Store<any>} | Tuple<Store<any>>
type GetCombinedValue<T> = {
  [K in keyof T]: T[K] extends Store<infer U> ? U : never
}

export function using(node: DOMElement, cb: () => any): void

export function spec(spec: {
  attr?: PropertyMap
  data?: PropertyMap
  transform?: Partial<TransformMap>
  text?: StoreOrData<DOMProperty>
  visible?: Store<boolean>
  style?: {
    prop?: StylePropertyMap
    val?: PropertyMap
  }
  focus?: {
    focus?: Event<any>
    blur?: Event<any>
  }
  handler?: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >
}): void
export function handler(
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void
export function handler(
  options: {passive?: boolean; capture?: boolean},
  map: Partial<
    {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
  >,
): void

export function h(tag: string, cb: () => void): void
export function h(
  tag: string,
  spec: {
    attr?: PropertyMap
    data?: PropertyMap
    transform?: Partial<TransformMap>
    text?: StoreOrData<DOMProperty>
    visible?: Store<boolean>
    style?: {
      prop?: StylePropertyMap
      val?: PropertyMap
    }
    focus?: {
      focus?: Event<any>
      blur?: Event<any>
    }
    handler?: Partial<
      {[K in keyof HTMLElementEventMap]: Event<HTMLElementEventMap[K]>}
    >
  },
): void

export function list<T>(
  source: Store<T[]>,
  cb: (opts: {store: Store<T>; index: number; signal: Signal}) => void,
): void
export function list<T, K extends keyof T>(
  {
    key,
    source,
    reverse,
  }: {
    key: T[K] extends string | number | symbol ? K : never
    source: Store<T[]>
    reverse?: boolean
  },
  cb: (opts: {store: Store<T>; key: T[K]; signal: Signal}) => void,
): void

export function map<T, S>(
  store: Store<T>,
  config: {fn: (value: T) => S},
): Store<S>

export function combine<A extends Combinable, B>(config: {
  source: A
  fn(source: GetCombinedValue<A>): B
}): Store<B>

export function node(fn: (node: DOMElement) => void): void
export function signalOwn<T>(value: T): T
export function explicitUnmount(unmountOn: Event<any>): void

export function remap<T extends {[field: string]: any}, S extends keyof T>(
  store: Store<T>,
  key: S,
): Store<T[S]>
export function remap<
  T extends {[field: string]: any},
  S extends {[field: number]: keyof T} | {[field: string]: keyof T}
>(
  store: Store<T>,
  shape: S,
): {[K in keyof S]: S[K] extends keyof T ? Store<T[S[K]]> : never}
