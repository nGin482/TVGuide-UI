import axios, { AxiosResponse } from "axios";

import { deleteRequest, getRequest, postRequest, putRequest } from "./api-client";
import {
    Guide,
    RecordedShowModel,
    Reminder,
    User,
    CurrentUser,
    ErrorResponse,
    FailedResponse,
    SuccessResponse,
    UserResponses,
    SearchItemResponses,
    NewUserDetails,
    NewShowPayload,
    ShowData,
    SearchItemPayload,
    SearchItem,
    ReminderFormValues,
    ShowEpisode,
    AccountDetailsFormValues,
} from "../utils/types";

const baseURL = process.env.VITE_BASE_URL;


const headers = (token: string) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };
};

const getGuide = async () => {
    return await getRequest<Guide>(`/guide?date=10/08/2024`);
};

export const getShows = () => {
    return getRequest<ShowData[]>("/shows");
}
const addNewShow = async (newShowData: NewShowPayload, token: string): Promise<ShowData> => {
    const newShowDetails = await postRequest<NewShowPayload, ShowData>(
        "/shows",
        newShowData,
        { Authorization: `Bearer ${token}` }
    );
    return newShowDetails;
};
const removeShowFromList = async (showToRemove: string, token: string) => {
    try {
        const response: AxiosResponse<SearchItemResponses> = await axios.delete(`${baseURL}/show-list/${showToRemove}`, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<SearchItemResponses>;
    }
    catch(error) {
        if (error?.response) {
            const response: ErrorResponse = error.response;
            const result: FailedResponse = {
                result: 'error',
                status: response.status,
                statusText: response.statusText,
                message: response.data?.message,
                msg: response.data?.msg
            };
            return result;
        }
    }
};

export const addSearchCriteria = async (searchCriteria: SearchItemPayload, token: string) => {
    const newSearchItem = await postRequest<SearchItemPayload, SearchItem>(
        `/search-item`,
        searchCriteria,
        { Authorization: `Bearer ${token}` }
    );
    return newSearchItem;
};

export const editSearchCriteria = async (searchCriteria: SearchItemPayload, token: string) => {
    const updatedSearchItem = await putRequest<SearchItemPayload, SearchItem>(
        `/search-item/${searchCriteria.show}`,
        searchCriteria,
        { Authorization: `Bearer ${token}` }
    );
    return updatedSearchItem;
};

export const deleteSearchCriteria = async (show: string, token: string) => {
    await deleteRequest(`/search-item/${show}`, { Authorization: `Bearer ${token}` });
};

const getRecordedShow = (show: string) => {
    return axios.get<RecordedShowModel>(`${baseURL}/recorded-shows/${show}`).then((response) => response.data);
};

const getReminders = async () => {
    return await axios.get<Reminder[]>(`${baseURL}/reminders`).then((response) => response.data);
};
const addReminder = async (reminder: ReminderFormValues, token: string) => {
    return await postRequest<ReminderFormValues, Reminder>(
        `/reminders`,
        reminder,
        { Authorization: `Bearer ${token}` }
    );
};
const editReminder = async (reminderDetails: ReminderFormValues, token: string) => {
    return await putRequest<ReminderFormValues, Reminder>(
        `/reminder/${reminderDetails.show}`,
        reminderDetails,
        { Authorization: `Bearer ${token}` }
    );
}
const deleteReminder = async (show: string, token: string) => {
    return await deleteRequest(`/reminder/${show}`, { Authorization: `Bearer ${token}` });
};

const updateShowEpisode = async (episode: ShowEpisode, token: string) => {
    return await putRequest<ShowEpisode, ShowEpisode>(
        `/show-episode/${episode.id}`,
        episode,
        { Authorization: `Bearer ${token}` }
    );
};

const getUser = async (username: string) => {
    return await getRequest<User>(`/user/${username}`);
};
const registerNewUser = async (user: NewUserDetails) => {
    try {
        const response = await axios.post<UserResponses<CurrentUser>>(`${baseURL}/auth/register`, user);
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<CurrentUser>>;
    }
    catch(error) {
        const response: ErrorResponse = error.response;
        const result: FailedResponse = {
            result: 'error',
            status: response.status,
            statusText: response.statusText,
            message: response.data.message
        };
        return result;
    }
};
const changePassword = async (
    username: string,
    details: AccountDetailsFormValues,
    token: string
) => {
    const response = await putRequest<{ password: string }, User>(
        `/user/${username}/change_password`,
        { password: details.password },
        { Authorization: `Bearer ${token}` }
    );

    return response;
};
const getUserSubscriptions = async (user: string) => {
    const data = await getRequest(`/users/${user}/subscriptions`);
    console.log(data)
};
const addSubscriptions = async (
    username: string,
    subscriptions: string[],
    token: string
) => {
    const updatedUser = await postRequest<string[], User>(
        `/users/${username}/subscriptions`,
        subscriptions,
        { Authorization: `Bearer ${token}` }
    );

    return updatedUser;
};

const unsubscribeFromSearch = async (subscriptionId: number, token: string) => {
    await deleteRequest(`/users/subscriptions/${subscriptionId}`, { Authorization: `Bearer ${token}` });
};

const login = async (loginDetails: { username: string, password: string }) => {
    try {
        const response = await axios.post<UserResponses<CurrentUser>>(`${baseURL}/auth/login`, loginDetails);
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<CurrentUser>>;
    }
    catch(err) {
        if (err?.response) {
            const payload: FailedResponse = err.response.data
            return { result: 'error', ...payload }
        }
    }
};

export {
    getGuide,
    addNewShow,
    removeShowFromList,
    getRecordedShow,
    getReminders,
    addReminder,
    editReminder,
    deleteReminder,
    updateShowEpisode,
    getUser,
    registerNewUser,
    changePassword,
    getUserSubscriptions,
    addSubscriptions,
    unsubscribeFromSearch,
    login
};

export * from './tvmaze';