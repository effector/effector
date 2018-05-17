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
