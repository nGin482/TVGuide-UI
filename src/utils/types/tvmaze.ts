export interface ShowSearchResult {
    score: number
    show: {
        id: string
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