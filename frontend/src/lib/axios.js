import axios from "axios"

export const baseURL = import.meta.env.VITE_API_BASE_URL

export const axiosInstance = axios.create({
    baseURL: `${baseURL}/api`,
    withCredentials:true
})