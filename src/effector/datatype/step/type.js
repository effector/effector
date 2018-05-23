//@flow

export type SingleType = 'step:single'
export type MultiType = 'step:multi'
export type SeqType = 'step:seq'

export type StepType = SingleType | MultiType | SeqType

export const SINGLE: SingleType = 'step:single'
export const MULTI: MultiType = 'step:multi'
export const SEQ: SeqType = 'step:seq'
