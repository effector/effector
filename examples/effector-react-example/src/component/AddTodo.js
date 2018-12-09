//@flow

import * as React from "react";
import {createComponent} from "effector-react";

import {formInput} from "../store";

/**
 * Takes text from formInput store
 * And addTodo event from react props
 */
export const AddTodo = createComponent(
  formInput,
  ({addTodo}, text) => (
    <input
      type="button"
      value="add todo"
      disabled={text.length === 0}
      onClick={() => addTodo(text)}
      className="add"
    />
  )
);
