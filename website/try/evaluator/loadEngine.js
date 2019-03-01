//@flow

import fetch from 'cross-fetch'

let cache
export async function loadEngine() {
  if (!cache) {
    const req = await fetch('https://unpkg.com/effector@0.18.2/effector.umd.js')
    const text = await req.text()
    cache = Function('exports', 'module', text)
  }
  const engine = {}
  cache.call(engine, engine, engine)
  return engine
}
