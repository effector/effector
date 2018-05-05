//@flow strict

export type Unknown = 0
export type Changed = 1
export type Unchanged = 2
export type Disconnected = 3
export type Status = Unknown | Changed | Unchanged | Disconnected

export const UNKNOWN: Unknown = 0
export const CHANGED: Changed = 1
export const UNCHANGED: Unchanged = 2
export const DISCONNECTED: Disconnected = 3
