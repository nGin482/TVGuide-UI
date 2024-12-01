import axios, { AxiosResponse } from "axios";

import { getRequest, postRequest, putRequest } from "./api-client";
import {
    Guide,
    RecordedShowModel,
    Reminder,
    AddReminderResponse,
    User,
    CurrentUser,
    SubscriptionsPayload,
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
const deleteReminder = async (reminder: string, token: string) => {
    try {
        const response = await axios.delete<AddReminderResponse>(`${baseURL}/reminder/${reminder}`, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<AddReminderResponse>;
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

const getUser = async (username: string) => {
    try {
        const response = await axios.get<User>(`${baseURL}/user/${username}`);
        return { result: 'success', payload: response.data } as SuccessResponse<User>;
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
const changePassword = async (username: string, newPassword: string, token: string) => {
    try {
        const response = await axios.post<UserResponses<CurrentUser>>(
            `${baseURL}/user/${username}/change_password`,
            { password: newPassword },
            headers(token)
        );
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<CurrentUser>>;

    }
    catch(error) {
        const response: ErrorResponse = error.response;
        const message = error?.response
            ? response.data.message
            : 'Unable to communicate with the server. Please try again later';
        const result: FailedResponse = {
            result: 'error',
            status: response?.status || 0,
            statusText: response?.statusText || '',
            message,
            msg: response?.data.msg
        };
        return result;
    }
};
const updateSubscriptions = async (username: string, subscriptions: SubscriptionsPayload, token: string) => {
    try {
        const response = await axios.put<UserResponses<User>>(
            `${baseURL}/user/${username}/subscriptions`,
            subscriptions,
            headers(token)
        );
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<User>>;
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
        else {
            const result: FailedResponse = {
                result: 'error',
                status: 0,
                statusText: error.message,
                message: error.message === 'Network Error'
                    ? 'Unable to communicate with the server at this time. Please try again later.'
                    : error.message
            };
            return result;
        }
    }
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
    getUser,
    registerNewUser,
    changePassword,
    updateSubscriptions,
    login
};

export * from './tvmaze';