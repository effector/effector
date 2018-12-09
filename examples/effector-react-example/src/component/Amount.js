//@flow

import * as React from "react";
import {createComponent} from "effector-react";

import {amount} from "../store";

export const Amount = createComponent(
  amount,
  (_, amount) => (
    <p className="amount">{amount}</p>
  )
);
