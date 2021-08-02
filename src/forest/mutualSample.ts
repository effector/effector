import {Store, Event, sample} from 'effector'

export function mutualSample<Mount, State, T>({
  mount,
  state,
  onMount,
  onState,
}: {
  mount: Event<Mount>
  state: Store<State>
  onMount: (state: State, mount: Mount) => T
  onState: (mount: Mount, state: State) => T
}): {
  onMount: Event<T>
  onState: Event<T>
} {
  return {
    onMount: sample({
      source: state,
      clock: mount,
      fn: onMount,
      greedy: true,
    }),
    onState: sample({
      source: mount,
      clock: state,
      fn: onState,
      greedy: true,
    }),
  }
}
