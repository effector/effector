//@flow

import {type ID, counter} from '../id'

const nextID = counter()

export type Store = {
  dispatch: <T>(x: T) => T,
  getState: <S>() => S,
  subscribe: (listener: any) => (() => void),
  replaceReducer: <S>(nextReducer: (state: S, action: any) => S) => void,
}
export type Reference = {
  pull(): Store,
}

export class Mark {

}

export class Top extends Mark implements RedLink {
  id: ID = nextID()
  childs: RedLink[] = []
  value: any
  goUp() {
    throw new Error(`goUp from a Top`)
  }
  * goDown(): Iterable<RedLink> {
    yield* this.childs
  }
}

export class Bottom extends Mark implements RedLink {
  id: ID = nextID()
  value: any
  parent: RedLink
  goUp() {
    return this.parent
  }
  goDown() {
    throw new Error(`goDown from a Bottom`)
  }
}



export function isTop(val: mixed): boolean/*:: %checks*/ {
  return val instanceof Bottom
}

export interface RedLink {
  id: ID,
  value: any,
  goDown(): Iterable<RedLink>,
  goUp(): RedLink,
}

export type Walker = {
  path: ID[],
  first: ID,
  value: any,
  run(): Iterable<Walker>,
}

export function* walk(walker: Walker, tree: RedLink): Iterable<Walker> {
  if (tree instanceof Bottom)
    return
  for (const subtree of tree.goDown()) {
    const wi = {
      path: [...walker.path, subtree.id],
      first: walker.first,
      value: subtree.value,
      run() {
        return walk(wi, subtree)
      }
    }
    yield wi
  }
}



// const foo: Reference = null


// class Loc { }
// class Loc {
// }

// class Top extends Loc { }

// class
