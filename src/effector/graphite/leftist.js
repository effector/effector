//@flow

export class Leftist<A> {
  left: leftist<A>
  right: leftist<A>
  value: A
  rank: number
  constructor(value: A, rank: number, left: leftist<A>, right: leftist<A>) {
    this.value = value
    this.rank = rank
    this.left = left
    this.right = right
  }
}
export type leftist<A> = null | Leftist<A>

export function singleton<A>(k: A): leftist<A> {
  return new Leftist(k, 1, null, null)
}

export function rank<A>(tree: leftist<A>): number {
  if (tree) {
    return tree.rank
  } else {
    return 0
  }
}

export function merge<A>(
  _t1: leftist<A>,
  _t2: leftist<A>,
  comparator: (A, A) => boolean,
): leftist<A> {
  while (true) {
    const t2 = _t2
    const t1 = _t1
    if (t1) {
      if (t2) {
        const k1 = t1.value
        const l = t1.left
        if (comparator(k1, t2.value)) {
          _t2 = t1
          _t1 = t2
          continue
        }
        const merged = merge(t1.right, t2, comparator)
        const rank_left = rank(l)
        const rank_right = rank(merged)
        if (rank_left >= rank_right) {
          return new Leftist(k1, rank_right + 1, l, merged)
        }
        return new Leftist(k1, rank_left + 1, merged, l)
      }
      return t1
    }
    return t2
  }
  /*::return _t1*/
}

export function insert<A>(
  x: A,
  t: leftist<A>,
  comparator: (A, A) => boolean,
): leftist<A> {
  return merge(singleton(x), t, comparator)
}

export function get_min<A>(param: leftist<A>): A | void {
  if (param) {
    return param.value
  }
}

export function delete_min<A>(
  param: leftist<A>,
  comparator: (A, A) => boolean,
): [A, leftist<A>] {
  if (param) {
    return [param.value, merge(param.left, param.right, comparator)]
  }
  throw Error('Failure: empty')
}

export function iterate<A>(
  tree: leftist<A>,
  comparator: (A, A) => boolean,
): Array<A> {
  const results = []
  while (tree) {
    const extracted = delete_min(tree, comparator)
    results.push(extracted[0])
    tree = extracted[1]
  }
  return results
}
