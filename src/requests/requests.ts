import axios, { AxiosResponse } from "axios";

import { Guide, RecordedShow } from "../../utils/types";

const baseURL = 'http://127.0.0.1:5000/api';

const getGuide = () => {
    return axios.get(`${baseURL}/guide`).then((response: AxiosResponse<Guide>) => response.data);
};

const getEvents = () => {
    return axios.get(`${baseURL}/events`).then(response => response.data);
};

const getShowList = () => {
    return axios.get(`${baseURL}/show-list`).then((response: AxiosResponse<string[]>) => response.data);
};
const addShowToList = (show: string) => {
    return axios.put(`${baseURL}/show-list`, { show }).then(response => response.data);
};
const removeShowFromList = (showToRemove: string) => {
    return axios.delete(`${baseURL}/show-list/${showToRemove}`).then(response => response.data);
};

const getRecordedShows = () => {
    return axios.get(`${baseURL}/recorded-shows`).then((response: AxiosResponse<RecordedShow[]>) => response.data);
}
const getRecordedShow = (show: string) => {
    return axios.get(`${baseURL}/recorded-show/${show}`).then((response: AxiosResponse<RecordedShow>) => response.data);
};

const getReminders = () => {
    return axios.get(`${baseURL}/reminders`).then(response => response.data);
};
const addReminder = reminder => {
    return axios.put(`${baseURL}/reminders`, reminder).then(response => response.data);
};

const registerNewUser = user => {
    return axios.put(`${baseURL}/register`, user).then(response => response.data);
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
    registerNewUser
};