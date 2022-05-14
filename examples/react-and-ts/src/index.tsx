import * as React from "react";
import { render } from "react-dom";

import { Application } from "./app/application";

const rootElement = document.querySelector("#root");
render(<Application />, rootElement);
