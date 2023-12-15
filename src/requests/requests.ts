import axios, { AxiosResponse } from "axios";

import { Guide, RecordedShowModel, Reminder, SearchItem, buildResponseValue, buildLoginResponseValue } from "../utils";

const baseURL = 'http://127.0.0.1:5000/api';

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
const addShowToList = async (show: string) => {
    const response = await axios.post(`${baseURL}/show-list`, { show });

    const result = buildResponseValue(response);
    return result;
};
const removeShowFromList = async (showToRemove: string) => {
    const response = await axios.delete(`${baseURL}/show-list/${showToRemove}`);

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
const addReminder = async (reminder: Reminder) => {
    const response = await axios.post(`${baseURL}/reminders`, reminder);

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
    registerNewUser,
    login
};