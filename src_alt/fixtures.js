//@flow


export function assignInstance<A/*:::Object*/, B/*:::Object*/>(
  val: any,
  that: A,
): A {
  Object.setPrototypeOf(val, that)
  return val
}

export function isAct(value: mixed): boolean %checks {
  return (
    typeof value === 'object'
    && value != null
    && typeof value.type === 'string'
  )
}

export class UniqGuard</*::-*/T/*:::Object*/> {
  /*::#*/cache: WeakSet<T> = new WeakSet
  has(value: T) {
    return this./*::#*/cache.has(value)
  }
  add(value: T) {
    this./*::#*/cache.add(value)
  }
  check(value: T) {
    const has = this.has(value)
    if (!has) {
      this.add(value)
    }
    return has
  }
}
