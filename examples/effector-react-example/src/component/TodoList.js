//@flow

import * as React from "react";
import {createComponent} from "effector-react";

import {todos} from "../store";
import {TodoItem} from "./TodoItem";

export const TodoList = createComponent(
  todos,
  ({deleteTodo}, list) => (
    <ul className="list">
      {list.map((todo, itemIndex) => (
        <TodoItem
          description={todo}
          key={itemIndex}
          id={itemIndex}
          deleteTodo={deleteTodo}
        />
      ))}
    </ul>
  )
);
