//@flow

declare export class Signal {
  recompute(): boolean,
  propagate(): void,
  activating(): void,
  activated(): void,
  deactivating(): void,
  deactivated(): void,
}
