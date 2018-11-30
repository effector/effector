//@flow

export opaque type Time = number

export function now(): Time {
  return Date.now()
}

export function since(time: Time = Date.now()): () => Time {
  return () => Date.now() - time
}

export function compare(a: Time, b: Time): -1 | 0 | 1 {
  if (a === b) return 0
  if (a > b) return 1
  return -1
}

export function delta(first: Time, next: Time): Time {
  if (first > next) return first - next
  return next - first
}
