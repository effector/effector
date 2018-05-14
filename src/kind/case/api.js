//@flow

export type None = -1
export type Store = 1
export type Event = 2
export type Effect = 3

export type ApiKind = None | Store | Event | Effect

export const NONE: None = -1
export const STORE: Store = 1
export const EVENT: Event = 2
export const EFFECT: Effect = 3
