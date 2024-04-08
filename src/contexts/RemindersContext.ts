import { createContext } from "react";

import { RemindersContextModel } from "../utils/types";

export const RemindersContext = createContext<RemindersContextModel>(null);