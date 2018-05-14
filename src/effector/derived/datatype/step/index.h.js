//@flow

import type {Cmd} from '../cmd'

import type {SingleType, MultiType, SeqType} from './type.h'

export type Single = {
 +type: SingleType,
 +data: Cmd,
}

export type Multi = {
 +type: MultiType,
 +data: Set<Step>,
}

export type Seq = {
 +type: SeqType,
 +data: Array<Step>,
}

export type Step = Single | Multi | Seq
