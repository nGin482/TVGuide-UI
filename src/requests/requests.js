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

const requests = {
    getGuide,
    getShowList,
    getEvents,
    addShowToList
}

export default requests;