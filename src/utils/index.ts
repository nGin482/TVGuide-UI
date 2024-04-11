import { SeasonSearch } from "./types/index";

export const validateTVMazeSeasons = (seasons: SeasonSearch[]) => {
    return seasons.map((season, idx) => {
        if (season.number !== idx + 1) {
            season.number = idx + 1;
        }
        return season
    });
};
