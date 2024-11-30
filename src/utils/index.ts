import { ShowEpisode } from "./types";
import { TVMazeEpisode, TVMazeSeason } from "./types/tvmaze";

export const getSeasons = (showEpisodes: ShowEpisode[]) => {
    const seasonNumbers = showEpisodes.map(showEpisode => showEpisode.season_number);
    return [...new Set(seasonNumbers)];
};

export const validateTVMazeSeasons = (seasons: TVMazeSeason[]) => {
    return seasons.map((season, idx) => {
        if (season.number !== idx + 1) {
            season.number = idx + 1;
        }
        return season;
    });
};

export const validateTVMazeEpisodes = (episodes: TVMazeEpisode[]) => {
    const seasonNumbers = [...new Set(episodes.map(episode => episode.season))];
    
    const seasonMap = {};
    seasonNumbers.forEach((seasonNumber, idx) => {
        Object.assign(seasonMap, { [seasonNumber]: idx + 1 })
    });
    
    return episodes.map((episode, idx) => {
        if (episode.season !== seasonMap[episode.season]) {
            episode.season = seasonMap[episode.season];
        }
        return episode;
    });
};
