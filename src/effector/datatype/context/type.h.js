//@flow

export type RunContextType = 'context:run'
export type EmitContextType = 'context:emit'
export type ComputeContextType = 'context:compute'
export type FilterContextType = 'context:filter'

export type ContextType =
 | RunContextType
 | EmitContextType
 | ComputeContextType
 | FilterContextType
