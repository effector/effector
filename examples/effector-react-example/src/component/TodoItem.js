//@flow

import * as React from "react";

export const TodoItem = ({
  deleteTodo,
  id,
  description,
}: {
  deleteTodo: (id: number) => mixed,
  id: number,
  description: React.Node,
}) => (
  <li className="item" onClick={() => deleteTodo(id)}>
    {description}
  </li>
);
