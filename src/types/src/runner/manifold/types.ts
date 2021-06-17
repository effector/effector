export type Decl =
  | Bracket
  | Val<unknown>
  | Union<unknown>
  | Branch
  | Compute<unknown>
  | Filter
export type StackDecl = Branch | Bracket
export type DataDecl<T> = Val<T> | Union<T> | Compute<T>

export type Branch = Def<'branch', {decls: Decl[]; result: Decl}>
export type Bracket = Def<
  'bracket',
  {
    decls: Branch[]
    source: kv<Decl>
    matchGroup: Array<kv<any> | Array<kv<any>>>
    result: Val<unknown>
  }
>
export type Val<T> = Def<'val', T>
export type Union<T> = Def<'union', T> & {items: array<T>}
export type Compute<T> = Def<'compute', T> & {
  source: kv<DataDecl<unknown>>
  fn: (source: kv<unknown>) => T
}
export type Filter = Def<'filter', void> & {
  source: kv<DataDecl<unknown>>
  fn: (source: kv<unknown>) => boolean
}

export type kv<T> = Readonly<Record<string, T>>
export type KV<T> = Record<string, T>

export type array<T> =
  | readonly []
  | readonly [T]
  | readonly [T, ...(readonly T[])]

export declare class Def<Kind extends string, Data> {
  id: string
  readonly kind: Kind
  readonly data: Data
  prev: Decl[]
  next: Decl[]
  owners: Decl[]
  links: Decl[]
}

/** single match query like {name: 'alice'} */
export type kvDecl<Src extends kv<Decl>> = Partial<
  {[K in keyof Src]: Src[K] extends Def<any, infer Data> ? Data : never}
>

export type DeclKind = Decl extends Def<infer K, unknown> ? K : never

type OptionalPropertyNames<T> = {
  [K in keyof T]-?: {} extends {[P in K]: T[K]} ? K : never
}[keyof T]

type SpreadProperties<L, R, K extends keyof L & keyof R> = {
  [P in K]: L[P] | Exclude<R[P], undefined>
}

type Id<T> = T extends infer U ? {[K in keyof U]: U[K]} : never

//prettier-ignore
type SpreadTwo<L, R> = Id<
  & Pick<L, Exclude<keyof L, keyof R>>
  & Pick<R, Exclude<keyof R, OptionalPropertyNames<R>>>
  & Pick<R, Exclude<OptionalPropertyNames<R>, keyof L>>
  & SpreadProperties<L, R, OptionalPropertyNames<R> & keyof L>
>

type Spread<A extends readonly [...any]> = A extends [infer L, ...(infer R)]
  ? Exact<Readonly<SpreadTwo<L, Spread<R>>>>
  : unknown
export type MatchGroupFlat<
  Src extends kv<Decl>,
  MatchGroup extends kv<unknown>
> = MatchGroup extends kv<array<kv<unknown>>>
  ? Exact<Readonly<{[K in keyof MatchGroup]: Spread<MatchGroup[K]>}>>
  : Exact<MatchGroup>

type Exact<T extends Readonly<Record<string, unknown>>> = {
  [K in keyof T]: T[K]
}
type NoInfer<T> = [T][T extends any ? 0 : never]

export type MG<Src extends kv<Decl>, MatchGroup extends kv<kvDecl<Src>>> = (
  f: {
    [L in keyof MatchGroup]: () => unknown
  },
) => void
