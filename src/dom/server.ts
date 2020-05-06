import {render, createEnv} from './customDocument'
import {using} from 'effector-dom'

export function renderStatic(fn: () => void) {
  const env = createEnv()
  const root = env.document.createDocumentFragment() as any
  return new Promise<string>(rs => {
    using(root, {
      fn,
      env,
      onComplete() {
        rs(render(root))
      },
    })
  })
}
