import axios from "axios";

const url_api = 'https://debate-futbol-back-end.vercel.app/api';

export const api = axios.create({
    baseURL : url_api,
    headers : {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default api;