import {Scope} from 'effector'
export function renderStatic(fn: () => void): Promise<string>
export function renderStatic(config: {
  scope?: Scope
  fn: () => void
}): Promise<string>
