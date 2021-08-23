import axios from "axios";

const baseURL = 'http://192.168.1.120:5000/'

const getGuide = () => {
    return axios.get(baseURL + 'guide').then(response => response.data)
}

const getEvents = () => {
    return axios.get(baseURL + 'events').then(response => response.data)
}

const getShowList = () => {
    return axios.get(baseURL + 'show-list').then(response => response.data)
}
const addShowToList = showToAdd => {
    return axios.put(baseURL + 'show-list', {'show': showToAdd}).then(response => response.data)
}
const removeShowFromList = showToRemove => {
    return axios.delete(baseURL + 'show-list/' + showToRemove).then(response => response.data).catch(err => err.response)
}

const getRecordedShows = () => {
    return axios.get(baseURL + 'recorded-shows').then(response => response.data).catch(err => err.response)
}
const getRecordedShow = show => {
    return axios.get(baseURL + 'recorded-show/' + show).then(response => response.data).catch(err => err.response)
}

const requests = {
    getGuide,
    getShowList,
    getEvents,
    addShowToList,
    removeShowFromList,
    getRecordedShows,
    getRecordedShow
}

export default requests;