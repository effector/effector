//@flow

import {lift, type FQuant} from './fquant'

// export type

export function createCreateEvent<P, M>(params: {
  type: string,
  payload: P,
  meta: M,
}): {
  type: string,
  payload: P,
  meta: M,
} {
  return {
    type: params.type,
    payload: params.payload,
    meta: params.meta,
  }
}

/*::export opaque*/
type EventQuant<P, M> = FQuant
export function createEventQuant<P, M>(): EventQuant<P, M> {
  return lift(createCreateEvent)
}

export function createEvent<P, M>(
	quant: EventQuant<P, M>
) {
	return quant.map(
		(type: string) => (params: { payload: P, meta: M }) =>
	)
}
