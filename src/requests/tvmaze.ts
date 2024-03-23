import axios, { AxiosResponse } from "axios";

import { ShowSearchResult } from "../utils/types/index";

const baseURL = 'https://api.tvmaze.com';

export const searchNewShow = async (searchTerm: string) => {
    const response = await axios.get<ShowSearchResult[]>(`${baseURL}/search/shows?q=${searchTerm}`);
    if (response.status === 200) {
        return response.data;
    }
};

