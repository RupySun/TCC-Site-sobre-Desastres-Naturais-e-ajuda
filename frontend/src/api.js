import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5067',
    headers: {
        "x-access-token": localStorage.getItem("TOKEN")
    }
})

export default api;