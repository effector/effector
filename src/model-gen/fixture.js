// @flow

import {createStore, type Store} from 'effector'

// @generate
export type User = {|
  // @id
  id: number,
  username: string,
|}

// @generate
export type Comment = {|
  // @id
  id: number,
  user: User,
  text: string,
|}
