import axios from "axios";

const url_api = 'http://localhost:4000/api';

export const api = axios.create({
    baseURL : url_api,
    headers : {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default api;