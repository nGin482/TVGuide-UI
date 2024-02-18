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
    username: string
    show_subscriptions: string[]
    reminder_subscriptions: string[]
    role: string
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

interface SuccessResponse<Type> {
    result: 'success'
    payload: Type
};

interface AddReminderResponse extends BaseResponse {
    result: 'success'
    reminders: Reminder[]
};

interface SearchItemResponses {
    message: string
    searchList: SearchItem[]
};

interface ErrorResponse {
    message: string
    msg?: 'Token has expired'
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
    reminder_subscriptions?: string[]
};

interface UserResponses<Type> {
    message: string
    user: Type
};


// Contexts
interface RecordedShowsContextModel {
    recordedShows: RecordedShowModel[]
    setRecordedShows: React.Dispatch<React.SetStateAction<RecordedShowModel[]>>
};

interface RemindersContextModel {
    reminders: Reminder[]
    setReminders: React.Dispatch<React.SetStateAction<Reminder[]>>
};

interface SearchListContextModel {
    searchList: SearchItem[]
    setSearchList: React.Dispatch<React.SetStateAction<SearchItem[]>>
};

export type {
    Guide,
    GuideShow,
    RecordedShowModel,
    Reminder,
    SearchItem,
    User,
    UserContextModel,
    CurrentUser,
    AddReminderResponse,
    SubscriptionsPayload,
    SuccessResponse,
    FailedResponse,
    ErrorResponse,
    UserResponses,
    SearchItemResponses,
    NewUserDetails,
    RecordedShowsContextModel,
    RemindersContextModel,
    SearchListContextModel
};