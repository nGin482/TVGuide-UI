import { createContext } from "react";

import { RecordedShowsContextModel } from "../utils";

export const RecordedShowsContext = createContext<RecordedShowsContextModel>(null);