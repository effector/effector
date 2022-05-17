import { Gate } from "../index.h";
import { createEvent, createStore, Domain, launch } from "effector";
import { onCleanup, onMount, createEffect } from "solid-js";

export function useGate<Props>(
  GateComponent: Gate<Props>,
  props: Props = {} as any,
) {
  onMount(() => {
    GateComponent.open(props);

    onCleanup(() => GateComponent.close(props))
  });

  createEffect(() => {
    // read every getter in props to subscribe
    for (const _ of Object.values(props)) {}
    GateComponent.set(props)
  })
}

export function createGateImplementation<State>({
  name = 'gate',
  domain,
  defaultState,
  hook: useGateHook,
}: {
  name?: string
  domain?: Domain
  defaultState: State | {}
  hook: typeof useGate
}): Gate<State> {
  const fullName = `${domain ? `${domain.compositeName.fullName}/` : ''}${name}`
  const set = createEvent<State>(`${fullName}.set`)
  const open = createEvent<State>(`${fullName}.open`)
  const close = createEvent<State>(`${fullName}.close`)
  const status = createStore(Boolean(false), {
    name: `${fullName}.status`,
  })
    .on(open, () => Boolean(true))
    .on(close, () => Boolean(false))
  const state = createStore(defaultState as State, {
    name: `${fullName}.state`,
  })
    .on(set, (_, state) => Object.create(
      Object.getPrototypeOf(state),
      Object.getOwnPropertyDescriptors(state)
    ))
    .reset(close)
  if (domain) {
    const {hooks} = domain as any
    launch({
      target: [
        hooks.store,
        hooks.store,
        hooks.event,
        hooks.event,
        hooks.event,
      ] as any,
      params: [status, state, open, close, set],
    })
  }
  function GateComponent(props: State) {
    useGateHook(GateComponent as any, props)
    return null
  }
  GateComponent.open = open
  GateComponent.close = close
  GateComponent.status = status
  GateComponent.state = state
  GateComponent.set = set
  GateComponent.displayName = `Gate:${fullName}`;

  return GateComponent;
}

export function createGate<Props>(
  name: string = 'gate',
  defaultState: Props = {} as any,
): Gate<Props> {
  let domain
  if (typeof name === 'object' && name !== null) {
    if ('defaultState' in name) {
      //@ts-ignore
      defaultState = name.defaultState
    }
    //@ts-ignore
    if (name.domain) domain = name.domain
    //@ts-ignore
    name = name.name
  }
  return createGateImplementation({
    name,
    domain,
    defaultState,
    hook: useGate,
  })
}