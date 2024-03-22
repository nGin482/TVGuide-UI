import { createContext } from "react";

import { SearchListContextModel } from "../utils";

export const SearchListContext = createContext<SearchListContextModel>(null);