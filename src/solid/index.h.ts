import type { Event, Store } from "effector";
import type { Component } from "solid-js";

export type Gate<Props = {}> = Component<Props> & {
  open: Event<Props>
  close: Event<Props>
  status: Store<boolean>
  state: Store<Props>
  set: Event<Props>
}