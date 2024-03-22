import {
    CurrentUser,
    FailedResponse,
    Guide,
    NewUserDetails,
    RecordedShowModel,
    Reminder,
    SearchItem,
    SearchItemResponses,
    User,
    UserResponses
} from "../../utils";


export const guide: Guide = {
    FTA: [
        {
            title: 'Doctor Who',
            time: '22:35',
            channel: 'ABC2',
            season_number: '6',
            episode_number: 1,
            episode_title: 'The Impossible Astronaut',
            repeat: false,
            event: 'Doctor Who has aired today'
        }
    ],
    BBC: [

    ]
};

export const searchList: SearchItem[] = [
    {
        show: 'Doctor Who',
        image: 'http://image_url.com/doctor-who',
        conditions: {

        },
        searchActive: true
    },
    {
        show: 'Endeavour',
        image: 'http://image_url.com/endeavour',
        conditions: {

        },
        searchActive: true
    }
];

export const addSearchItem: SearchItem = {
    show: 'Maigret',
    image: 'https://image_url.com/maigret',
    conditions: {

    },
    searchActive: true
};

export const addSearchItemResponse: SearchItemResponses = {
    message: 'Maigret was added to the Search List',
    searchList: [...searchList, addSearchItem]
};

export const failedSearchItemResponse: FailedResponse = {
    result: 'error',
    status: 400,
    statusText: 'Bad Request',
    message: 'Maigret already exists'
};

export const recordedShows: RecordedShowModel[] = [
    {
        show: 'Doctor Who',
        seasons: [
            {
                season_number: '1',
                episodes: [
                    {
                        episode_number: 1,
                        episode_title: 'Rose',
                        alternative_titles: [],
                        summary: '',
                        channels: ['ABC1', 'ABCHD'],
                        air_dates: ['01/01/2024']
                    },
                    {
                        episode_number: 2,
                        episode_title: 'The End of the World',
                        alternative_titles: [],
                        summary: '',
                        channels: ['ABC1', 'ABCHD'],
                        air_dates: ['08/01/2024']
                    }
                ]
            }
        ],
        tvmaze_id: '1234'
    },
    {
        show: 'Maigret',
        seasons: [
            {
                season_number: '1',
                episodes: [
                    {
                        episode_number: 1,
                        episode_title: 'Maigret Sets A Trap',
                        alternative_titles: [],
                        summary: '',
                        channels: ['ABC1', 'ABCHD'],
                        air_dates: ['01/01/2024']
                    },
                    {
                        episode_number: 2,
                        episode_title: "Maigret's Dead Man",
                        alternative_titles: [],
                        summary: '',
                        channels: ['ABC1', 'ABCHD'],
                        air_dates: ['08/01/2024']
                    }
                ]
            }
        ],
        tvmaze_id: '1234'
    }
];

export const reminders: Reminder[] = [
    {
        show: 'Doctor Who',
        warning_time: 5,
        reminder_alert: 'Before',
        occasions: 'All'
    },
    {
        show: 'Maigret',
        warning_time: 3,
        reminder_alert: 'Before',
        occasions: 'All'
    }
];

export const user: User = {
    username: 'Test',
    show_subscriptions: [
        'Maigret',
        'Doctor Who',
        'Endeavour'
    ],
    reminder_subscriptions: [
        'Maigret',
        'Endeavour'
    ],
    role: 'Standard'
};

export const newUser: NewUserDetails = {
    username: 'Random',
    password: 'test-password',
    show_subscriptions: [],
    reminder_subscriptions: []
};

export const newUserRes: UserResponses<CurrentUser> = {
    message: 'Your account has been created',
    user: {
        username: 'Random',
        show_subscriptions: [],
        reminder_subscriptions: [],
        role: 'Standard',
        token: 'token-test'
    }
};

export const updateSubscriptionsRes: UserResponses<CurrentUser> = {
    message: 'Your subscriptions have been updated',
    user: {
        username: 'Random',
        show_subscriptions: ['Maigret', 'Endeavour', 'Doctor Who', 'Vera'],
        reminder_subscriptions: [],
        role: 'Standard',
        token: 'token-test'
    }
};

export const loginRes: UserResponses<CurrentUser> = {
    message: 'You have successfully logged in',
    user: {
        username: 'Test',
        show_subscriptions: [],
        reminder_subscriptions: [],
        role: 'Standard',
        token: 'token-test'
    }
};