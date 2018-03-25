declare module 'invariant' {
  declare module.exports: (
    condition: boolean,
    format: string,
    ...args: Array<any>
  ) => void
}
