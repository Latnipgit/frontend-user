import axios from 'axios';
const API_URL = "https://bafana-backend.azurewebsites.net";

export default axios.create({
    baseURL: API_URL
});

export const axiosPrivate = axios.create({
    baseURL: API_URL,
});