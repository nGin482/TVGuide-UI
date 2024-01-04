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

interface Reminder {
    show: string
    reminder_alert: string
    warning_time: number
    occasions: string
};

interface SearchItem {
    show: string
    image: string
    conditions: {
        minimum: number
        maximum: number
        exclude_titles: string[]
    }
    searchActive: boolean
};

interface User {
    user: string
    searchList: string[]
    reminders: string[]
    role: string
};

interface CurrentUser extends User {
    token: string
}

interface UserContextModel {
    currentUser: CurrentUser
    setUser: React.Dispatch<React.SetStateAction<CurrentUser>>
};

interface ResponseData {
    result: 'success'
    message: string
};

interface LoginResponse {
    result: 'success'
    message: CurrentUser
}

interface ErrorResponse {
    result: 'error'
    status: number
    statusText: string
    payload: {
        message: string
    }
};

export type {
    Guide,
    GuideShow,
    RecordedShowModel,
    Reminder,
    SearchItem,
    ResponseData,
    ErrorResponse,
    LoginResponse,
    User,
    UserContextModel,
    CurrentUser
};