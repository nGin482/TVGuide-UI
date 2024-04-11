import { createContext } from "react";

import { RecordedShowsContextModel } from "../utils/types";

export const RecordedShowsContext = createContext<RecordedShowsContextModel>(null);