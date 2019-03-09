//@flow

import type {TypeDef} from './typedef'

export type Graph = {
  +next: TypeDef<'multi', 'step'>,
  +seq: TypeDef<'seq', 'step'>,
}
