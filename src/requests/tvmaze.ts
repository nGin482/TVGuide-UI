import axios from "axios";

import { validateTVMazeSeasons } from "../utils";
import { ShowSearchResult, SeasonSearch } from "../utils/types/index";

const baseURL = 'https://api.tvmaze.com';

export const searchNewShow = async (searchTerm: string) => {
    const response = await axios.get<ShowSearchResult[]>(`${baseURL}/search/shows?q=${searchTerm}`);
    if (response.status === 200) {
        return response.data;
    }
};
export const getShowSeasons = async (tvMazeId: number) => {
    const response = await axios.get<SeasonSearch[]>(`${baseURL}/shows/${tvMazeId}/seasons`);
    if (response.status === 200) {
        const seasons = validateTVMazeSeasons(response.data);
        return seasons;
    }
}
