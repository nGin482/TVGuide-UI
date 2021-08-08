import axios from "axios";

const baseURL = 'http://127.0.0.1:5000'

const getGuide = () => {
    return axios.get(baseURL + '/guide').then(response => response.data)
}

const requests = {
    getGuide
}

export default requests;