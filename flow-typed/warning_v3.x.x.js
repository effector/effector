declare module warning {
  declare module.exports: (
    shouldBeTrue: boolean,
    warning: string,
    ...args: any[]
  ) => void
}
