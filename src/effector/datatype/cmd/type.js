//@flow

export type ComputeType = 'cmd:compute'
export type EmitType = 'cmd:emit'
export type RunType = 'cmd:run'
export type FilterType = 'cmd:filter'
export type UpdateType = 'cmd:update'

export type CmdType = ComputeType | EmitType | RunType | FilterType | UpdateType

export const COMPUTE: ComputeType = 'cmd:compute'
export const EMIT: EmitType = 'cmd:emit'
export const RUN: RunType = 'cmd:run'
export const FILTER: FilterType = 'cmd:filter'
export const UPDATE: UpdateType = 'cmd:update'
