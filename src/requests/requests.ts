import axios, { AxiosResponse } from "axios";

import {
    Guide,
    RecordedShowModel,
    Reminder,
    SearchItem,
    AddReminderResponse,
    ErrorResponse,
    buildResponseValue,
    buildLoginResponseValue,
    buildResponse
} from "../utils";

const baseURL = 'http://127.0.0.1:5000/api';

const headers = (token: string) => {
    return {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }
}

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
const addShowToList = async (show: string, token: string) => {
    const response = await axios.post(`${baseURL}/show-list`, { show }, headers(token));

    const result = buildResponseValue(response);
    return result;
};
const removeShowFromList = async (showToRemove: string, token: string) => {
    const response = await axios.delete(`${baseURL}/show-list/${showToRemove}`, headers(token));

    return buildResponseValue(response);
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
        const response = await axios.post(`${baseURL}/reminders`, reminder, headers(token));
        return buildResponse<AddReminderResponse>(response);
    }
    catch(error) {
        if (error?.response) {
            return buildResponse<ErrorResponse>(error.response)
        }
    }
};
const deleteReminder = async (reminder: string, token: string) => {
    const response = await axios.delete(`${baseURL}/reminder/${reminder}`, headers(token));

    return buildResponseValue(response);
};

const registerNewUser = async (user: any) => {
    const response = await axios.post(`${baseURL}/auth/register`, user);

    return buildResponseValue(response);
};

const login = async (loginDetails: { username: string, password: string }) => {
    try {
        const response = await axios.post(`${baseURL}/auth/login`, loginDetails);
        return buildLoginResponseValue(response);
    }
    catch(err) {
        return buildLoginResponseValue(err.response);
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
    deleteReminder,
    registerNewUser,
    login
};