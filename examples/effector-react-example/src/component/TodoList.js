//@flow

import * as React from "react";
import {useUnit} from "effector-react";

import {todos} from "../store";
import {TodoItem} from "./TodoItem";

export const TodoList = ({deleteTodo}) => {
  const list = useUnit(todos);

  return (
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
  );
};
