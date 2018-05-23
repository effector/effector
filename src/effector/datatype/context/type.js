//@flow

export type RunContextType = 'context:run'
export type EmitContextType = 'context:emit'
export type ComputeContextType = 'context:compute'
export type FilterContextType = 'context:filter'
export type UpdateContextType = 'context:update'

export type ContextType =
 | RunContextType
 | EmitContextType
 | ComputeContextType
 | FilterContextType
 | UpdateContextType

export const RUN: RunContextType = 'context:run'
export const EMIT: EmitContextType = 'context:emit'
export const COMPUTE: ComputeContextType = 'context:compute'
export const FILTER: FilterContextType = 'context:filter'
export const UPDATE: UpdateContextType = 'context:update'
