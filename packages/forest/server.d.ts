import {Fork} from 'effector'
export function renderStatic(fn: () => void): Promise<string>
export function renderStatic(config: {
  scope?: Fork
  fn: () => void
}): Promise<string>
