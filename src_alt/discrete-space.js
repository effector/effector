//@flow

import {option} from 'fp-ts'
type Indexed<Index, Value, Type = (i: Index) => Value>
  = Type

export class UniversalSpace<
  Index,
  Value,
> {
  defaults: (i: Index) => Value
  /*::#*/links: WeakMap<Index, Value> = new WeakMap()
  constructor<Type>(fn: Type) {
    this.defaults = /*::getter*/(fn)
  }
  get(i: Index): Value {
    const saved = this./*::#*/links.get(i)
    if (saved !== undefined) return saved
    const result = this.defaults(i)
    return result
  }
  set(i: Index, value: Value) {
    this./*::#*/links.set(i, value)
  }
}

export class DiscreteSpace<
  Index,
  Value,
> extends UniversalSpace<Index, Value> {
  get(i: Index): Value {
    const newSaved = super.get(i)
    super.set(i, newSaved)
    return newSaved
  }
}

// export class CartesianSpace<
//   X,
//   Y,
//   Value,
// > extends UniversalSpace<[X, Y], Value> {
//   get([x, y]: [X, Y]): Value {

//   }
// }

export class OptionSpace<
  Index,
  Value,
> extends UniversalSpace<Index, option.Option<Value>> {
  constructor() {
    super(value => {
      if (value === undefined) {
        return option.none
      }
      return option.some(value)
    })
  }
}

/**
 * By definition of Indexed type, it is a function
 *
 *     x => x
 *
 * @template Index
 * @template Value
 * @template Type
 * @param {Indexed<Index, Value, Type>} indexed
 * @returns {(i: Index) => Value}
 */
declare function getter<Index, Value, Type>(
  indexed: Indexed<Index, Value, Type>
): (i: Index) => Value
