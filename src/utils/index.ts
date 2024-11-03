import { SeasonSearch, ShowEpisode } from "./types/index";

export const getSeasons = (showEpisodes: ShowEpisode[]) => {
    const seasonNumbers = showEpisodes.map(showEpisode => showEpisode.season_number);
    return [...new Set(seasonNumbers)];
};

export const validateTVMazeSeasons = (seasons: SeasonSearch[]) => {
    return seasons.map((season, idx) => {
        if (season.number !== idx + 1) {
            season.number = idx + 1;
        }
        return season
    });
};
