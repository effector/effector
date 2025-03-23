//@flow

import * as React from "react";
import {useUnit} from "effector-react";
import {formInput} from "../store";

export const FormInput = ({changeField}) => {
  const text = useUnit(formInput);

  return (
    <input
      type="text"
      className="input"
      onChange={(e) => changeField(e.currentTarget.value)}
      value={text}
    />
  );
};
