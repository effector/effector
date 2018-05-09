//@flow

export type OptsAsync<Item, Result> = {
 graph: Map<Item, Array<Item>>,
 task: (item: Item) => Result,
 force?: boolean,
 sync?: false,
}
export type OptsSync<Item, Result> = {
 graph: Map<Item, Array<Item>>,
 task: (item: Item) => Result,
 force?: boolean,
 sync: true,
}
export type Opts<Item, Result> =
 | OptsSync<Item, Result>
 | OptsAsync<Item, Result>
export type Results<Item, Result> = {
 safe: boolean,
 values: Map<Item, Result>,
}
