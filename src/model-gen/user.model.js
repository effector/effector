// @flow

import {createStore, type Store} from 'effector'

// @generate
export type User = {
  // @id
  id: number,
  username: string,
}

// @generate
// export type Comment = {
// }
export const username: Store<Map<number, string>> = createStore(new Map());
export const id: Store<Map<number, number>> = createStore(new Map());

