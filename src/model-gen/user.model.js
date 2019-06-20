// @flow

import {createStore, type Store} from 'effector'

// @generate
export type User = {|
  // @id
  id: number,
  username: string,
|}

export const getUserId = (user: User) => user.id;
export const user: Store<User | null> = createStore(null);
export const userList: Store<User[]> = createStore([]);
export const userUsername: Store<Map<number, string>> = createStore(new Map());
export const userId: Store<Map<number, number>> = createStore(new Map());

// @generate
export type Comment = {|
  // @id
  id: number,
  user: User,
  text: string,
|}
export const getCommentId = (comment: Comment) => comment.id;
export const comment: Store<Comment | null> = createStore(null);
export const commentList: Store<Comment[]> = createStore([]);
export const commentText: Store<Map<number, string>> = createStore(new Map());
export const commentUser: Store<Map<number, User>> = createStore(new Map());
export const commentId: Store<Map<number, number>> = createStore(new Map());

