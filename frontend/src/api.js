import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

// const apiUrl = "/choreo-apis/awbo/backend/rest-api-be2/v1.0";

const api = axios.create({
    // baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
    baseURL: import.meta.env.VITE_API_URL 
})

// Add an interceptor to include the Authorization header in all requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(token){
            config.headers.Authorization = `Bearer ${token}`// Attach the token to the Authorization header if it exists
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default api;