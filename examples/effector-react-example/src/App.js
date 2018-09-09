//@flow

import * as React from "react";

import {formInput, todos} from "./store";
import {changeField, resetField, addTodo, deleteTodo} from "./event";

import {TodoList} from "./component/TodoList";
import {Form} from "./component/Form";
import {FormInput} from "./component/FormInput";
import {AddTodo} from "./component/AddTodo";
import {Amount} from "./component/Amount";
import {ClearButton} from "./component/ClearButton";
import {Credits} from "./component/Credits";

export const App = () => (
  <React.Fragment>
    <Form addTodo={addTodo}>
      <FormInput changeField={changeField} />
      <ClearButton resetField={resetField} />
      <AddTodo addTodo={addTodo} />
      <Amount />
    </Form>
    <TodoList deleteTodo={deleteTodo} />
    <Credits />
  </React.Fragment>
);

formInput
  .on(changeField, (state, payload) => payload)
  .reset(resetField)
  .reset(addTodo);

todos
  .on(addTodo, (state, todo) => [...state, todo])
  .on(deleteTodo, (state, index) =>
    state.filter((_, i) => i !== index)
  );
