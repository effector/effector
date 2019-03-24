// flow-typed signature: 84697af19a43b8fe4b8d984ab732a258
// flow-typed version: a19c700782/markdown-table_v1.x.x/flow_>=v0.76.x

declare module 'markdown-table' {
  declare type Table = mixed[][]

  declare type Options = {|
    delimiter?: string,
    end?: string,
    start?: string,
    align?: 'c' | 'l' | 'r',
    stringLength?: (value: mixed) => number,
  |}
  declare function markdownTable(table: Table, options?: Options): string

  declare module.exports: typeof markdownTable
}
