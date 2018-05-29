//@flow

export type ComputeContextType = 21
export type EmitContextType = 22
export type RunContextType = 23
export type FilterContextType = 24
export type UpdateContextType = 25

export type ContextType =
 | ComputeContextType
 | EmitContextType
 | RunContextType
 | FilterContextType
 | UpdateContextType

export const COMPUTE: ComputeContextType = 21
export const EMIT: EmitContextType = 22
export const RUN: RunContextType = 23
export const FILTER: FilterContextType = 24
export const UPDATE: UpdateContextType = 25
