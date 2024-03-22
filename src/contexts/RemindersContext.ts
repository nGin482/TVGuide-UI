import { createContext } from "react";

import { RemindersContextModel } from "../utils";

export const RemindersContext = createContext<RemindersContextModel>(null);