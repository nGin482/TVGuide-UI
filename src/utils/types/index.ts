import type { AxiosResponse } from "axios";

export type { TVMazeSeason, TVMazeShow } from "./tvmaze";

interface Guide {
    fta: GuideShow[]
    bbc: GuideShow[]
};

interface GuideShow {
    title: string
    start_time: string
    end_time: string
    channel: string
    season_number: string
    episode_number: number
    episode_title: string
    repeat: boolean
    event: string
};

export interface ShowData {
    show_name: string
    show_details: ShowDetails
    show_episodes: ShowEpisode[]
    search_item: SearchItem
    reminder: Reminder
}
export interface ShowDetails {
    title: string
    description: string
    tvmaze_id: string
    genres: string[]
    image: string
}

export interface ShowEpisode {
    id: number
    show: string
    season_number: number
    episode_number: number
    episode_title: string
    summary: string
    alternative_titles: string[]
    channels: string[]
    air_dates: Date[]
}

interface RecordedShowModel {
    show: string
    seasons: Season[]
    tvmaze_id: string
};

interface Season {
    season_number: string | number
    episodes: Episode[]
};

interface Episode {
    episode_number: number
    episode_title: string
    alternative_titles: string[]
    summary: string
    channels: string[]
    air_dates: string[]
};

interface Reminder {
    show: string
    alert: 'Before' | 'During' | 'After'
    warning_time: number
    occasions: 'All' | 'Latest'
};

interface SearchItem {
    show: string
    exact_title_match: boolean
    search_active: boolean
    conditions: {
        ignore_episodes: string[]
        ignore_seasons: number[]
        ignore_titles: string[]
        min_season_number: number
        max_season_number: number
    }
};

interface SearchItemPayload {
    show: string
    conditions: Partial<SearchItem['conditions']> & {
        exact_title_match: boolean
    }
}

interface SearchItemFormValues {
    searchTerm: string
    exactSearch: boolean
    seasons: number[]
    seasonChoice: "all" | "some"
    ignoreEpisodes: string[]
}

interface ReminderFormValues extends Partial<Reminder> {}

interface User {
    username: string
    show_subscriptions: string[]
    reminder_subscriptions: string[]
    role: 'Standard' | 'Admin'
};

interface CurrentUser extends User {
    token: string
};

interface UserContextModel {
    currentUser: CurrentUser
    setUser: React.Dispatch<React.SetStateAction<CurrentUser>>
};

interface BaseResponse {
    message: string
};

interface NewShowPayload {
    name: string,
    conditions: Partial<SearchItem['conditions']> & {
        exact_title_match: boolean
    }
}

interface SuccessResponse<Type> {
    result: 'success'
    payload: Type
};
interface ErrorResponse extends AxiosResponse {
    data: {
        message?: string
        msg?: "Token has expired"
    }
}

interface AddReminderResponse extends BaseResponse {
    result: 'success'
    reminders: Reminder[]
};

interface SearchItemResponses {
    message: string
    searchList: SearchItem[]
};

interface FailedResponse extends BaseResponse {
    result: 'error'
    status: number
    statusText: string
    msg?: string
};

interface NewUserDetails {
    username: string
    password: string
    show_subscriptions: string[]
    reminder_subscriptions: string[]
};

interface SubscriptionsPayload {
    show_subscriptions?: string[],
    action: SubscriptionsAction
};

export type SubscriptionsAction = "subscribe" | "unsubscribe";

interface UserResponses<Type> {
    message: string
    user: Type
};

type FormMode = "add" | "edit";


// Contexts
interface RecordedShowsContextModel {
    shows: ShowData[]
    setShows: React.Dispatch<React.SetStateAction<ShowData[]>>
};

interface RemindersContextModel {
    reminders: Reminder[]
    setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>
};

interface SearchListContextModel {
    searchList: SearchItem[]
    setSearchList: React.Dispatch<React.SetStateAction<SearchItem[]>>
};

interface ErrorsContextModel {
    errors: string[]
    setErrors: React.Dispatch<React.SetStateAction<string[]>>
};

export type {
    Guide,
    GuideShow,
    RecordedShowModel,
    Episode,
    Reminder,
    SearchItem,
    User,
    UserContextModel,
    CurrentUser,
    AddReminderResponse,
    SubscriptionsPayload,
    NewShowPayload,
    SearchItemPayload,
    SearchItemFormValues,
    ReminderFormValues,
    SuccessResponse,
    FailedResponse,
    ErrorResponse,
    UserResponses,
    SearchItemResponses,
    NewUserDetails,
    FormMode,
    RecordedShowsContextModel,
    RemindersContextModel,
    SearchListContextModel,
    ErrorsContextModel
};