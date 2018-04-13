//@flow

export type Event = string

export type StateType<A> = {
 state: A,
 events: Set<Event>,
}

export class State<A> {
 state: A
 events: Set<Event>
 constructor(state: A, events: Set<Event>) {
  this.state = state
  this.events = events
 }
}
