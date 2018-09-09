//@flow

import * as React from "react";

import {createComponent} from "effector-react";
import {formInput} from "../store";

export const Form = createComponent(
  formInput,
  ({children, addTodo}, text) => (
    <form
      className="form"
      onSubmit={e => {
        e.preventDefault();
        if (text.length > 0) addTodo(text);
      }}>
      {children}
    </form>
  )
);
