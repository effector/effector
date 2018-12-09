//@flow

import * as React from "react";
import {createComponent} from "effector-react";
import {formInput} from "../store";

export const FormInput = createComponent(
  formInput,
  ({changeField}, text) => (
    <input
      type="text"
      className="input"
      onChange={e => changeField(e.currentTarget.value)}
      value={text}
    />
  )
);
