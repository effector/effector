import { createGate } from './createGate'

const forIn = (obj: any, cb: (value: any, key: string) => void) => {
  for (const key in obj) {
    cb(obj[key], key)
  }
}

export const regate = (gates: any[]) => {
  const result: Record<string, any> = Array.isArray(gates) ? [] : {}
  forIn(gates, (gate, key) => {
    if (typeof gate === 'string') {
      result[key] = createGate(gate)
    }
    if (typeof gate === 'object') {
      const { [name]: defaultState } = gate;
      result[key] = createGate(name, defaultState)
    }
  })
  return result
}