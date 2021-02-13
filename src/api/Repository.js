import axios from 'axios'
import router from '../router'
import { clearAuthToken, refreshToken, isLoggedIn , AUTH_TOKEN_KEY} from './AuthRepository'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
})

API.interceptors.request.use(
    config => {
        const token = localStorage.getItem(AUTH_TOKEN_KEY)

        if (token) {
            config.headers.common.Authorization = `Bearer ${token}`
        } else {
            delete API.defaults.headers.common.Authorization
        }

        return config
    },

    error => Promise.reject(error),
)

// Response interceptor for API calls
API.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config

    if (isLoggedIn()) {
        if (error.response && error.response.status === 401 && originalRequest.url !== '/api/auth/refresh') {
            const token = await refreshToken()
            originalRequest.headers.Authorization = `Bearer ${token}`
            return API(originalRequest)
        } else if (error.response && error.response.status === 401 && originalRequest.url === '/api/auth/refresh') {
            clearAuthToken()
            return router.push({ path: '/login' })
        }
    }

    return Promise.reject(error)
})

export default API
