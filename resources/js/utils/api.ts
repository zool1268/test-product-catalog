
import axios from "axios"
export interface ApiError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}

const api = axios.create({
    baseURL: '/api',
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});

export default api
