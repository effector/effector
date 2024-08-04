//@flow

import * as React from "react";
import {useUnit} from "effector-react";

import {amount} from "../store";

export const Amount = () => (
  <p className="amount">{useUnit(amount)}</p>
);
