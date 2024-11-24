import axios from "axios";

import { validateTVMazeSeasons } from "../utils";
import { TVMazeSeason, TVMazeShow } from "../utils/types/tvmaze";

const baseURL = 'https://api.tvmaze.com';

export const searchNewShow = async (searchTerm: string) => {
    const response = await axios.get<TVMazeShow[]>(`${baseURL}/search/shows?q=${searchTerm}`);
    if (response.status === 200) {
        return response.data;
    }
};
export const getShowSeasons = async (tvMazeId: number | string) => {
    const response = await axios.get<TVMazeSeason[]>(`${baseURL}/shows/${tvMazeId}/seasons`);
    if (response.status === 200) {
        const seasons = validateTVMazeSeasons(response.data);
        return seasons;
    }
};
