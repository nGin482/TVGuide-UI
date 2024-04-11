import { createContext } from "react";

import { ErrorsContextModel } from "../utils/types";

export const ErrorsContext = createContext<ErrorsContextModel>(null);