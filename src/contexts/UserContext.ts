import { createContext } from "react";

import { UserContextModel } from '../utils';

export const UserContext = createContext<UserContextModel>(null);