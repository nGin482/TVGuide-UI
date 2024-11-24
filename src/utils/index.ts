import { ShowEpisode } from "./types";
import { TVMazeSeason } from "./types/tvmaze";

export const getSeasons = (showEpisodes: ShowEpisode[]) => {
    const seasonNumbers = showEpisodes.map(showEpisode => showEpisode.season_number);
    return [...new Set(seasonNumbers)];
};

export const validateTVMazeSeasons = (seasons: TVMazeSeason[]) => {
    return seasons.map((season, idx) => {
        if (season.number !== idx + 1) {
            season.number = idx + 1;
        }
        return season
    });
};
