import { createContext } from "react";

import { ErrorsContextModel } from "../utils";

export const ErrorsContext = createContext<ErrorsContextModel>(null);