import type {Scope} from '../../effector/unit.h'
import {render, createEnv} from './customDocument'
import {using} from 'forest'

export function renderStatic(fn: () => void): Promise<string>
export function renderStatic(config: {
  scope?: Scope
  fn: () => void
}): Promise<string>
export function renderStatic(fn: any) {
  const env = createEnv()
  const root = env.document.createDocumentFragment() as any
  let scope: Scope
  if (typeof fn === 'object' && fn !== null) {
    scope = fn.scope
    fn = fn.fn
  }
  return new Promise<string>(rs => {
    //@ts-expect-error
    using(root, {
      fn,
      env,
      scope,
      onComplete() {
        rs(render(root))
      },
    })
  })
}
