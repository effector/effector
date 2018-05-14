
import * as React from 'react'
import {Store} from 'effector'

export type StoreConsumer<State> = React.ComponentType<{
 children: (state: State) => React.ReactNode,
}>

export type StoreProvider<State> = React.ComponentType<{
 value: State,
 children?: React.ReactNode,
}>

export function connect<State extends Object, Com extends React.ComponentType<any>>(
 Component: Com,
): (
 store: Store<State>,
) => React.ComponentType<State>

export function createStoreConsumer<State>(
 store: Store<State>,
): StoreConsumer<State>

export function unstable_createStoreProvider<State>(
 store: Store<State>
): StoreProvider<State>

export function createReactState<
 State extends Object,
 Com extends React.ComponentType<any>,
>(
 store: Store<State>,
 Component: Com,
): React.ComponentType<State>
