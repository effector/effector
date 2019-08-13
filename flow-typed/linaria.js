declare module 'linaria' {
  declare export type ClassName = string | false | void | null | 0
  declare export type CSSProperties = {
    [key: string]: string | number | CSSProperties,
    ...,
  }
  declare export function cx(...classNames: ClassName[]): string
  declare export function css(
    strings: string[],
    ...exprs: Array<string | number | CSSProperties>
  ): string
}

declare module 'linaria/react' {
  import type {ComponentType} from 'react'
  import type {CSSProperties} from 'linaria'

  declare export type StyledComponent<T> = ComponentType<
    T & {as?: React$ElementType, ...},
  >

  declare export type StyledTag<T> = (
    strings: string[],
    ...exprs: $ReadOnlyArray<any>
  ) => StyledComponent<T>

  declare export type StyledJSXIntrinsics = $ObjMap<
    $JSXIntrinsics,
    () => StyledTag<{children?: React$Node, [key: string]: any, ...}>,
  >
  declare export var styled: StyledJSXIntrinsics & {|
    <T>(T): StyledTag<React.ElementConfig<T>>,
  |}
}
