export interface ShowSearchResult {
    score: number
    show: {
        id: number
        name: string
        image: {
            medium: string
            original: string
        }
        status: string
        premiered: string
        summary: string
    }
};

export interface SeasonSearch {
    id: number
    url: string
    number: number
    episodeOrder: number
};