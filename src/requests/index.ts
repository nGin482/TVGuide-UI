import axios, { AxiosResponse } from "axios";

import {
    Guide,
    RecordedShowModel,
    Reminder,
    SearchItem,
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
    ShowSearchResult
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
    const response = await axios.get(`${baseURL}/guide`);
    if (response.status === 200) {
        return response.data as Guide;
    }
    throw Error(`${response.status} ${response.statusText}`);
};

const getEvents = async () => {
    const response = await axios.get(`${baseURL}/events`);
    if (response.status === 200) {
        return response.data as string[];
    }

    throw Error(`${response.status} ${response.statusText}`);
};

const getShowList = () => {
    return axios.get(`${baseURL}/show-list`).then((response: AxiosResponse<SearchItem[]>) => response.data);
};
const addShowToList = async (newShow: ShowSearchResult, conditions: SearchItem['conditions'], token: string) => {
    try {
        const response = await axios.post<SearchItemResponses>(
            `${baseURL}/show-list`,
            { show: newShow.show.name, image: newShow.show.image.medium, tvmaze_id: newShow.show.id, conditions },
            headers(token)
        );
        return { result: 'success', payload: response.data } as SuccessResponse<SearchItemResponses>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
            const result: FailedResponse = {
                result: 'error',
                status: response.status,
                statusText: response.statusText,
                message: response.data.message,
                msg: response.data?.msg
            };
            return result;
        }
    }
};
const removeShowFromList = async (showToRemove: string, token: string) => {
    try {
        const response: AxiosResponse<SearchItemResponses> = await axios.delete(`${baseURL}/show-list/${showToRemove}`, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<SearchItemResponses>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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

const getRecordedShows = () => {
    return axios.get(`${baseURL}/recorded-shows`).then((response: AxiosResponse<RecordedShowModel[]>) => response.data);
}
const getRecordedShow = (show: string) => {
    return axios.get(`${baseURL}/recorded-shows/${show}`).then((response: AxiosResponse<RecordedShowModel>) => response.data);
};

const getReminders = () => {
    return axios.get(`${baseURL}/reminders`).then((response: AxiosResponse<Reminder[]>) => response.data);
};
const addReminder = async (reminder: Reminder, token: string) => {
    try {
        const response: AxiosResponse<AddReminderResponse> = await axios.post(`${baseURL}/reminders`, reminder, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<AddReminderResponse>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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
const editReminder = async (reminderDetails: Reminder, token: string) => {
    try {
        const response: AxiosResponse<AddReminderResponse> = await axios.put(`${baseURL}/reminder/${reminderDetails.show}`, reminderDetails, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<AddReminderResponse>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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
}
const deleteReminder = async (reminder: string, token: string) => {
    try {
        const response: AxiosResponse<AddReminderResponse> = await axios.delete(`${baseURL}/reminder/${reminder}`, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<AddReminderResponse>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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
        const response: AxiosResponse<User> = await axios.get(`${baseURL}/user/${username}`);
        return { result: 'success', payload: response.data } as SuccessResponse<User>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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
        const response: AxiosResponse<UserResponses<CurrentUser>> = await axios.post(`${baseURL}/auth/register`, user);
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<CurrentUser>>;
    }
    catch(error) {
        const response: AxiosResponse<ErrorResponse> = error.response;
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
        const response: AxiosResponse<UserResponses<CurrentUser>> = await axios.post(
            `${baseURL}/user/${username}/change_password`,
            { password: newPassword },
            headers(token)
        );
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<CurrentUser>>;

    }
    catch(error) {
        const response: AxiosResponse<ErrorResponse> = error.response;
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
        const response: AxiosResponse<UserResponses<User>> = await axios.put(`${baseURL}/user/${username}/subscriptions`, subscriptions, headers(token));
        return { result: 'success', payload: response.data } as SuccessResponse<UserResponses<User>>;
    }
    catch(error) {
        if (error?.response) {
            const response: AxiosResponse<ErrorResponse> = error.response;
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
        const response: AxiosResponse<UserResponses<CurrentUser>> = await axios.post(`${baseURL}/auth/login`, loginDetails);
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
    getShowList,
    getEvents,
    addShowToList,
    removeShowFromList,
    getRecordedShows,
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