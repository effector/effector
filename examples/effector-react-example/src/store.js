//@flow

import {createStore} from "effector";

export const formInput = createStore("");
export const todos = createStore([]);

export const amount = todos.map(todos => {
  switch (todos.length) {
    case 0:
      return "no items";
    case 1:
      return "one todo";
    case 2:
      return "two todo";
    default:
      return "todos amount: " + todos.length;
  }
});
