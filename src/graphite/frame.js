//@flow

import {createRef, type Ref} from '../ref/createRef'

export const seq: Ref<'Step.Seq' | null> = createRef(null)
export const frame = (createRef(null): Ref<Set<'Step.Step'> | null>)
