//@flow

import * as React from "react";

export const ClearButton = ({
  resetField,
}: {
  resetField: () => mixed,
}) => (
  <input
    type="button"
    value="clear input"
    className="clear"
    onClick={() => resetField()}
  />
);
