//@flow

export class UniqGuard</*::-*/T/*:::Object*/> {
  /*::#*/cache: WeakSet<T> = new WeakSet
  has(value: T) {
    return this./*::#*/cache.has(value)
  }
  add(value: T) {
    this./*::#*/cache.add(value)
  }
  isUniq(value: T) {
    const has = this.has(value)
    if (!has) {
      this.add(value)
    }
    return !has
  }
}
