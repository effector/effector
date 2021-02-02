export function forIn<Obj extends Record<string, unknown>>(
  value: Obj,
  fn: <K extends keyof Obj>(value: Obj[K], key: K, obj: Obj) => any,
) {
  for (const key in value) {
    const fnResult = fn(value[key], key, value)
    if (fnResult !== undefined) return fnResult
  }
}
