//@flow

import * as React from "react";

import {useUnit} from "effector-react";
import {formInput} from "../store";

export const Form = ({children, addTodo}) => {
  const text = useUnit(formInput);

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (text.length > 0) addTodo(text);
      }}>
      {children}
    </form>
  );
};
