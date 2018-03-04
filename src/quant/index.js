//@flow

export class Quant<T> {
  /*::+*/ value: T
  constructor(value: T) {
    this.value = value
  }
  map<V>(fn: (x: T) => V): Quant<V> {
    const val = fn(this.value)
    return new Quant(val)
  }
}
