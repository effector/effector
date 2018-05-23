//@flow

import {atom, type Atom} from '../effector/atom'

import * as Step from 'effector/datatype/step'

export const seq: Atom<Step.Seq | null> = atom(null)
export const frame = (atom(null): Atom<Set<Step.Step> | null>)
