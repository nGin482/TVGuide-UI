interface Guide {
    FTA: GuideShow[]
    BBC: GuideShow[]
    [x: string]: GuideShow[]
};

interface GuideShow {
    title: string
    time: string
    channel: string
    season_number: string
    episode_number: number
    episode_title: string
    repeat: boolean
    event: string
};

interface RecordedShowModel {
    show: string
    seasons: Season[]
    tvmaze_id: string
};

interface Season {
    season_number: number
    episodes: Episode[]
};

interface Episode {
    episode_number: number
    episode_title: string
    alternative_titles: string
    summary: string
    channels: string[]
    air_dates: string[]
};

export type {
    Guide,
    GuideShow,
    RecordedShowModel
};