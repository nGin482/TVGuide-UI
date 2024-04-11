import { createContext } from "react";

import { SearchListContextModel } from "../utils/types";

export const SearchListContext = createContext<SearchListContextModel>(null);