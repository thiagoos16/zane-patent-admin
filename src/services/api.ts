import axios from 'axios';

export const api = axios.create({
    //baseURL: process.env.API_HOST
    baseURL: "http://localhost:3001/api"
});